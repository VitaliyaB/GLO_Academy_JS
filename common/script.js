'use strict';

let startBot = function() {
  // random number
  let getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  let choosenNumber = getRandomInt(1, 100);
  console.log('choosenNumber: ', choosenNumber);

  // check user input
  let isNumber = function(num) {
    return !isNaN(num) && isFinite(num);
  };

  // user input 
  let askUserNumber = function() {
    let number = prompt('Угадай число от 1 до 100');

    if (number === null) {
      alert('Игра окончена');
      return;
    } else {
      number = parseFloat(number);
    }

    // compare user num and choosen num
    let checkUserNumber = function(num) {
      if (num > choosenNumber) {
        alert('Загаданное число меньше');
        askUserNumber();
      } else if (num < choosenNumber) {
        alert('Загаданное число больше');
        askUserNumber();
      } else {
        alert('Поздравляю, Вы угадали!!!');
      }
    };

    if (isNumber(number) && number >= 1 && number <= 100) {
      checkUserNumber(number);
    } else {
      alert('Введи число!');
      askUserNumber();
    }
  };

  askUserNumber();
};

startBot();
