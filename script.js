'use strict';

let allNumbers= [1, 2, 4, 5, 6, 7, 8];
let someNumbers = [1, 2, 'Hello', 4, 5, 'world', 6, 7, 8];
let noNumbers = ['здесь', 'нет',  'чисел'];

function isSomeTrue(array, func) {
  let res = func(array[array.length - 1]);

  if (res) {
    return !!res;
  }

  if (array.length) {
    array.length = array.length - 1;
    return !!(res + isSomeTrue(array, isNumber));
  }

}

function isNumber(val) {
  return typeof val === 'number';
}

console.log(isSomeTrue(allNumbers, isNumber));
console.log(isSomeTrue(someNumbers, isNumber));
console.log(isSomeTrue(noNumbers, isNumber));
