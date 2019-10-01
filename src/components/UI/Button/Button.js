import React from 'react';
import classes from './Button.scss';

const Button = props => {
  const cls = [classes.Button, classes[props.type]];
  console.log(props.disabled);
  
  return (
    <button
      className={cls.join(' ')}
      onClick={props.onClick}
      disabled={props.disabled}>
      {props.children}
    </button>
  );
};

export default Button;

