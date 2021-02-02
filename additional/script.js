'use strict';

let checkString = function (data) {
  if (typeof data !== 'string') {
    return 'Передана не строка';
  }

  data = data.trim();

  if (data.length > 30) {
    return data.substring(0, 30) + '...';
  }

  return data;
};

console.log(checkString('Lorem ipsum, dolor sit amet consectetur adipisicing'));
console.log(checkString('    Lorem ipsum, dolor sit amet consectetur adipisicing '));
console.log(checkString('Lorem ipsum, dolor sit'));
console.log(checkString('Lorem ipsum, dolor sit   '));
console.log(checkString(123));
console.log(checkString(true));

