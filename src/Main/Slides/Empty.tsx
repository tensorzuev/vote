import * as React from 'react';

export function Empty (props:HashMap<any>) {
  return (
    <div className="height-100">
      <h1>{props.title}</h1>
      {props.description}
    </div>
  )
}
