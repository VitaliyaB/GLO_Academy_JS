let money = 1000; // monthly income
let income = 500; // additional income
let addExpenses = 'Phone, Intetnet, Taxi, Bills'; // additional expenses
let deposit = true; // have deposit?
let mission = 10000; // amount of savings
let period = 6; // period of savings

// first task: output the data type of money, income, deposit
console.log('money: ', typeof money);
console.log('income: ', typeof income);
console.log('deposit: ', typeof deposit);

// second task: output the string length of addExpenses
console.log('addExpenses length: ', addExpenses.length);

// third task: output the period and mission
console.log('The period of savings is equal (month): ' + period + '\nThe mission to earn money is ' + mission + ' USD');

// fourth task: addExpenses to lower case and make an array
const addExpensesLowerCase = addExpenses.toLocaleLowerCase();
console.log('The array of addintional expenses: ', addExpensesLowerCase.split(', '));

// fifth task: declare variables budgetDay and count budgetDay
const budgetDay = money / 30;
console.log('budgetDay: ', budgetDay);
