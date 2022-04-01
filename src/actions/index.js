import getCurrencies from '../services/currenciesAPI';

export const LOGIN = 'LOGIN';
export const REQUESTING_CURRENCIES = 'REQUESTING_CURRENCIES';
export const REQUEST_CURRENCIES_SUCCESS = 'REQUEST_CURRENCIES_SUCCESS';
export const REQUEST_CURRENCIES_FAILURE = 'REQUEST_CURRENCIES_FAILURE';
export const REQUESTING_CURRENCIES_PRICES = 'REQUESTING_CURRENCIES_PRICES';
export const REQUEST_PRICE_SUCCESS = 'REQUEST_PRICE_SUCCESS';

export const loginUser = (email) => ({
  type: LOGIN,
  email,
});

// Actions da requisição dos tipos de moedas
export const requestCurrencies = () => ({
  type: REQUESTING_CURRENCIES,
});

export const requestCurrenciesSuccess = (currencies) => ({
  type: REQUEST_CURRENCIES_SUCCESS,
  currencies,
});

export const requestFailure = (error) => ({
  type: REQUEST_CURRENCIES_FAILURE,
  error,
});

export function fetchCurrencies() {
  return async (dispatch) => {
    dispatch(requestCurrencies());
    try {
      const data = await getCurrencies();
      const currencies = Object.keys(data);
      const filteredCurrencies = currencies.filter((currency) => currency !== 'USDT');
      dispatch(requestCurrenciesSuccess(filteredCurrencies));
    } catch (error) {
      dispatch(requestFailure(error));
    }
  };
}

// Requisição para armazenar o objeto inteiro retornado da API com a cotação

export const requestCurrenciePrices = () => ({
  type: REQUESTING_CURRENCIES_PRICES,
});

export const requestCurrenciesPricesSuccess = (expenses, exchangeRates, id) => ({
  type: REQUEST_PRICE_SUCCESS,
  expenses: { id, ...expenses, exchangeRates },
});

export function fetchCurrenciesPrice(expenses, id) {
  return async (dispatch) => {
    dispatch(requestCurrenciePrices());
    try {
      const data = await getCurrencies();
      dispatch(requestCurrenciesPricesSuccess(expenses, data, id));
    } catch (error) {
      dispatch(requestFailure(error));
    }
  };
}
