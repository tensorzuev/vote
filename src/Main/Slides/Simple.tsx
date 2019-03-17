import * as React from 'react';

export function Simple (props:HashMap<any>) {
  return (
    <div>
      <h1>{props.title}</h1>
      <div>{props.description}</div>
    </div>
  )
}
