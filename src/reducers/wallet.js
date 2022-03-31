// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_CURRENCIES_SUCCESS':
    return {
      ...state,
      currencies: action.currencies,
    };
  case 'REQUEST_CURRENCIES_FAILURE':
    return {
      ...state,
    };
  default:
    return state;
  }
};

export default wallet;
