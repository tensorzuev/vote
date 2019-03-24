import * as React from 'react';

export function JustPic (props:HashMap<any>) {
  return (
    <div className="height-100">
      {props.description}
      <h1 className="abs-title">{props.title}</h1>
    </div>
  )
}
