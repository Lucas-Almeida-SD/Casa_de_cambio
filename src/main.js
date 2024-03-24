import './style.css';
import Swal from 'sweetalert2';

const {API_KEY} = process.env;
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest`;
const ID = {
  selectCurrency: 'select-currency',
  submitBtn: 'submit-btn',
  conversionRates: 'conversion-rates',
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

async function generateCurrencySelect() {
  try {
    const data = await fetch(`${BASE_URL}/AED`)
        .then((response) => response.json());

    const currencyList = Object.keys(data.conversion_rates);

    const selectCurrency = document.querySelector(`#${ID.selectCurrency}`);
    currencyList.forEach((currency) => {
      selectCurrency.appendChild((generateCurrencyOption(currency)));
    });
    selectCurrency.disabled = false;
  } catch (error) {
    messageError('Erro ao carregar lista de moedas. Recarregue a página!');
  }
}

window.onload = () => {
  generateCurrencySelect();
};
