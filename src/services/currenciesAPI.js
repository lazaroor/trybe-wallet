const CURRENCIES_API = 'https://economia.awesomeapi.com.br/json/all';

const getCurrencies = async () => {
  const response = await fetch(CURRENCIES_API);
  const json = await response.json();
  return json;
};

export default getCurrencies;
