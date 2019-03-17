import * as React from 'react';
import {WebSocketController} from '../WebSocketController';
import "./Vote.less";

let defaultTitle:string = 'Please, waiting while we\'re opening voting';

export class Vote extends React.Component<HashMap<any>, HashMap<any>> {
    private webSocketController:WebSocketController = new WebSocketController();
    state:HashMap<any> = {
        answers: [],
        title: defaultTitle,
        description: ''
    };

    constructor(props:HashMap<any>) {
      super(props);

      this.onAnswerClick = this.onAnswerClick.bind(this);
      this.messageCallback = this.messageCallback.bind(this);

      this.webSocketController.registerCallback(this.messageCallback);
      this.webSocketController.send({type:'newclient', data: ''});
    }

    onAnswerClick(answer:HashMap<string>) {
      this.webSocketController.send({type:'answer', data: {answer: answer.ans}});
      this.setState({
        answers: [],
        title: 'Thank you for your choice',
        description: ''
      });
    }

    messageCallback(data:ITypeMsg) {
      if (data.type==='newvote') {
        this.setState(data.data);
      } else if (data.type === 'endvote') {
        this.setState({
          answers: [],
          title: defaultTitle,
          description: ''
        });
      }
    }

    componentWillUnmount() {
      this.webSocketController.unRegisterCallback(this.messageCallback);
    }

    render () {
        let array = this.state.answers.map((answer:HashMap<string>) => {
          let ans = this.onAnswerClick.bind(this, answer);
          return ( <div onClick={ans}>{answer.ans}</div> );
        });

        return (
          <div>{this.state.title} <br />
          {this.state.description} <br /><br /><br />
          {array}
          </div>
        );
    }
}
