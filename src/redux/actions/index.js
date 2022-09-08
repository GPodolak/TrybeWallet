// Coloque aqui suas actions
import fetchAPI from '../../Services/Services';

export const LOGIN_USER = 'LOGIN_USER';
export const CHANGE_WALLET = 'CHANGE_WALLET';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const userLog = (email) => ({
  type: LOGIN_USER,
  email,
});

export const requestCurrencies = (currencies) => ({
  type: REQUEST_CURRENCIES,
  currencies,
});

export function fetchCurrencies() {
  return async (dispatch) => {
    const callCurrencies = await fetchAPI();
    delete callCurrencies.USDT;
    dispatch(requestCurrencies(callCurrencies));
  };
}

export const getWallet = (stateAndExchangeRates) => ({
  type: CHANGE_WALLET,
  expense: stateAndExchangeRates.state,
  exchangeRates: stateAndExchangeRates.exchangeRates,
});

export function fetchExchangeRates(state) {
  return async (dispatch) => {
    const exchangeRates = await fetchAPI();
    dispatch(getWallet({ state, exchangeRates }));
  };
}
export const removeExpense = (expense) => ({
  type: DELETE_EXPENSE,
  expense,
});
