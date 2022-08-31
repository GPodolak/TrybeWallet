// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CHANGE_WALLET, REQUEST_CURRENCIES, DELETE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return {
      ...state,
      currencies: Object.keys(action.currencies),
    };
  case CHANGE_WALLET:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        {
          id: state.expenses.length,
          ...action.expense,
          exchangeRates: action.exchangeRates,
        },
      ],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense !== action.expense),
    };
  default:
    return state;
  }
};
export default walletReducer;
