import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import fetchAPI from '../Services/Services';
import { fetchCurrencies } from '../redux/actions/index';

class WalletForm extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.loadCurrencies();
  }

  handleState() {
    this.setState((state) => ({
      id: state.id + 1,
      value: '',
      description: '',
      method: '',
    }));
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  loadCurrencies = async () => {
    const { getCurrencies } = this.props;
    const test = await getCurrencies();
    console.log(test);
  };

  render() {
    const { currencies } = this.props;
    const { value, description, tag, currency, method } = this.state;
    return (
      <form>
        <div>
          <label htmlFor="valor">
            Valor
            <input
              name="value"
              id="valor"
              type="number"
              data-testid="value-input"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
        </div>

        <div>
          <label htmlFor="currency-input">
            Moeda
            <select
              className="form-select"
              name="currency"
              id="currency-input"
              value={ currency }
              onChange={ this.handleChange }
              data-testid="currency-input"
            >
              {currencies.map((coin, index) => (
                <option
                  key={ index }
                >
                  { coin }
                </option>
              ))}
              ;
            </select>
          </label>
        </div>

        <div>
          Método de pagamento
          <label htmlFor="method-input">
            <select
              name="method"
              value={ method }
              id="method-input"
              onChange={ this.handleChange }
              data-testid="method-input"
            >

              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
        </div>

        <div>
          <label htmlFor="tag-input">
            Tag
            <select
              name="tag"
              value={ tag }
              id="tag-input"
              onChange={ this.handleChange }
              data-testid="tag-input"
            >

              <option value="Alimentção">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </div>

        <div>
          <label htmlFor="tag-input">
            Descrição
            <input
              name="description"
              id="description"
              type="text"
              value={ description }
              onChange={ this.handleChange }
              data-testid="description-input"
            />
          </label>
        </div>

        <button
          type="button"
          onClick={ () => {
            /*           getInfo({
              id,
              value,
              description,
              currency,
              method,
              tag,
            });
            this.handleState(); */
          } }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}
WalletForm.propTypes = {
  getCurrencies: PropTypes.func,
  currencies: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),

});
export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
