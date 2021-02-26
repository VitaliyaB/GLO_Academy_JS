'use strict';

const body = document.body;
const color = document.getElementById('color');
const change = document.getElementById('change');

const randomColor = (times) => {
  if (!times) {
    return '';
  } else {
    let num = Math.floor(Math.random() * 256).toString(16);

    if (num.length === 1) {
      num += num;
    }

    return num + randomColor(times - 1);
  }
};

const setColor = () => {
  const colorNum = randomColor(3);

  color.textContent = '#' + colorNum;
  body.style.backgroundColor = '#' + colorNum;
  change.style.color = '#' + colorNum;
};

change.addEventListener('click', setColor);
