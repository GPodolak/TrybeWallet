import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tbody>
            {expenses.map((expense) => {
              const expenseValue = Number(expense.value);
              const cambio = Number(expense.exchangeRates[expense.currency].ask);
              const cambioName = expense.exchangeRates[expense.currency].name;
              console.log(expense.exchangeRates[expense.currency].name);
              return (
                <tr key={ expense.id }>
                  <td>{expense.description}</td>
                  <td>{expense.tag}</td>
                  <td>{expense.method}</td>
                  <td>{Number(expenseValue).toFixed(2)}</td>
                  <td>{cambioName}</td>
                  <td>{Number(cambio).toFixed(2)}</td>
                  <td>{Number(cambio * expenseValue).toFixed(2)}</td>
                  <td>Real</td>
              </tr>);
            })}
          </tbody>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>método de pagamento</th>
            <th>valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor Convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
      </table>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});
Table.propTypes = { expenses: PropTypes.arrayOf(PropTypes.string) }.isRequired;
export default connect(mapStateToProps)(Table);
