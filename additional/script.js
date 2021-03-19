'use strict';

document.addEventListener('DOMContentLoaded', () => {

  const select = document.getElementById('cars');
  const output = document.getElementById('output');

  const getData = () => new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();

    request.addEventListener('readystatechange', () => {
      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 200) {
        const data = JSON.parse(request.responseText);
        resolve(data);
      } else {
        reject(request.status);
      }
    });

    request.open('GET', 'cars.json');
    request.setRequestHeader('Content-type', 'application/json');
    request.send();
  });

  select.addEventListener('change', () => {
    getData()
      .then((response) => {
        response.cars.forEach((item) => {
          if (item.brand === select.value) {
            const { brand, model, price } = item;
            output.innerHTML = `Тачка ${brand} ${model} <br>
                        Цена: ${price}$`;
          }
        });
      })
      .catch((err) => {
        console.log('select.addEventListener ~ err', err);
        output.innerHTML = 'Произошла ошибка';
      });
  });
});
