'use strict';

let money = +prompt('Ваш месячный доход?', 10000); // monthly income
let income = 100; // additional income
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Одежда, техника, развлечения'); // additional expenses
let deposit = confirm('Есть ли у вас депозит в банке?'); // have deposit?
let mission = 10000; // amount of savings
let period = 6; // period of savings
let expenses1 = prompt('Введите обязательную статью расходов?', 'Комуналка'); // required expenses item 1
let amount1 = +prompt('Во сколько это обойдется?', '100'); // cost of expenses item 1
let expenses2 = prompt('Введите обязательную статью расходов?', 'Телефон'); // required expenses item 2
let amount2 = +prompt('Во сколько это обойдется?', '50'); // cost of expenses item 2

// sum of all expenses
let getExpensesMonth = function(expensesAmount1, expensesAmount2) {
  return expensesAmount1 + expensesAmount2;
};

// savings per month
let getAccumulatedMonth = function(income1, income2, expensesAmount1, expensesAmount2) {
  return income1 + income2 - expensesAmount1 - expensesAmount2;
};

// count time to achieve mission
let getTargetMonth = function(goal, monthBudget) {
  return Math.ceil(goal / monthBudget);
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

let accumulatedMonth = getAccumulatedMonth(money, income, amount1, amount2);
let budgetDay = accumulatedMonth / 30;

// output the data type of money, income, deposit
console.log('money: ', showTypeOf(money));
console.log('income: ', showTypeOf(income));
console.log('deposit: ', showTypeOf(deposit));

// output sum of all expenses
console.log('Расходы за месяц: ', getExpensesMonth(amount1, amount2));

// addExpenses to lower case and make an array
console.log('Массив дополнительных расходов: ', addExpenses.toLowerCase().split(', '));

// mission will be achieved in ... month
console.log('Цель будет достигнута за (месяц): ', getTargetMonth(mission, accumulatedMonth));

// output budgetDay
console.log('Бюджет на день: ', Math.floor(budgetDay));

// output income status
getStatusIncome(budgetDay);