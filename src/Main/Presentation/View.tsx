import * as React from 'react';
import {WebSocketController} from '../../WebSocketController';

interface IViewProps {
  slides: ISlides<IOneSlide>
}

export class View extends React.Component<IViewProps, IPresentation> {
  state: IPresentation = {
    currentSlide: '1',
    countClients: 0
  }

  private webSocketController:WebSocketController = new WebSocketController();

  openNext() {
    if (this.props.slides[this.state.currentSlide].next) {
      this.setState( {
        currentSlide: this.props.slides[this.state.currentSlide].next,
        countClients: this.state.countClients
      } );
    }
  }

  constructor (props:IViewProps) {
    super(props);
    this.openNext = this.openNext.bind(this);

    this.messageCallback = this.messageCallback.bind(this);
    this.callbackChoice = this.callbackChoice.bind(this);

    this.webSocketController.registerCallback(this.messageCallback);
    this.webSocketController.send({type:'imboss', data: ''});
  }

  callbackChoice(dataCallback:HashMap<any>) {
    this.setState( {
      currentSlide: dataCallback.next,
      countClients: this.state.countClients
    } );
  }

  messageCallback(data:ITypeMsg) {
    if (data.type==='countclients') {
      this.setState({
        currentSlide: this.state.currentSlide,
        countClients: +data.data.count
      });
    }
  }

  componentWillUnmount() {
    this.webSocketController.unRegisterCallback(this.messageCallback);
  }

  render () {
    let Control = this.props.slides[this.state.currentSlide].control;
    return (
      <div onClick={this.openNext}>
        <div>
          Visitors: {this.state.countClients}
        </div>
        <Control
            webSocketController={this.webSocketController}
            callback={this.callbackChoice}
            {... this.props.slides[this.state.currentSlide].props} />
      </div>
    )
  }

}
