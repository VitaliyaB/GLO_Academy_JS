'use strict';

const userText = document.getElementById('user-text');
const output = document.getElementById('output');

const debounce = (func, wait) => {
  let timeout;

  return function() {
    const start = () => {
      timeout = null;
      func();
    };
    clearTimeout(timeout);

    timeout = setTimeout(start, wait);

  };
};

const outputText = debounce(() => {
  output.textContent = userText.value;
}, 300);

userText.addEventListener('input', outputText);
