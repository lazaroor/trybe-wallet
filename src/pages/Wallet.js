import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrencies, fetchCurrenciesPrice } from '../actions';
import Table from './Table';
import './wallet.css';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: '',
    };
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const { value } = target;
    this.setState({ [name]: value }, this.loginValidate);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { addExpense, expenses } = this.props;
    addExpense(this.state, expenses.length);
    this.setState({
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: '',
      description: '',
    });
  }

  totalValue = () => {
    const { expenses } = this.props;
    const amount = expenses.reduce((previousValue, currentValue) => {
      const { value, exchangeRates } = currentValue;
      const conversion = currentValue.currency;
      previousValue += value * exchangeRates[conversion].ask;
      return previousValue;
    }, 0);
    return amount.toFixed(2);
  };

  render() {
    const { userEmail, currencies } = this.props;
    const { value, currency, method, tag, description } = this.state;
    return (
      <main>
        <div className="wallet">
          <p data-testid="email-field">{userEmail}</p>
          <p data-testid="total-field">{this.totalValue()}</p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
        <form className="wallet-form">
          <label htmlFor="value">
            Valor
            <input
              id="value"
              name="value"
              value={ value }
              type="number"
              data-testid="value-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Descrição
            <input
              id="description"
              name="description"
              value={ description }
              type="text"
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda
            <select
              id="currency"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              {currencies.map((currencyAPI) => (
                <option key={ currencyAPI }>{currencyAPI}</option>
              ))}
            </select>
          </label>
          <label htmlFor="payment_method">
            Metódo de pagamento
            <select
              id="payment_method"
              name="method"
              data-testid="method-input"
              value={ method }
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria
            <select
              id="tag"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
              data-testid="tag-input"
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button
            type="submit"
            onClick={ this.handleSubmit }
          >
            Adicionar despesa
          </button>
        </form>
        <Table />
      </main>);
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  addExpense: (expense, key) => dispatch(fetchCurrenciesPrice(expense, key)),
});

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  getCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  addExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
