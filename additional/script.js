let num = 266219;
let newNum = 1;

num = num.toString();

// multiply each digit of num
for (let i = 0; i < num.length; i += 2) {
  newNum *= +num[i] * +num[i+1];
}

console.log('newNum: ', newNum);

// newNum raise to the power of 3
newNum = newNum ** 3;
console.log('newNum raise to the power of 3: ', newNum);

// output first two digits of newNum
console.log('First two digits of newNum: ', newNum.toString().substr(0, 2));
