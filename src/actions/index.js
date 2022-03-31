// Coloque aqui suas actions
const LOGIN = 'LOGIN';

export const loginUser = (email) => ({
  type: LOGIN,
  email,
});

export const currentCurrency = (currency) => ({
  type: 'CURRENCY',
  currency,
});
