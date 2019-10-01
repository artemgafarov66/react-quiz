import React, { Component } from 'react';
import classes from './QuizCreator.scss';
import Button from '../../components/UI/Button/Button';
class QuizCreator extends Component {
  submitHandler = event => event.PreventDefault();

  addQuestionHandler = () => {

  };

  createQuizHandler = () => {

  };

  render() {
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание теста</h1>
          <form onSubmit={this.submitHandler}>
            <input/>
            <hr/>
            <input/>
            <input/>
            <input/>
            <input/>
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
