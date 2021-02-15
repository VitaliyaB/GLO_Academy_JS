'use strict';

// buttons
let start = document.getElementById('start');
let cancel = document.getElementById('cancel');
let btnPlus = document.getElementsByTagName('button');
let incomePlus = btnPlus[0];
let expensesPlus = btnPlus[1];

// left form all inputs type text
let dataForm = document.querySelector('.data');
let dataInputsText = dataForm.querySelectorAll('[type="text"]');

// left form inputs
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
let depositCheck = document.querySelector('#deposit-check');
let budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
let budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
let expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
let accumulatedMonthValue = document.getElementsByClassName('accunulated_month-value')[0];
let additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
let incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
let targetMonthValue = document.getElementsByClassName('target_month-value')[0];
let salaryAmount = document.querySelector('.salary-amount');
let incomeTitle = document.querySelector('.income-items .income-title');
let expensesTitle = document.querySelector('.expenses-items .expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
let additionalExpenses = document.querySelector('.additional_expenses-item');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');
let periodAmount = document.querySelector('.period-amount');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let incomeItems = document.querySelectorAll('.income-items');

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
    if (!isNumber(salaryAmount.value)) {
      alert('Ошибка, поле "Месячный доход" должно содержать только цифры!');
      return;
    }

    dataInputsText.forEach(function(item) {
      item.disabled = 'disabled';
    });

    start.style.display = 'none';
    cancel.style.display = 'block';

    this.budget = parseFloat(salaryAmount.value.trim());

    this.getIncome();
    this.getAddIncome();
    this.getIncomeMonth();
    this.getExpenses();
    this.getAddExpenses();
    this.getExpensesMonth();
    this.getBudget();
    this.showResult();
  },

  showResult: function() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalIncomeValue.value = this.addIncome.join(', ');
    additionalExpensesValue.value = this.addExpenses.join(', ');
    incomePeriodValue.value = this.calcPeriod();
    targetMonthValue.value = this.getTargetMonth();

    periodSelect.addEventListener('input', this.changeIncomePeriod);
  },

  addExpensesBlock: function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';

    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    dataInputsText = dataForm.querySelectorAll('[type="text"]');


    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  },

  getExpenses: function() {
    expensesItems.forEach(function(item) {
      let itemExpenses = item.querySelector('.expenses-title').value.trim();
      let cashExpenses = item.querySelector('.expenses-amount').value.trim();

      if (isNumber(itemExpenses) && itemExpenses !== '') {
        alert('Ошибка, в разделе "Обязательные расходы" поле наименование не должно содержать только цифры!');
        return;
      }

      if (!isNumber(cashExpenses) && cashExpenses !== '') {
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
    dataInputsText = dataForm.querySelectorAll('[type="text"]');

    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  },

  getIncome: function() {
    incomeItems.forEach(function(item) {
      let itemIncome = item.querySelector('.income-title').value.trim();
      let cashIncome = item.querySelector('.income-amount').value.trim();

      if (isNumber(itemIncome) && itemIncome !== '') {
        alert('Ошибка, в разделе "Дополнительный доход" поле наименование не должно содержать только цифры!');
        return;
      }

      if (!isNumber(cashIncome) && cashIncome !== '') {
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
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  },

  getIncomeMonth: function() {
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  },

  getBudget: function() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },

  getTargetMonth: function() {
    if (targetAmount.value === 0 || this.budgetMonth === 0) {
      return 0;
    } else {
      return Math.ceil(targetAmount.value / this.budgetMonth);
    }
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
    return this.budgetMonth * periodSelect.value;
  },

  changeIncomePeriod: function() {
    let calc = appData.calcPeriod();
    incomePeriodValue.value = calc;
  },

  reset: function() {
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
    periodSelect.value = 1;
    start.style.display = 'block';
    cancel.style.display = 'none';

    if (incomeItems.length > 1) {
      for (let i = incomeItems.length - 1; incomeItems.length > 1; i--) {
        incomeItems[i].remove();
        incomeItems = document.querySelectorAll('.income-items');
      }

      if (incomePlus.style.display === 'none') {
        incomePlus.style.display = 'block';
      }
    }

    if (expensesItems.length > 1) {
      for (let i = expensesItems.length - 1; expensesItems.length > 1; i--) {
        expensesItems[i].remove();
        expensesItems = document.querySelectorAll('.expenses-items');
      }

      if (expensesPlus.style.display === 'none') {
        expensesPlus.style.display = 'block';
      }
    }

    dataInputsText.forEach(function(item) {
      item.disabled = '';
      item.value = '';
    });

    appData.showResult();
  }
};

salaryAmount.addEventListener('input', appData.enableStartBtn);
start.addEventListener('click', hardBind);
cancel.addEventListener('click', appData.reset);
incomePlus.addEventListener('click', appData.addIncomeBlock);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
periodSelect.addEventListener('input', appData.getPeriod);

// check data for a number
function isNumber(data) {
  return !isNaN(parseFloat(data)) && isFinite(data);
}

// this bind appData while start
function hardBind() {
  appData.start.call(appData);
}
