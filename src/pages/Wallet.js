import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import { fetchCurrencies, fetchExchangeRates } from '../redux/actions/index';

const InitialStateEdit = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação' };

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      editHandle: false,
      display: InitialStateEdit,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { edit, display } = this.state;
    const { getExchangeRates, expenses } = this.props;
    const newWallet = { id: expenses.length, ...display };
    if (edit) {
      getExchangeRates({ newWallet, edit: true, expenses });
    } else {
      getExchangeRates(newWallet);
    }
  };

  handleClickEdit = (id) => {
    const { expenses } = this.props;
    this.setState((prevState) => ({
      editHandle: !prevState.editHandle,
    }));

    const formDisplay = expenses.filter((element) => element.id === id);
    this.setState({ display: formDisplay[0] });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    const { display } = this.state;
    this.setState({
      display: {
        ...display,
        [name]: value,
      },
    });
  };

  handleClick = async () => {
    const { display } = this.state;
    const { getExchangeRates } = this.props;
    await getExchangeRates(display);
    this.handleState();
  };

  handleState = () => {
    this.setState(() => ({
      display: InitialStateEdit,
    }));
  };

  render() {
    const { display, editHandle } = this.state;
    return (
      <div>
        <Header />
        <WalletForm
          display={ display }
          edit={ editHandle }
          handleChange={ this.handleChange }
          handleClick={ this.handleClick }
          handleSubmit={ this.handleSubmit }
        />
        <Table
          handleEdit={ this.handleClickEdit }
        />
      </div>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  getExchangeRates: (state) => dispatch(fetchExchangeRates(state)),

});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});
Wallet.propTypes = { expenses: PropTypes.arrayOf(PropTypes.string) }.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
