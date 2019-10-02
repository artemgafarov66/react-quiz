import React, { Component } from 'react';
import classes from './QuizCreator.scss';
import Button from '../../components/UI/Button/Button';
import { createControl } from '../../form/formFramework';
import Input from '../../components/UI/Input/Input';
import Auxillary from '../../hoc/Auxillary/Auxillary';

function createOptionControl(number) {
  return createControl({
    label: `Вариант ${number}`,
    errorMessage: 'Значение не может быть пустым',
    id: number,
  }, { required: true });
}

function createFormControls() {
  return {
    question: createControl({
      label: 'Введите вопрос',
      errorMessage: 'Вопрос не может быть пустым',
    }, { required: true }),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  };
}
class QuizCreator extends Component {
  state = {
    quiz: [],
    formControls: createFormControls(),
  }

  submitHandler = event => event.PreventDefault();

  addQuestionHandler = () => {

  };

  createQuizHandler = () => {

  };

  onChangeHandler = (value, controlName) => {
    // const formControls = { ...this.state.formControls },
    //   control = { ...formControls[controlName] };

    // control.value = value;
    // control.touched = true;
    // control.valid = this.validateControl(control.value, control.validation);

    // formControls[controlName] = control;

    // let isFormValid = true;

    // Object.keys(formControls).forEach(name => isFormValid = formControls[name].valid && isFormValid);

    // this.setState({ formControls, isFormValid });
  }

  renderControls() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Auxillary key={controlName + index}>
          <Input
            type={control.type}
            value={control.value}
            valid={control.valid}
            touched={control.touched}
            label={control.label}
            shouldValidate={!!control.validation}
            errorMessage={control.errorMessage}
            onChange={event => this.onChangeHandler(event.target.value, controlName)} />
            { index === 0 && <hr /> }
          </Auxillary>
      );
    });
  }

  render() {
    return (
    <div className={classes.QuizCreator}>
      <div>
        <h1>Создание теста</h1>
        <form onSubmit={this.submitHandler}>
          {this.renderControls()}
          <select></select>

          <Button
            type='primary'
            onClick={this.addQuestionHandler}
            disabled={false}>Добавить вопрос</Button>

          <Button
            type='success'
            onClick={this.createQuizHandler}
            disabled={false}>Создать тест</Button>
        </form>
      </div>
    </div>
    );
  }
}

export default QuizCreator;
