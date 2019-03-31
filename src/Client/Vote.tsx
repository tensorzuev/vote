import * as React from 'react';
import {WebSocketController} from '../WebSocketController';
import "./Vote.less";
import {Start} from "./Start";

let defaultTitle:string = 'Please, waiting while we\'re opening voting';

export class Vote extends React.Component<HashMap<any>, HashMap<any>> {
    private webSocketController:WebSocketController = new WebSocketController();
    state:HashMap<any> = {
        answers: [],
        title: defaultTitle,
        description: '',
        voting: false
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
        title: (<p><span className='client-accent'>Спасибо за Ваш выбор</span><br /><br />
         Если вы хотите изменить решение, 
        <br /> обновите страницу. <br />
        Оставляйте Ваш телефон активным до конца голосования.</p>),
        description: '',
        voting: true
      });
    }

    messageCallback(data:ITypeMsg) {
      if (data.type==='newvote') {
        data.data.voting = true;
        this.setState(data.data);
      } else if (data.type === 'endvote') {
        this.setState({
          answers: [],
          title: defaultTitle,
          description: '',
          voting: false
        });
      }
    }

    componentWillUnmount() {
      this.webSocketController.unRegisterCallback(this.messageCallback);
    }

    render () {
      if (this.state.voting) {
        let array = this.state.answers.map((answer:HashMap<string>) => {
          let ans = this.onAnswerClick.bind(this, answer);
          return ( <div onClick={ans} 
                        className='client-answer'>{answer.ans}</div> );
        });
  
        return (
          <div className='client-body'>
            <p>{this.state.title}</p>
            <div className='answers-block'>
              {array}
            </div>
          </div>
        );
      } else {
        return (<div className='client-body'>
            <Start />
        </div>);
      }
      
    }
}
