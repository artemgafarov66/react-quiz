import React, { Component } from 'react';
import classes from './Auth.scss';
import Button from '../../components/UI/Button/Button';
class Auth extends Component {
  loginHandler = () => {

  }

  registerHandler = () => {

  }

  submitHandler = event => event.PreventDefault();

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>
          <form
            className={classes.AuthForm}
            onSubmit={this.submitHandler}>
            <input type='text' />
            <input type='text' />

            <Button
              type="success"
              onClick={this.loginHandler}>Войти</Button>

            <Button
              type="success"
              onClick={this.registerHandler}>Зарегистрироваться</Button>

          </form>
        </div>
      </div>
    );
  }
}

export default Auth;
