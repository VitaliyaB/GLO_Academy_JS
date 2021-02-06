'use strict';

let money,
  // monthly income
  start = function () {
    do {
      money = prompt('Ваш месячный доход?', 10000);
    } while (!isNumber(money));

    money = parseFloat(money);
  };

start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 50000,
  period: 6,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,

  asking: function () {
    let addExpenses = prompt(
      'Перечислите возможные расходы за рассчитываемый период через запятую',
      'Одежда, техника, развлечения'
    );

    appData.addExpenses = addExpenses.toLowerCase().split(", ");
    appData.deposit = confirm('Есть ли у вас депозит в банке?');

    for (let i = 0; i < 2; i++) {
      let amountAnswer;
      let expense = prompt(
        'Введите обязательную статью расходов?',
        'Комуналка'
      );

      do {
        amountAnswer = prompt('Во сколько это обойдется?', 100);
      } while (!isNumber(amountAnswer));

      amountAnswer = parseFloat(amountAnswer);

      appData.expenses[expense] = amountAnswer;
    }
  },

  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
  },

  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },

  getTargetMonth: function () {
    return Math.ceil(appData.mission / appData.budgetMonth);
  },

  getStatusIncome: function () {
    switch (true) {
      case appData.budgetDay >= 1200:
        return 'У вас высокий уровень дохода';
      case appData.budgetDay >= 600 && appData.budgetDay < 1200:
        return 'У вас средний уровень дохода';
      case appData.budgetDay >= 0 && appData.budgetDay < 600:
        return 'К сожалению у вас уровень дохода ниже среднего';
      default:
        return 'Что-то пошло не так';
    }
  },
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

// output sum of all expenses
console.log('Расходы за месяц: ', appData.expensesMonth);

// mission will be achieved in ... month
console.log('Цель будет достигнута за (месяц): ', appData.getTargetMonth());

// output income status
console.log('Уровен дохода: ', appData.getStatusIncome());

for (let key in appData) {
  console.log('Наша программа включает в себя все данные:\n' + key + ' ' + appData[key]);
}

// check data for a number
function isNumber(data) {
  return !isNaN(parseFloat(data)) && isFinite(parseFloat(data));
}
