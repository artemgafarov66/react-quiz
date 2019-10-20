import React, { Component } from 'react';
import classes from './QuizCreator.scss';
import Button from '../../components/UI/Button/Button';
import { createControl, validate, validateForm } from '../../form/formFramework';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';
import Auxillary from '../../hoc/Auxillary/Auxillary';
import { connect } from 'react-redux';
import {createQuizQuestion, finishCreateQuiz} from '../../store/actions/create';

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
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControls(),
  }

  submitHandler = event => event.PreventDefault();

  addQuestionHandler = event => {
    event.preventDefault();

    const { option1, option2, option3, option4 } = this.state.formControls,
      questionItem = {
        question: this.state.formControls.question.value,
        id: this.props.quiz.length + 1,
        rightAnswerId: this.state.rightAnswerId,
        answers: [
          {
            text: option1.value,
            id: option1.id,
          },
          {
            text: option2.value,
            id: option2.id,
          },
          {
            text: option3.value,
            id: option3.id,
          },
          {
            text: option4.value,
            id: option4.id,
          }
        ]
      };

    this.props.createQuizQuestion(questionItem);

    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls(),
    });
  }

  createQuizHandler = event => {
    event.preventDefault();

    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls(),
    });

    this.props.finishCreateQuiz();

  };

  onChangeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls },
      control = { ...formControls[controlName] };

    control.value = value;
    control.touched = true;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;

    this.setState({ formControls, isFormValid: validateForm(formControls) });
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
          {index === 0 && <hr />}
        </Auxillary>
      );
    });
  }

  selectChangeHandler = event => {
    this.setState({ rightAnswerId: +event.target.value });
  };

  render() {
    const select = <Select
      label='Выберите правильный ответ'
      value={this.state.rightAnswerId}
      onChange={this.selectChangeHandler}
      options={[
        { text: 1, value: 1 },
        { text: 2, value: 2 },
        { text: 3, value: 3 },
        { text: 4, value: 4 }
      ]} />

    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание теста</h1>
          <form onSubmit={this.submitHandler}>
            {this.renderControls()}
            {select}

            <Button
              type='primary'
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}>Добавить вопрос</Button>

            <Button
              type='success'
              onClick={this.createQuizHandler}
              disabled={!this.props.quiz.length}>Создать тест</Button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.create.quiz,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createQuizQuestion: item => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: () => dispatch(finishCreateQuiz()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
