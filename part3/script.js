'use strict';

const cityArr = {
  rus: ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Нижний Новгород', 'Казань', 'Челябинск'],
  uk: ['Киев', 'Харьков', 'Одесса', 'Днепр', 'Донецк', 'Запорожье', 'Львов'],
  bel: ['Минск', 'Гомель', 'Могилёв', 'Витебск', 'Гродно', 'Брест'],
  jap: ['Токио', 'Киото', 'Осака', 'Иокогама']
};

const country = document.getElementById('country');
const city = document.getElementById('city');
const result = document.querySelector('.result');

const selectCountry = (event) => {
  const targetValue = event.target.value;
  const data = cityArr[targetValue];

  if (city.style.display === 'inline-block') {
    Array.from(city.options).forEach((item) => item.remove());
  } else {
    city.style.display = 'inline-block';
  }

  data.forEach((item, idx) => {
    const option = new Option(item, idx + 1);
    city.insertAdjacentElement('beforeend', option);
  });
};

const selectCity = () => {
  result.textContent = `${country.options[country.options.selectedIndex].textContent},
                        ${city.options[city.options.selectedIndex].textContent}`;
};

country.addEventListener('change', selectCountry);
city.addEventListener('change', selectCity);
