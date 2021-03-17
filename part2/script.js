'use strict';

function getResult(x, y) {
  const pow = x ** y;
  const powArr = pow.toString().split('');

  return powArr.reduce((acc, item) => acc + +item, 0);
}

console.log(getResult(4, 8));
