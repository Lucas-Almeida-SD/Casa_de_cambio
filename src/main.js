import './style.css';
import Swal from 'sweetalert2';

const {API_KEY} = process.env;
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest`;
const ID = {
  currencyInput: 'currency-input',
  currencyList: 'currency-list',
  submitBtn: 'submit-btn',
  conversionRates: 'conversion-rates',
  conversionRatesTitle: 'conversion-rates-title',
};

function messageError(message) {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message,
  });
}

function generateCurrencyOption(currency) {
  const option = document.createElement('option');
  option.value = currency;
  option.innerText = currency;
  return option;
}

async function generateCurrencyList() {
  try {
    const data = await fetch(`${BASE_URL}/AED`)
        .then((response) => response.json());

    const currencyList = Object.keys(data.conversion_rates);

    const currencyInput = document.querySelector(`#${ID.currencyInput}`);
    const currencyDatalist = document.querySelector(`#${ID.currencyList}`);
    currencyList.forEach((currency) => {
      currencyDatalist.appendChild((generateCurrencyOption(currency)));
    });
    currencyInput.disabled = false;
  } catch (error) {
    messageError('Erro ao carregar lista de moedas. Recarregue a página!');
  }
}

window.onload = () => {
  generateCurrencyList();
};
