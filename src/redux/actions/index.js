// Coloque aqui suas actions
/* import fetchAPI from '../../Services/Services';
 */

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
