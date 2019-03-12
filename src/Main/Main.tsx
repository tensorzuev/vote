import * as React from 'react';
import {Throbber} from './Service/Throbber';
import {View} from './Presentation/View';
import prezi from './Resources/Kaliningrad';
import "./Main.less";

interface IMainState {
  slides?: ISlides<IOneSlide>;
}

export class Main extends React.Component<HashMap<any>, IMainState> {

    state: IMainState = {slides: prezi}

    render () {
        if (this.state.slides) {
          return (<View slides={this.state.slides} />);
        } else {
          return (<Throbber />);
        }
    }
}
