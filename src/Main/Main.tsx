import * as React from 'react';
import {View} from './Presentation/View';
import prezi from './Resources/Kaliningrad';
import "./Main.less";


export function Main(props:HashMap<any>) {
    return (
      <View slides={prezi} />
    )
}
