import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpense } from '../redux/actions';

class Table extends Component {
  handleClickDelete = (id) => {
    const { deleteExpenses } = this.props;
    deleteExpenses(id);
  };

  render() {
    const { expenses, handleEdit } = this.props;
    console.log(expenses);
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => {
            const expenseValue = Number(expense.value);
            const cambio = Number(expense.exchangeRates[expense.currency].ask);
            const cambioName = expense.exchangeRates[expense.currency].name;
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
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.handleClickDelete(expense.id) }
                  >
                    Excluir
                  </button>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => handleEdit(expense.id) }
                  >
                    Editar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpenses: (expenseId) => dispatch(removeExpense(expenseId)),

});
Table.propTypes = { expenses: PropTypes.arrayOf(PropTypes.string) }.isRequired;
export default connect(mapStateToProps, mapDispatchToProps)(Table);
