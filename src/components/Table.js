export default class Table extends Component {
  render() {
    return (
      <table>
        <thead>
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
