'use strict';

const body = document.body;
const color = document.getElementById('color');
const change = document.getElementById('change');

const randomColor = () => {
  let numColor = '';

  do {
    let num = Math.floor(Math.random() * 256).toString(16);
    if (num.length === 1) {
      num += num;
    }
    numColor += num;
  } while (numColor.length < 6);

  return numColor;
};

const setColor = () => {
  const colorNum = randomColor();

  color.textContent = '#' + colorNum;
  body.style.backgroundColor = '#' + colorNum;
  change.style.color = '#' + colorNum;
};

change.addEventListener('click', setColor);
