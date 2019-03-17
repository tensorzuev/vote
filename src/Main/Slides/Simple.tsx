import * as React from 'react';

export function Simple (props:HashMap<any>) {
  return (
    <div className={props.className + ' height-100'}>
      <h1>{props.title}</h1>
      <div className='content-area'>{props.description}</div>
    </div>
  )
}
