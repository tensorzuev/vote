import * as React from 'react';

export class Voting extends React.Component<HashMap<any>, HashMap<any>> {

  state:HashMap<any> = {
    results: {},
    timer: 450,
    allVoters: 0
  };
  private interval:number = null;

  finishVoting() {
    clearInterval(this.interval);
    this.interval = null;

    let max = -1, winner, next;
    this.props.answers.forEach((ans:any)=>{
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
  }

  startVoting(props:HashMap<any>) {
    props.webSocketController.registerCallback(this.messageCallback);
    props.webSocketController.send({type:'newvote', data: {
      title: props.title,
      description: props.description,
      answers: props.answers
    }});
  }

  constructor(props:HashMap<any>) {
    super(props);
    this.finishVoting = this.finishVoting.bind(this);
    this.messageCallback = this.messageCallback.bind(this);
    this.startVoting(props);

    this.interval = setInterval(()=>{
      if (this.state.timer < 1) {
        this.finishVoting();
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

  componentDidUpdate(prevProps:HashMap<any>) {
    if (prevProps.webSocketController !== this.props.webSocketController) {
      this.startVoting(this.props);
    }
  }

  componentWillUnmount() {
    this.props.webSocketController.unRegisterCallback(this.messageCallback);
  }

  render () {
    /* first version supports only two variants 
     * */
    let resultMap = this.props.answers.map((answer:HashMap<string>)=>{
      let styles:React.CSSProperties = {
        width: this.state.results[answer.ans]?((this.state.results[answer.ans]*100/this.state.allVoters) + "%"):'0%'
      };
      return styles;
    });

    let first = this.props.answers[0].ans;
    let second = this.props.answers[1].ans;
    
    return (
      <div className={this.props.className + ' height-100'} onClick={this.finishVoting}>
        <h1>{this.props.title}</h1>
        <div className='content-area'>
        
          <div className='answers-block'>
            { this.props.answers.map((answer:HashMap<string>)=>{
              
              return ( <div className='one-column-answer'>                
                {answer.ans} <br />
                {answer.description}
                </div> );
            }) }
          </div>
          <div className='results-block'>
              
                <div className='column-result column-result-first'>
                  <div className='count-voters' style={ resultMap[0] }>
                    <span className='count-voters-text'>{this.state.results[first]?this.state.results[first]:''}</span>
                  </div>
                </div>
                <img src='/resources/quest.png' className='vote-quest-img'/>
                <div className='column-result column-result-second'>
                  <div className='count-voters' style={ resultMap[1] }>
                    <span className='count-voters-text'>{this.state.results[second]?this.state.results[second]:''}</span>
                  </div>
                </div>
          </div>
          
          <div className="bottom-abs-text">Осталось времени: {this.state.timer} </div>
        </div>
      </div>
    )
  }
}
