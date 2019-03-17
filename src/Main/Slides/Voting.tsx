import * as React from 'react';

export class Voting extends React.Component<HashMap<any>, HashMap<any>> {

  state:HashMap<any> = {
    results: {},
    timer: 10
  };
  private interval:number = null;

  constructor(props:HashMap<any>) {
    super(props);
    this.messageCallback = this.messageCallback.bind(this);
    props.webSocketController.registerCallback(this.messageCallback);
    props.webSocketController.send({type:'newvote', data: {
      title: props.title,
      description: props.description,
      answers: props.answers
    }});
    this.interval = setInterval(()=>{
      if (this.state.timer < 1) {

        let max = -1, winner, next;
        props.answers.forEach((ans:any)=>{
          if (this.state.results[ans.ans] > max) {
            max = this.state.results[ans.ans];
            winner = ans.ans;
            next = ans.next;
          }
        });
        this.props.webSocketController.send({type:'endvote', data: {winner: winner}});
        this.props.callback({
          next: next
        });
      }
      this.setState({
        results: this.state.results,
        timer: this.state.timer - 1
      });
    }, 1000);
  }

  messageCallback(data:ITypeMsg) {
    if (data.type==='newanswer') {
      this.setState({
        results: data.data.count,
        timer: this.state.timer
      });
    }
  }

  componentWillUnmount() {
    this.props.webSocketController.unRegisterCallback(this.messageCallback);
    clearInterval(this.interval);
    this.interval = null;
  }

  render () {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <div>{this.props.description}</div>
        { this.props.answers.map((answer:HashMap<string>)=>{
          return ( <div> {answer.description}
            {answer.ans} {this.state.results[answer.ans]?this.state.results[answer.ans]:''} </div> );
        }) }

        <div>Осталось времени: {this.state.timer} </div>
      </div>
    )
  }
}
