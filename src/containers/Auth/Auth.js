import React, { Component } from 'react';
import classes from './Auth.scss';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { validateForm } from '../../form/formFramework';
import is from 'is_js';
import axios from 'axios';

class Auth extends Component {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Введите корректный email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Введите корректный пароль',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
  }

  loginHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true,
    };

    try {
      const response = axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBbquppcw9PLxD5r9zIZcxxOqztXcoC4PQ', authData);
      console.log(response.data);
      
    } catch(e) {
      console.log(e);
    }
  }

  registerHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true,
    };

    try {
      const response = axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBbquppcw9PLxD5r9zIZcxxOqztXcoC4PQ', authData);
      console.log(response.data);
      
    } catch(e) {
      console.log(e);
    }
  }

  submitHandler = event => event.preventDefault();

  validateControl(value, validation) {
    if (!validation) return true;

    let isValid = true;

    if (validation.required) isValid = value.trim().length && isValid;

    if (validation.email) isValid = is.email(value) && isValid;

    if (validation.minLength) isValid = value.length >= validation.minLength && isValid;

    return isValid;
  }

  onChangeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls },
      control = { ...formControls[controlName] };

    control.value = value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    this.setState({ formControls, isFormValid: validateForm(formControls) });
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={event => this.onChangeHandler(event.target.value, controlName)}/>
      );
    });
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>
          <form
            className={classes.AuthForm}
            onSubmit={this.submitHandler}>
            { this.renderInputs() }

            <Button
              type='success'
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}>Войти</Button>

            <Button
              type='primary'
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}>Зарегистрироваться</Button>

          </form>
        </div>
      </div>
    );
  }
}

export default Auth;
