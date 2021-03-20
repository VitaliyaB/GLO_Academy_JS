'use strict';

const allCurrency = ['RUB', 'USD', 'EUR'];
const allConvertName = {
  RUB: 'Российский рубль (RUB)',
  USD: 'Доллары США (USD)',
  EUR: 'Евро (EUR)'
};
const currencyFrom = document.getElementById('select_cur_from');
const currencyTo = document.getElementById('select_cur_to');
const convertFrom = document.getElementById('convert_from');
const convertTo = document.getElementById('convert_to');
const convertFromName = document.querySelector('#convert_from+span');
const convertToName = document.querySelector('#convert_to+span');
const convertBtn = document.getElementById('convert_button');
const errorMessage = document.getElementById('error');
const rate = document.getElementById('rate');

const getData = (baseCur, toCur) => fetch(`https://api.exchangeratesapi.io/latest?base=${baseCur}&symbols=${toCur}`);


const convertData = (event) => {
  event.preventDefault();

  if (/^\d+[.,]?\d{0,2}$/g.test(convertFrom.value) && convertFrom.value !== '') {
    getData(currencyFrom.value, currencyTo.value)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('status network not 200');
        }

        return response.json();
      })
      .then((data) => {
        const rateData = data.rates[currencyTo.value].toFixed(3);
        rate.textContent = rateData;
        convertTo.value = (convertFrom.value * rateData).toFixed(2);
      })
      .catch((err) => {
        console.log('changeCurTo ~ err', err);
      });
  } else {
    convertFrom.style.border = '1px solid red';
    errorMessage.style.color = 'red';
    errorMessage.textContent = 'Поле не должно быть пустым и должно быть в формате 123.12';
  }
};

const changeCurTo = (event) => {
  const eventValue = event.target.value;
  const currencyToValues = allCurrency.filter((item) => item !== eventValue);

  convertFromName.textContent = allConvertName[eventValue];
  Array.from(currencyTo.options).forEach((item) => item.remove());

  currencyToValues.forEach((item) => {
    const option = new Option(item, item);
    currencyTo.insertAdjacentElement('beforeend', option);
  });

  convertToName.textContent = allConvertName[currencyToValues[0]];
};

const changeCovertTo = (event) => {
  const eventValue = event.target.value;
  convertToName.textContent = allConvertName[eventValue];
};

const clearField = (event) => {
  const target = event.target;

  target.style.border = '1px solid #3d1063';
  errorMessage.textContent = '';
};

convertBtn.addEventListener('click', convertData);
currencyFrom.addEventListener('change', changeCurTo);
currencyTo.addEventListener('change', changeCovertTo);
convertFrom.addEventListener('focus', clearField);
