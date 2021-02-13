'use strict';

let start = document.getElementById('start'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    depositCheck = document.querySelector('#deposit-check'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    accumulatedMonthValue = document.getElementsByClassName('accunulated_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-items .income-title'),
    expensesTitle = document.querySelector('.expenses-items .expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpenses = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    incomeItems = document.querySelectorAll('.income-items');

start.disabled = 'disabled';
start.style.cursor = 'not-allowed';


let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  expensesMonth: 0,
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,

  enableStartBtn: function() {
    if (salaryAmount.value) {
      start.disabled = null;
      start.style.cursor = 'pointer';
    } else {
      start.disabled = 'disabled';
      start.style.cursor = 'not-allowed';
    }
  },

  start: function() {
    if (/[^\d]/.test(salaryAmount.value)) {
      alert('Ошибка, поле "Месячный доход" должно содержать только цифры!');
      return;
    }

    if (/[^\d]/.test(targetAmount.value) && targetAmount.value !== '') {
      alert('Ошибка, поле "Цель" должно содержать только цифры!');
      return;
    }

    appData.budget = 0;
    appData.budgetDay = 0;
    appData.budgetMonth = 0;
    appData.income = {};
    appData.incomeMonth = 0;
    appData.addIncome = [];
    appData.expenses = {};
    appData.expensesMonth = 0;
    appData.addExpenses = [];
    appData.deposit = false;
    appData.percentDeposit = 0;
    appData.moneyDeposit = 0;

    appData.budget = parseFloat(salaryAmount.value.trim());

    appData.getIncome();
    appData.getAddIncome();
    appData.getIncomeMonth();
    appData.getExpenses();
    appData.getAddExpenses();
    appData.getExpensesMonth();
    appData.getBudget();
    appData.showResult();
  },

  showResult: function() {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalIncomeValue.value = appData.addIncome.join(', ');
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    incomePeriodValue.value = appData.calcPeriod();
    targetMonthValue.value = appData.getTargetMonth();

    periodSelect.addEventListener('input', appData.changeIncomePeriod);
  },

  addExpensesBlock: function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';

    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  },

  getExpenses: function() {
    expensesItems.forEach(function(item) {
      let itemExpenses = item.querySelector('.expenses-title').value.trim();
      let cashExpenses = item.querySelector('.expenses-amount').value.trim();

      if (/[^\sа-яё\W_]/i.test(itemExpenses) && itemExpenses !== '') {
        alert('Ошибка, в разделе "Обязательные расходы" поле наименование должно ' +
              'содержать только русские буквы, пробелы и знаки препинания!');
        return;
      }

      if (/[^\d]/.test(cashExpenses) && cashExpenses !== '') {
        alert('Ошибка, в разделе "Обязательные расходы" поле сумма должно содержать только цифры!');
        return;
      }

      if (itemExpenses && !cashExpenses) {
        alert('Ошибка, в разделе "Обязательные расходы" поле сумма не должно быть пустым');
        return;
      }

      if (!itemExpenses && cashExpenses) {
        alert('Ошибка, в разделе "Обязательные расходы" поле наименование не должно быть пустым');
        return;
      }

      appData.expenses[itemExpenses] = cashExpenses;
    });
  },

  addIncomeBlock: function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelector('.income-title').value = '';
    cloneIncomeItem.querySelector('.income-amount').value = '';

    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  },

  getIncome: function() {
    incomeItems.forEach(function(item) {
      let itemIncome = item.querySelector('.income-title').value.trim();
      let cashIncome = item.querySelector('.income-amount').value.trim();

      if (/[^\sа-яё\W_]/i.test(itemIncome) && itemIncome !== '') {
        alert('Ошибка, в разделе "Дополнительный доход" поле наименование должно ' +
              'содержать только русские буквы, пробелы и знаки препинания!');
        return;
      }

      if (/[^\d]/.test(cashIncome) && cashIncome !== '') {
        alert('Ошибка, в разделе "Дополнительный доход" поле сумма должно содержать только цифры!');
        return;
      }

      if (itemIncome && !cashIncome) {
        alert('Ошибка, в разделе "Дополнительный доход" поле сумма не должно быть пустым');
        return;
      }

      if (!itemIncome && cashIncome) {
        alert('Ошибка, в разделе "Дополнительный доход" поле наименование не должно быть пустым');
        return;
      }

      appData.income[itemIncome] = cashIncome;
    });
  },

  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item) {
      item = item.trim();
      if(item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },

  getAddIncome: function() {
    additionalIncomeItem.forEach(function(item) {
      let itemValue = item.value.trim();

      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },

  getExpensesMonth: function() {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },

  getIncomeMonth: function() {
    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },

  getBudget: function() {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },

  getTargetMonth: function() {
    return Math.ceil(targetAmount.value / appData.budgetMonth);
  },

  getStatusIncome: function() {
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

  getPeriod: function() {
    periodAmount.innerHTML = periodSelect.value;
  },

  calcPeriod: function() {
    return appData.budgetMonth * periodSelect.value;
  },

  changeIncomePeriod: function() {
    let calc = appData.calcPeriod();
    incomePeriodValue.value = calc;
  }
};

salaryAmount.addEventListener('input', appData.enableStartBtn);
start.addEventListener('click', appData.start);
incomePlus.addEventListener('click', appData.addIncomeBlock);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
periodSelect.addEventListener('input', appData.getPeriod);

// mission will be achieved in ... month
if (appData.getTargetMonth() > 0) {
  console.log('Цель будет достигнута за (месяц): ', appData.getTargetMonth());
} else {
  console.log('Цель не будет достигнута');
}

appData.addExpenses = appData.addExpenses.map(item => item.trim().substring(0, 1).toUpperCase() + item.trim().substring(1));
console.log('Дополнителные расходы: ', appData.addExpenses.join(', '));

// check data for a number
function isNumber(data) {
  return !isNaN(parseFloat(data)) && isFinite(data);
}
