// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOGIN_USER } from '../actions';

const INITIAL_STATE = {
  email: '',
};

function user(state = INITIAL_STATE, actions) {
  switch (actions.type) {
  case LOGIN_USER:
    return {
      ...state,
      email: actions.email,
    };
  default:
    return state;
  }
}
export default user;
