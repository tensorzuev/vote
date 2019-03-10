/// <reference path="../../typings/react/react.d.ts" />

import * as React from 'react';
import {HashMap, IPresentation} from './Interfaces';
import {Throbber} from './Service/Throbber';

interface IMainState {
  presentation?: IPresentation;
}

export class Main extends React.Component<HashMap<any>, IMainState> {

    state: IMainState = {presentation: null}

    constructor () {
        super();
        this.changeName = this.changeName.bind(this);
    }

    changeName (e: any) {
      /*  this.setState({
            newItem: {
                description: e.target.value
            }
        });*/
    }

    render () {
        if (this.state.presentation) {
          return (<div>Ready..</div>);
        } else {
          return (<Throbber />);
        }
    }

    componentDidMount() {
      setTimeout(()=>{
        this.setState({presentation: {
          currentSlide: "0",
          slides: 0
        }});
      }, 2000);
    }
}
