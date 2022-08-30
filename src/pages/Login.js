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

  handlechange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.buttonValidation());
  };

  buttonValidation = () => {
    const minimumCharacters = 6;
    const { email, password } = this.state;
    const passWordValidation = password.length >= minimumCharacters;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValidation = regex.test(email);
    // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    this.setState({ buttonDisabled: !(emailValidation && passWordValidation) });
  };

  handleClick = () => {
    const { saveLogin, history } = this.props;
    const { email } = this.state;
    saveLogin(email);
    history.push('/carteira');
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
              onChange={ this.handlechange }
            />
          </label>
          <label htmlFor="password">
            Senha
            <input
              name="password"
              type="password"
              id="password"
              data-testid="password-input"
              value={ password }
              onChange={ this.handlechange }
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
