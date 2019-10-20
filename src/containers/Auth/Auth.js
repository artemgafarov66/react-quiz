import React, { Component } from 'react';
import classes from './Auth.scss';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { validateForm } from '../../form/formFramework';
import is from 'is_js';
import { connect } from 'react-redux';
import { auth } from '../../store/actions/auth';

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

  loginHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true,
    );
  }

  registerHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false,
    );
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

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin)),
  };
}

export default connect(null, mapDispatchToProps)(Auth);
