import * as React from 'react';

export function First (props:HashMap<any>) {
  return (
    <div className='text-in-slide'>
      <img src={props.logo} className='first-logo'/>
      <h1>{props.title}</h1>
      {props.description}
      <div className='author-block'>{props.author}</div>
      <div className='company-block'>{props.company}</div>
    </div>
  )
}
