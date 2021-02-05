'use strict';

let getRandomNum = function() {
  // random number
  let getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  let choosenNumber = getRandomInt(1, 100);
  console.log('choosenNumber: ', choosenNumber);

  // user input
  return function askUserNumber() {
    let number = prompt('Угадай число от 1 до 100');

    if (number === null) {
      alert('Игра окончена');
      return;
    } else {
      number = parseFloat(number);
    }

    // check user input
    let isNumber = function() {
      return !isNaN(number) && isFinite(number);
    };

    // compare user num and choosen num
    let checkUserNumber = function() {
      if (number > choosenNumber) {
        alert('Загаданное число меньше');
        askUserNumber();
      } else if (number < choosenNumber) {
        alert('Загаданное число больше');
        askUserNumber();
      } else {
        alert('Поздравляю, Вы угадали!!!');
      }
    };

    if (isNumber() && number >= 1 && number <= 100) {
      checkUserNumber();
    } else {
      alert('Введи число!');
      askUserNumber();
    }

  };
};

let starBot = getRandomNum();
let userGame = starBot();

console.dir(starBot);
