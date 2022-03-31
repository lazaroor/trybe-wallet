// Coloque aqui suas actions

import getCurrencies from '../services/currenciesAPI';

export const loginUser = (email) => ({
  type: 'LOGIN',
  email,
});

export const requestCurrencies = () => ({
  type: 'REQUESTING_CURRENCIES',
});

export const requestCurrenciesSuccess = (currencies) => ({
  type: 'REQUEST_CURRENCIES_SUCCESS',
  currencies,
});

export const requestCurrenciesFailure = (error) => ({
  type: 'REQUEST_CURRENCIES_FAILURE',
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
      dispatch(requestCurrenciesFailure(error));
    }
  };
}
