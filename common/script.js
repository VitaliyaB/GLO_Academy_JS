'use strict';

let money; // monthly income
let income = 'Фриланс'; // additional income
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 
                          'Одежда, техника, развлечения'); // additional expenses
let deposit = confirm('Есть ли у вас депозит в банке?'); // have deposit?
let mission = 10000; // amount of savings
let period = 6; // period of savings
let expenses = [];

// check data for a number
let isNumber = function (data) {
  return !isNaN(parseFloat(data)) && isFinite(data);
};

// monthly income
let start = function () {
  do {
    money = prompt('Ваш месячный доход?', 10000);
  } while (!isNumber(money));

  money = Number(money);
};

start();

// sum of all expenses
let getExpensesMonth = function() {
  let sum = 0;

  for (let i = 0; i < 2; i++) {
    let amountAnswer;

    expenses[i] = prompt('Введите обязательную статью расходов?', 'Комуналка');

    do {
      amountAnswer = prompt('Во сколько это обойдется?', 100);
    } while (!isNumber(amountAnswer));

    sum += +amountAnswer;
  }

  return sum;
};

let expensesAmount = getExpensesMonth();

// savings per month
let getAccumulatedMonth = function(money, amountExpenses) {
  return money - amountExpenses;
};

// count time to achieve mission
let getTargetMonth = function(goal, monthBudget) {
  if (Math.ceil(goal / monthBudget) < 0) {
    return 'Цель не будет достигнута';
  } else {
    return 'Цель будет достигнута';
  }
};

// return the data type
let showTypeOf = function(a) {
  return typeof a;
};

// status income
function getStatusIncome(budget) {
  switch (true) {
    case budget >= 1200:
      console.log('У вас высокий уровень дохода');
      break;
    case (budget >= 600 && budget < 1200):
      console.log('У вас средний уровень дохода');
      break;
    case (budget >= 0 && budget < 600):
      console.log('К сожалению у вас уровень дохода ниже среднего');
      break;
    default:
      console.log('Что-то пошло не так');
  }
}

let accumulatedMonth = getAccumulatedMonth(money, expensesAmount);
let budgetDay = accumulatedMonth / 30;

// output the data type of money, income, deposit
console.log('money: ', showTypeOf(money));
console.log('income: ', showTypeOf(income));
console.log('deposit: ', showTypeOf(deposit));

// output sum of all expenses
console.log('Расходы за месяц: ', expensesAmount);

// addExpenses to lower case and make an array
console.log('Массив дополнительных расходов: ', addExpenses.toLowerCase().split(', '));

// mission will be achieved in ... month
console.log('Цель будет достигнута за (месяц): ', getTargetMonth(mission, accumulatedMonth));

// output budgetDay
console.log('Бюджет на день: ', Math.floor(budgetDay));

// output income status
getStatusIncome(budgetDay);