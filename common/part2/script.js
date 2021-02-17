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

let AppData = function() {
  this.budgetDay = 0;
  this.budget = 0;
  this.budgetMonth = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.expensesMonth = 0;
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
};

AppData.prototype.enableStartBtn =  function() {
  if (salaryAmount.value) {
    start.disabled = null;
    start.style.cursor = 'pointer';
  } else {
    start.disabled = 'disabled';
    start.style.cursor = 'not-allowed';
  }
};

AppData.prototype.start = function() {
  if (!this.isNumber(salaryAmount.value)) {
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
};

AppData.prototype.showResult = function() {
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalIncomeValue.value = this.addIncome.join(', ');
  additionalExpensesValue.value = this.addExpenses.join(', ');
  incomePeriodValue.value = this.calcPeriod();
  targetMonthValue.value = this.getTargetMonth();

  periodSelect.addEventListener('input', this.changeIncomePeriod.bind(this));
};

AppData.prototype.addExpensesBlock = function() {
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  cloneExpensesItem.querySelector('.expenses-title').value = '';
  cloneExpensesItem.querySelector('.expenses-amount').value = '';

  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
  expensesItems = document.querySelectorAll('.expenses-items');
  dataInputsText = dataForm.querySelectorAll('[type="text"]');


  if (expensesItems.length === 3) {
    expensesPlus.style.display = 'none';
  }
};

AppData.prototype.getExpenses = function() {
  expensesItems.forEach(function(item) {
    let itemExpenses = item.querySelector('.expenses-title').value.trim();
    let cashExpenses = item.querySelector('.expenses-amount').value.trim();

    if (this.isNumber(itemExpenses) && itemExpenses !== '') {
      alert('Ошибка, в разделе "Обязательные расходы" поле наименование не должно содержать только цифры!');
      return;
    }

    if (!this.isNumber(cashExpenses) && cashExpenses !== '') {
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

    this.expenses[itemExpenses] = cashExpenses;
  }, this);
};

AppData.prototype.addIncomeBlock = function() {
  let cloneIncomeItem = incomeItems[0].cloneNode(true);
  cloneIncomeItem.querySelector('.income-title').value = '';
  cloneIncomeItem.querySelector('.income-amount').value = '';

  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
  incomeItems = document.querySelectorAll('.income-items');
  dataInputsText = dataForm.querySelectorAll('[type="text"]');

  if (incomeItems.length === 3) {
    incomePlus.style.display = 'none';
  }
};

AppData.prototype.getIncome = function() {
  incomeItems.forEach(function(item) {
    let itemIncome = item.querySelector('.income-title').value.trim();
    let cashIncome = item.querySelector('.income-amount').value.trim();

    if (this.isNumber(itemIncome) && itemIncome !== '') {
      alert('Ошибка, в разделе "Дополнительный доход" поле наименование не должно содержать только цифры!');
      return;
    }

    if (!this.isNumber(cashIncome) && cashIncome !== '') {
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

    this.income[itemIncome] = cashIncome;
  }, this);
};

AppData.prototype.getAddExpenses = function () {
  let addExpenses = additionalExpensesItem.value.split(',');
  addExpenses.forEach(function(item) {
    item = item.trim();
    if(item !== '') {
      this.addExpenses.push(item);
    }
  }, this);
};

AppData.prototype.getAddIncome = function() {
  additionalIncomeItem.forEach(function(item) {
    let itemValue = item.value.trim();

    if (itemValue !== '') {
      this.addIncome.push(itemValue);
    }
  }, this);
};

AppData.prototype.getExpensesMonth = function() {
  for (let key in this.expenses) {
    this.expensesMonth += +this.expenses[key];
  }
};

AppData.prototype.getIncomeMonth = function() {
  for (let key in this.income) {
    this.incomeMonth += +this.income[key];
  }
};

AppData.prototype.getBudget = function() {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function() {
  if (targetAmount.value === 0 || this.budgetMonth === 0) {
    return 0;
  } else {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  }
};

AppData.prototype.getStatusIncome = function() {
  switch (true) {
    case this.budgetDay >= 1200:
      return 'У вас высокий уровень дохода';
    case this.budgetDay >= 600 && this.budgetDay < 1200:
      return 'У вас средний уровень дохода';
    case this.budgetDay >= 0 && this.budgetDay < 600:
      return 'К сожалению у вас уровень дохода ниже среднего';
    default:
      return 'Что-то пошло не так';
  }
};

AppData.prototype.getInfoDeposit = function() {
  if (this.deposit) {
    do {
      this.percentDeposit = prompt('Какой годовой процент?', 10);
    } while (!this.isNumber(this.percentDeposit));

    do {
      this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
    } while (!this.isNumber(this.moneyDeposit));

    this.percentDeposit = parseFloat(this.percentDeposit);
    this.moneyDeposit = parseFloat(this.moneyDeposit);
  }
};

AppData.prototype.getPeriod = function() {
  periodAmount.innerHTML = periodSelect.value;
};

AppData.prototype.calcPeriod = function() {
  return this.budgetMonth * periodSelect.value;
};

AppData.prototype.changeIncomePeriod = function() {
  let calc = this.calcPeriod();
  incomePeriodValue.value = calc;
};

AppData.prototype.reset = function() {
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.expensesMonth = 0;
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;

  periodSelect.value = 1;
  start.style.display = 'block';
  cancel.style.display = 'none';

  incomeItems = document.querySelectorAll('.income-items');
  expensesItems = document.querySelectorAll('.expenses-items');

  let incomeItemsLength = incomeItems.length;
  let expensesItemsLength = expensesItems.length;

  if (incomeItemsLength > 1) {
    for (let i = incomeItemsLength - 1; incomeItemsLength > 1; i--) {
      incomeItems[i].remove();
      incomeItemsLength--;
    }

    incomePlus.style.display = 'block';
  }

  if (expensesItemsLength > 1) {
    for (let i = expensesItemsLength - 1; expensesItemsLength > 1; i--) {
      expensesItems[i].remove();
      expensesItemsLength--;
    }

    expensesPlus.style.display = 'block';
  }

  dataInputsText.forEach(function(item) {
    item.disabled = '';
    item.value = '';
  });

  this.showResult();
  this.getPeriod();
};

AppData.prototype.eventsListeners = function() {
  console.log('event ', this);
  salaryAmount.addEventListener('input', this.enableStartBtn);
  start.addEventListener('click', this.start.bind(this));
  cancel.addEventListener('click', this.reset.bind(this));
  incomePlus.addEventListener('click', this.addIncomeBlock);
  expensesPlus.addEventListener('click', this.addExpensesBlock);
  periodSelect.addEventListener('input', this.getPeriod);
};

AppData.prototype.isNumber = function(data) {
  return !isNaN(parseFloat(data)) && isFinite(data);
};

let appData = new AppData();
appData.eventsListeners();
