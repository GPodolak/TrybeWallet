// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

export const LOGIN_USER = 'LOGIN_USER';

export const getLogin = (email) => ({
  type: LOGIN_USER,
  email,
});
