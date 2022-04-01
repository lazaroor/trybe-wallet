import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../actions';
import './wallet.css';

class Wallet extends React.Component {
  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  render() {
    const { userEmail, currencies } = this.props;
    return (
      <main>
        <div className="wallet">
          <p data-testid="email-field">{userEmail}</p>
          <p data-testid="total-field">0</p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
        <section className="wallet-form">
          <input type="number" data-testid="value-input" />
          <input type="text" data-testid="description-input" />
          <label htmlFor="currency">
            Moeda
            <select id="currency">
              {currencies.map((currency) => (
                <option key={ currency }>{currency}</option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            Metódo de pagamento
            <select id="method" data-testid="method-input">
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <select data-testid="tag-input">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </section>
      </main>);
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
});

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  getCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
