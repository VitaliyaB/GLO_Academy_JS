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
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 50000,
  period: 6,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,

  asking: function () {
    let cashIncome, itemIncome, addExpenses;

    if (confirm('Есть ли у вас дополнительный источник заработка?')) {
      do {
        itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
      } while (isNumber(itemIncome) || itemIncome === null || itemIncome.trim() === '');

      do {
        cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
      } while (!isNumber(cashIncome));

      itemIncome = itemIncome.trim();
      cashIncome = parseFloat(cashIncome);
      appData.income[itemIncome] = cashIncome;
    }

    do {
      addExpenses = prompt(
        'Перечислите возможные расходы за рассчитываемый период через запятую',
        'Одежда, техника, развлечения'
      );
    } while (isNumber(addExpenses) || addExpenses === null || addExpenses.trim() === '');

    addExpenses = addExpenses.trim();
    appData.addExpenses = addExpenses.toLowerCase().split(", ");
    appData.deposit = confirm('Есть ли у вас депозит в банке?');

    for (let i = 0; i < 2; i++) {
      let amountAnswer, expense;

      do {
        expense = prompt(
          'Введите обязательную статью расходов?',
          'Комуналка'
        );
      } while (isNumber(expense) || expense === null || expense.trim() === '');

      do {
        amountAnswer = prompt('Во сколько это обойдется?', 100);
      } while (!isNumber(amountAnswer));

      expense = expense.trim();
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

  getInfoDeposit: function() {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt('Какой годовой процент?', 10);
      } while (!isNumber(appData.percentDeposit));

      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      } while (!isNumber(appData.moneyDeposit));

      appData.percentDeposit = parseFloat(appData.percentDeposit);
      appData.moneyDeposit = parseFloat(appData.moneyDeposit);
    }
  },

  calcSavedMoney: function() {
    return appData.budgetMonth * appData.period;
  }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

// output sum of all expenses
console.log('Расходы за месяц: ', appData.expensesMonth);

// mission will be achieved in ... month
if (appData.getTargetMonth() > 0) {
  console.log('Цель будет достигнута за (месяц): ', appData.getTargetMonth());
} else {
  console.log('Цель не будет достигнута');
}

// output income status
console.log('Уровен дохода: ', appData.getStatusIncome());

for (let key in appData) {
  console.log('Наша программа включает в себя все данные:\n' + key + ' ' + appData[key]);
}

appData.addExpenses = appData.addExpenses.map(item => item[0].toUpperCase() + item.substring(1));
console.log('Дополнителные расходы: ', appData.addExpenses.join(', '));

// check data for a number
function isNumber(data) {
  return !isNaN(parseFloat(data)) && isFinite(parseFloat(data));
}
