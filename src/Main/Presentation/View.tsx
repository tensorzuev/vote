import * as React from 'react';
import {WebSocketController} from '../../WebSocketController';

interface IViewProps {
  slides: ISlides<IOneSlide>
}


export class View extends React.Component<IViewProps, IPresentation> {
  state: IPresentation = {
    currentSlide: '1',
    countClients: 0,
    className: 'visible-area'
  }

  private webSocketController:WebSocketController = null;

  openSlide(nextSlide:string) {
    this.setState( {
      currentSlide: nextSlide,
      countClients: this.state.countClients,
      className: 'hidden-area'
    } );
    setTimeout(()=>{
      this.setState( {
        currentSlide: nextSlide,
        countClients: this.state.countClients,
        className: 'visible-area'
      } );
    }, 300);
  }

  openNext() {
    let nextSlide = this.props.slides[this.state.currentSlide].next;
    if (nextSlide) {
      history.pushState({}, '', '/admin.html?slide=' + nextSlide);
      this.openSlide(nextSlide);
    }
  }

  connect() {
    this.webSocketController = new WebSocketController();
    this.webSocketController.registerCallback(this.messageCallback);
    this.webSocketController.send({type:'imboss', data: ''});
  }

  disconnect() {
    if (this.webSocketController) {
      this.webSocketController.unRegisterCallback(this.messageCallback);
      this.webSocketController = null;
    }
  }

  getSlideFromUrl():string {
    let searchStr = location.search;
    let slide = searchStr.split('slide=')[1];
    return slide || '1';
  }

  onPopState() {
    this.openSlide(this.getSlideFromUrl());
  }

  constructor (props:IViewProps) {
    super(props);
    this.openNext = this.openNext.bind(this);

    this.messageCallback = this.messageCallback.bind(this);
    this.callbackChoice = this.callbackChoice.bind(this);

    this.connect();
    this.onPopState = this.onPopState.bind(this);
    window.onpopstate = this.onPopState;
    
    this.state.currentSlide = this.getSlideFromUrl();
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
        countClients: +data.data.count,
        className: this.state.className
      });
    } else if (data.type === 'error') {
      this.disconnect();
      this.connect();
      this.forceUpdate();
    }
  }

  componentWillUnmount() {
    this.webSocketController.unRegisterCallback(this.messageCallback);
  }

  render () {
    let Control = this.props.slides[this.state.currentSlide].control;
    return (
      <div onClick={this.openNext} className='slide-container'>
        <div className='count-of-visitors'>
          Всего слушателей: {this.state.countClients}
        </div>
        <Control key={this.state.currentSlide} 
            className={this.state.className}
            webSocketController={this.webSocketController}
            callback={this.callbackChoice}
            {... this.props.slides[this.state.currentSlide].props} />
      </div>
    )
  }

}
