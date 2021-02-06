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
  let attemptNum = 10;

  // user input
  return function askUserNumber() {
    let number = prompt('Угадай число от 1 до 100');

    let endGame = function() {
      alert('Игра окончена');
    };

    let startNewGame = function() {
      attemptNum = 10;
      choosenNumber = getRandomInt(1, 100);
      console.log('choosenNumber: ', choosenNumber);
      askUserNumber();
    };

    if (number === null) {
      endGame();
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
      attemptNum--;
      if (attemptNum === 0) {
        if (confirm('Попытки закончились, хотите сыграть еще?')) {
          startNewGame();
        } else {
          endGame();
          return;
        }
      } else {
        if (number > choosenNumber) {
          alert('Загаданное число меньше, осталось попыток ' + attemptNum);
          askUserNumber();
        } else if (number < choosenNumber) {
          alert('Загаданное число больше, осталось попыток ' + attemptNum);
          askUserNumber();
        } else {
          if (confirm('Поздравляю, Вы угадали!!! Хотели бы сыграть еще?')) {
            startNewGame();
          } else {
            endGame();
            return;
          }
        }
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

console.dir(getRandomNum);
console.dir(starBot);
