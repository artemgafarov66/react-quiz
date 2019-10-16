import axios from '../../axios/axios-quiz';
import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY,
} from './actionTypes';

function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length;
}

export function fetchQuizes() {
  return async dispatch => {
    dispatch(fetchQuizesStart())
    try {
      const response = await axios.get('/quizes.json'),
        quizes = [];

      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест №${index + 1}`,
        });
      });

      dispatch(fetchQuizesSuccess(quizes));
    } catch (e) {
      dispatch(fetchQuizesError(e));
    }
  }
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START,
  }
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes,
  }
}

export function fetchQuizesError(error) {
  return {
    type: FETCH_QUIZES_ERROR,
    error,
  }
}

export function fetchQuizById(quizId) {
  return async dispatch => {
    dispatch(fetchQuizesStart());
    try {
      const response = await axios.get(`/quizes/${quizId}.json`),
        quiz = response.data;

      dispatch(fetchQuizSuccess(quiz));
    } catch (e) {
      dispatch(fetchQuizesError(e));
    }
  };
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz,
  };
}

export function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results,
  };
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ,
  };
}

export function quizNextQuestion(number) {
  return {
    type: QUIZ_NEXT_QUESTION,
    number,
  };
}

export function quizRetry() {
  return {
    type: QUIZ_RETRY,
  };
}

export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz,
      question = state.quiz[state.activeQuestion],
      results = { ...state.results };

    if (state.answerState) {
      const key = Object.values(state.answerState)[0];
      if (key === 'success') {
        return;
      }
    }

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success';
      }
      dispatch(quizSetState({ [answerId]: 'success' }, results));
      const timeout = setTimeout(() => {
        if (isQuizFinished(state)) {
          dispatch(finishQuiz());
        } else {
          dispatch(quizNextQuestion(state.activeQuestion + 1));
        }

        clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = 'error';
      dispatch(quizSetState({ [answerId]: 'error' }, results));
    }
  };
}
