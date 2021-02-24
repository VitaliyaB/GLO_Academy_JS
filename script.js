'use strict';

function funcNum(arr) {
  const newArr = arr.map((item, idx) => {
    let count = 0;
    for (let i = idx; i < arr.length; i++) {
      if (arr[i + 1] < item) {
        count++;
      }
    }
    return count;
  });

  return newArr;
}

console.log(funcNum([15, 1, 2, 3, 0, 12, 4]));
