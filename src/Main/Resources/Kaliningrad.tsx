import * as React from 'react';
import {Simple} from '../Slides/Simple';

let pres:ISlides<IOneSlide> = {
  '1': {
    control: Simple,
    props: {
      title: 'Welcome',
      description: (<div><b>la la la</b></div>)
    },
    next: '2'
  },
  '2': {
    control: Simple,
    props: {
      title: 'Welcome to second slide',
      description: (<div>JOPA KONYA <br /> <b>la  <br /> <br /> la la</b>
          Privet!
        </div>)
    },
    next: null
  }
};

export default pres;
