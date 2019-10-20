
import axios from '../../axios/axios-quiz';
import {
  CREATE_QUIZ_QUIESTION,
  RESET_QUIZ_CREATION,
} from './actionTypes';

export function createQuizQuestion(item) {
  return {
    type: CREATE_QUIZ_QUIESTION,
    item,
  }
}

export function resetQuizCreation(params) {
  return {
    type: RESET_QUIZ_CREATION,
  }
}

export function finishCreateQuiz() {
  return async (dispatch, getState) => {
    axios.post('/quizes.json', getState().create.quiz);
    dispatch(resetQuizCreation());
  }
}