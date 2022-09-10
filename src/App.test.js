import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from './App';
import renderWithRouterAndRedux from './tests/helpers/renderWith';
import Wallet from './pages/Wallet';

const userEmail = 'nome@email.com';
const passWordInput = 'password-input';
const emailInput = 'email-input';

describe('teste da pagina de Login', () => {
  it('Teste da pagina de login', () => {
    renderWithRouterAndRedux(<App />);
    const btn = screen.getAllByRole('button', { name: /entrar/i });
    expect(btn[0]).toBeDefined();
    expect(btn[0]).toBeDisabled();
    const email = screen.getAllByTestId(emailInput)[0];
    expect(email).toBeDefined();
    const getPassWord = screen.getAllByTestId(passWordInput)[0];
    expect(getPassWord).toBeDefined();
  });
});

describe('testar se o botão está habilitado casa um email e senha validos', () => {
  it('testar se o botão está habilitado casa um email e senha validos', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getAllByRole('button', { name: /entrar/i })[0];
    expect(button).toBeDisabled();
    const email = screen.getAllByTestId(emailInput)[0];
    userEvent.type(email, userEmail);
    expect(button).toBeDisabled();
    const getPassWord = screen.getAllByTestId(passWordInput)[0];
    userEvent.type(getPassWord, '12345678');
    expect(button.disabled).toBe(false);
    userEvent.click(button);
    expect(screen.getByText(/nome@email.com/i)).toBeInTheDocument();
  });
});

describe(
  'Testa se após efetuar o login é redirecionado para a pagina de carteira',
  () => {
    it('Testa se após efetuar o login é redirecionado para a pagina de carteira', () => {
      const { history } = renderWithRouterAndRedux(<App />);
      const button = screen.getAllByRole('button', { name: /entrar/i })[0];
      const email = screen.getAllByTestId(emailInput)[0];
      const getPassWord = screen.getAllByTestId(passWordInput)[0];
      userEvent.type(email, userEmail);
      userEvent.type(getPassWord, '12345678');
      userEvent.click(button);
      expect(history.location.pathname).toBe('/carteira');
    });
  },
);

describe('testa o componente Header', () => {
/*   it('testa se o email aparece quando é renderizado o componente Header', () => {
    const INITIAL_STATE = { user: { email: userEmail } };
    renderWithRouterAndRedux(<Wallet />, { INITIAL_STATE });
    const email = screen.getByText(userEmail)[0];
    expect(email).toBeDefined();
      expect(email).toHaveTextContent(/nome@email.com/i);
  }); */
  it('testa se o valor da despesa aparece corretamente', async () => {
    renderWithRouterAndRedux(<Wallet />);
    const value = await screen.findByLabelText(/valor/i);
    expect(screen.getByTestId('total-field')).toHaveTextContent('0.00');
    userEvent.type(value, '10');
    const Description = screen.getByTestId('description-input');
    const button = screen.getByText(/Adicionar despesa/i);
    userEvent.click(button);
    const valueExpenses = await screen.findAllByText('51.48');
    expect(Description).toBeInTheDocument();
    expect(valueExpenses[0]).toBeDefined();
  });
});
