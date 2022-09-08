import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLog } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      buttonDisabled: true,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.buttonValidation());
  };

  buttonValidation = () => {
    const minimumCharacters = 6;
    const { email, password } = this.state;
    const passwordValidation = password.length >= minimumCharacters;
    const emailValidation = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail    const passwordVal = password.length >= minimumCharacters;
    this.setState({ buttonDisabled: !(emailValidation && passwordValidation) });
  };

  handleClick = () => {
    console.log('clicou');
    const { saveLogin, history } = this.props;
    const { email } = this.state;
    saveLogin(email); // botão habilitado para o clique, email valido enviado salvo no state
    history.push('/carteira'); // no clique do botão a rota é redirecionada para carteira;
  };

  render() {
    const { email, password, buttonDisabled } = this.state;

    return (
      <div>
        <section>
          <label htmlFor="email">
            Email
            <input
              name="email"
              type="text"
              id="email"
              data-testid="email-input"
              value={ email }
              onChange={ this.handleChange }
            // onKeyUp={ this.handleChange }
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              name="password"
              type="password"
              id="password"
              data-testid="password-input"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            disabled={ buttonDisabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </section>
      </div>
    );
  }
}

Login.propTypes = {
  saveLogin: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveLogin: (email) => dispatch(userLog(email)),
});

export default connect(null, mapDispatchToProps)(Login);
