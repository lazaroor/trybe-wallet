import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <tbody className="expense-table">
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
          { expenses.length > 0
            && expenses.map(
              (currentExpense) => {
                const currencyName = currentExpense.exchangeRates[currentExpense.currency]
                  .name.split('/');
                let exchangeAsk = parseFloat(currentExpense
                  .exchangeRates[currentExpense.currency]
                  .ask);
                const convertedValue = exchangeAsk * currentExpense.value;
                exchangeAsk = exchangeAsk.toFixed(2);
                return (
                  <tr key={ currentExpense.id }>
                    <td>{currentExpense.description}</td>
                    <td>{currentExpense.tag}</td>
                    <td>{currentExpense.method}</td>
                    <td>{parseFloat(currentExpense.value).toFixed(2)}</td>
                    <td>{currencyName[0]}</td>
                    <td>{exchangeAsk}</td>
                    <td>{convertedValue}</td>
                    <td>Real</td>
                  </tr>
                );
              },
            )}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Table);
