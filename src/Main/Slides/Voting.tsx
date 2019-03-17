import * as React from 'react';

export class Voting extends React.Component<HashMap<any>, HashMap<any>> {

  state:HashMap<any> = {
    results: {},
    timer: 45,
    allVoters: 0
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

        clearInterval(this.interval);
        this.interval = null;

        let max = -1, winner, next;
        props.answers.forEach((ans:any)=>{
          if (this.state.results[ans.ans] > max || max===-1) {
            max = this.state.results[ans.ans] || 0;
            winner = ans.ans;
            next = ans.next;
          }
        });
        this.props.webSocketController.send({type:'endvote', data: {winner: winner}});
        this.props.callback({
          next: next
        });
      } else {
        this.setState({
          results: this.state.results,
          timer: this.state.timer - 1,
          allVoters: this.state.allVoters
        });
      }
    }, 1000);
  }

  messageCallback(data:ITypeMsg) {
    if (data.type==='newanswer') {
      let sum = 0;
      for (let i in data.data.count) {
        if (data.data.count.hasOwnProperty(i)) {
          sum += data.data.count[i];
        }
      }
      this.setState({
        results: data.data.count,
        timer: this.state.timer,
        allVoters: sum
      });
    }
  }

  componentWillUnmount() {
    this.props.webSocketController.unRegisterCallback(this.messageCallback);
  }

  render () {
    return (
      <div className={this.props.className + ' height-100'}>
        <h1>{this.props.title}</h1>
        <div className='content-area'>
          <div className='accent-block'>{this.props.description}</div>
        
          <div className='answers-block'>
            { this.props.answers.map((answer:HashMap<string>)=>{
              let styles:React.CSSProperties = {
                height: this.state.results[answer.ans]?((this.state.results[answer.ans]*100/this.state.allVoters) + "%"):'0%'
              };

              return ( <div className='one-column-answer'> 
                {answer.description}

                {answer.ans} 
                <div className='column-result'>
                  <div className='count-voters' style={ styles }>
                    {this.state.results[answer.ans]?this.state.results[answer.ans]:''} 
                  </div>
                </div>
                
                
                </div> );
            }) }
          </div>
          
          <div className='author-block'>Осталось времени: {this.state.timer} </div>
        </div>
      </div>
    )
  }
}
