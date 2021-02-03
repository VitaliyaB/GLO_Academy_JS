'use strict';

// * Part one (output numbers with first difit 2 or 4)
let arr = ['3743428', '20574565', '75902', '4891236', '2798450', '632892', '489546897'];

for (let i = 0; i < arr.length; i++) {
  if(arr[i][0] === '2' || arr[i][0] === '4') {
    console.log(arr[i]);
  }
}

