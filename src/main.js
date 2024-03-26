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

function generateConversionRateBox(currency, value) {
  const conversionRateBox = document.createElement('div');
  conversionRateBox.classList.add('conversion-rate-box');

  const symbolDiv = document.createElement('div');
  symbolDiv.classList.add('symbol-box');

  const icon = document.createElement('img');
  icon.src = './../utils/images/coin.png';

  const currencySpan = document.createElement('span');
  currencySpan.innerText = currency;

  const valueSpan = document.createElement('span');
  valueSpan.classList.add('currency-value');
  valueSpan.innerText = value;

  symbolDiv.appendChild(icon);
  symbolDiv.appendChild(currencySpan);

  conversionRateBox.appendChild(symbolDiv);
  conversionRateBox.appendChild(valueSpan);
  return conversionRateBox;
}

function generateConversionRateList() {
  const submitBtn = document.querySelector(`#${ID.submitBtn}`);
  submitBtn.addEventListener('click', async (event) => {
    event.preventDefault();

    try {
      const currencyInput = document.querySelector(`#${ID.currencyInput}`);

      const data = await fetch(`${BASE_URL}/${currencyInput.value}`)
          .then((response) => response.json());
      if (data.result === 'error') throw new Error(data['error-type']);
      const {conversion_rates: conversionRates} = data;

      const conversionRatesDiv = document.querySelector(`#${ID.conversionRates}`);
      Array.from(conversionRatesDiv.children).forEach((child) => child.remove());

      const conversionRatesTitle = document.querySelector(`#${ID.conversionRatesTitle}`);
      conversionRatesTitle.innerText = `Valores referentes a 1 ${currencyInput.value}`;

      Object.entries(conversionRates).forEach(([key, value]) => {
        conversionRatesDiv.appendChild(generateConversionRateBox(key, value));
      });
    } catch (error) {
      messageError('Erro ao pesquisar moeda. Tente novamente!');
    }
  });
}

window.onload = () => {
  generateCurrencyList();
  generateConversionRateList();
};
