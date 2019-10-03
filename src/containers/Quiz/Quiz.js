import React, { Component } from 'react';
import classes from './Quiz.scss';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import axios from '../../axios/axios-quiz';
import Loader from '../../components/UI/Loader/Loader';
class Quiz extends Component {
  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answersState: null,
    quiz: [],
    loading: true,
  }

  onAnswerClickHandler = answerId => {
    if (this.state.answersState) {
      const key = Object.values(this.state.answersState)[0];
      if (key === 'success') {
        return;
      }
    }

    const question = this.state.quiz[this.state.activeQuestion],
      results = { ...this.state.results };

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) results[question.id] = 'success';
      this.setState({
        answersState: { [answerId]: 'success' },
        results,
      });
      const timeout = setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({ isFinished: true });
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answersState: null,
          });
        }

        clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = 'error';
      this.setState({
        answersState: { [answerId]: 'error' },
        results,
      });
    }
  }

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answersState: null,
      isFinished: false,
      results: {},
    });
  }

  async componentDidMount() {
    try {
      const response = await axios.get(`/quizes/${this.props.match.params.id}.json`),
        quiz = response.data;
      
      this.setState({ quiz, loading: false });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          {
            this.state.loading
              ? <Loader />
              : this.state.isFinished
                ? <FinishedQuiz
                  results={this.state.results}
                  quiz={this.state.quiz}
                  onRetry={this.retryHandler} />
                : <ActiveQuiz
                  answers={this.state.quiz[this.state.activeQuestion].answers}
                  question={this.state.quiz[this.state.activeQuestion].question}
                  onAnswerClick={this.onAnswerClickHandler}
                  quizLength={this.state.quiz.length}
                  answerNumber={this.state.activeQuestion + 1}
                  state={this.state.answersState} />
          }
        </div>
      </div>
    );
  }
}

export default Quiz;
