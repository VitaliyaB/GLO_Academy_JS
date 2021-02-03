'use strict';

// * Part one (output numbers with first difit 2 or 4)
let arr = ['3743428', '20574565', '75902', '4891236', '2798450', '632892', '489546897'];

for (let i = 0; i < arr.length; i++) {
  if(arr[i][0] === '2' || arr[i][0] === '4') {
    console.log(arr[i]);
  }
}

console.log('**************************************');

// * Part two (output all primes from 1 to 100)
for (let i = 1; i <= 100; i++) {
  let count = 0;

  if (i === 1) {
    continue;
  }

  for (let k = 2; k <= i; k++) {
    if (i % k === 0 && k < i) {
      break;
    } else if (i % k !==0 && k < i) {
      continue;
    } else {
      console.log(i + ' Делители этого числа: 1 и ' + i);
    }
  }
}
