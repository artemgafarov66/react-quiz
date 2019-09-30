import React from 'react';
import classes from './Input.scss';

function isInvalid({valid, touched, shouldValidate}) {
  return !valid && touched && shouldValidate;
}

const Input = props => {
  const inputType = props.type || 'type',
    cls = [classes.Input],
    htmlFor = `${inputType}-${Math.random()}`;

  if (isInvalid(props)) cls.push(classes.invalid);

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange} />

        { isInvalid(props) &&
          <span>{props.errorMessage || 'Введите верное значение'}</span>
        }
        
    </div>
  );
};

export default Input;

