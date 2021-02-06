'use strict';

let generateOddNumber = function (x, y) {
  let min, max, generatedNumber;

  if (x > y) {
    min = y;
    max = x;
  } else {
    min = x;
    max = y;
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  generatedNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  if (generatedNumber % 2 === 0) {
    if (
      generatedNumber === min ||
      (generatedNumber === max && max <= 0 && generatedNumber !== min) ||
      generatedNumber !== max
    ) {
      return ++generatedNumber;
    } else {
      return --generatedNumber;
    }
  } else {
    return generatedNumber;
  }
};

console.log('generateOddNumber(1, 100): ', generateOddNumber(1, 100));
console.log('generateOddNumber(0, -10): ', generateOddNumber(0, -10));
console.log('generateOddNumber(-7, -3): ', generateOddNumber(-7, -3));
console.log('generateOddNumber(-100, 100): ', generateOddNumber(-100, 100));
console.log('generateOddNumber(1, -1): ', generateOddNumber(1, -1));
