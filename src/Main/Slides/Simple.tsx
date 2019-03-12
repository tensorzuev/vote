import * as React from 'react';

export class Simple extends React.Component<HashMap<any>, HashMap<any>> {

  render () {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <div>{this.props.description}</div>
      </div>
    )
  }
}
