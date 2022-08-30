import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;

    // soma total das despesas
    const totalExpenses = expenses.reduce((acc, expense) => {
      const exchange = expense.exchangeRates[expense.currency].ask;
      const exchangedValue = (Number(expense.value) * exchange).toFixed(2);
      return acc + Number(exchangedValue);
    }, 0);

    // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
    return (
      <div>
        <header>
          <p>Wallet</p>
          <p data-testid="email-field">
            { email }
          </p>
          <p data-testid="total-field">
            {Number(totalExpenses).toFixed(2)}
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default connect(mapStateToProps)(Header);
