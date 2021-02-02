'use strict';

let money = +prompt('Ваш месячный доход?', 1000); // monthly income
let income = 100; // additional income
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Одежда, техника, развлечения'); // additional expenses
let deposit = confirm('Есть ли у вас депозит в банке?'); // have deposit?
let mission = 10000; // amount of savings
let period = 6; // period of savings
let expenses1 = prompt('Введите обязательную статью расходов?', 'Комуналка'); // required expenses item 1
let amount1 = prompt('Во сколько это обойдется?', '100'); // cost of expenses item 1
let expenses2 = prompt('Введите обязательную статью расходов?', 'Телефон'); // required expenses item 2
let amount2 = prompt('Во сколько это обойдется?', '50'); // cost of expenses item 2
let budgetMonth = money + income - amount1 - amount2; // count month budget
let budgetDay = budgetMonth / 30;

// output the data type of money, income, deposit
console.log('money: ', typeof money);
console.log('income: ', typeof income);
console.log('deposit: ', typeof deposit);

// output the string length of addExpenses
console.log('addExpenses length: ', addExpenses.length);

// output the period and mission
console.log('Период равен (месяц) ' + period + '\nЦель заработать ' + mission + ' RUB');

// addExpenses to lower case and make an array
console.log('Массив дополнительных расходов: ', addExpenses.toLowerCase().split(', '));

// output month budget
console.log('Бюджет на месяц: ', budgetMonth);

// mission will be achieved in ... month
console.log('Цель будет достигнута за (месяц): ', Math.ceil(mission / budgetMonth));

// count budgetDay
console.log('Бюджет на день: ', Math.floor(budgetDay));

switch (true) {
  case budgetDay >= 1200:
    console.log('У вас высокий уровень дохода');
    break;
  case (budgetDay >= 600 && budgetDay < 1200):
    console.log('У вас средний уровень дохода');
    break;
  case (budgetDay >= 0 && budgetDay < 600):
    console.log('К сожалению у вас уровень дохода ниже среднего');
    break;
  default:
    console.log('Что-то пошло не так');
}

// if (budgetDay >= 1200) {
//   console.log('У вас высокий уровень дохода');
// } else if (budgetDay >= 600 && budgetDay < 1200) {
//   console.log('У вас средний уровень дохода');
// } else if (budgetDay >= 0 && budgetDay < 600) {
//   console.log('К сожалению у вас уровень дохода ниже среднего');
// } else {
//   console.log('Что-то пошло не так');
// }