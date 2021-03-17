'use strict';

// buttons
const start = document.getElementById('start');
const cancel = document.getElementById('cancel');
const btnPlus = document.getElementsByTagName('button');
const incomePlus = btnPlus[0];
const expensesPlus = btnPlus[1];

// left form all inputs type text
const dataForm = document.querySelector('.data');
let dataInputsText = dataForm.querySelectorAll('[type="text"]');

// left form inputs
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const depositCheck = document.querySelector('#deposit-check');
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
const depositBank = document.querySelector('.deposit-bank');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
const depositCheckmark = document.querySelector('.deposit-checkmark');

let timerId;

start.disabled = 'disabled';
start.style.cursor = 'not-allowed';

class AppData {
  constructor() {
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
  }

  enableStartBtn() {
    if (salaryAmount.value && (!depositCheck.checked || depositPercent.value)) {
      start.disabled = null;
      start.style.cursor = 'pointer';
    } else {
      start.disabled = 'disabled';
      start.style.cursor = 'not-allowed';
    }
  }

  checkDepositPercent() {
    if (!this.isNumber(depositPercent.value) || (depositPercent.value < 1 || depositPercent.value > 100)) {
      alert('Введите корректное значение в поле проценты');
      depositPercent.value = '';
    } else {
      this.enableStartBtn();
    }
  }

  start() {
    if (!this.isNumber(salaryAmount.value)) {
      alert('Ошибка, поле "Месячный доход" должно содержать только цифры!');
      return;
    }

    this.budget = parseFloat(salaryAmount.value.trim());

    if (this.getExpInc() && this.getInfoDeposit()) {
      dataInputsText.forEach((item) => {
        item.disabled = 'disabled';
      });

      incomePlus.disabled = 'disabled';
      expensesPlus.disabled = 'disabled';
      depositCheck.disabled = 'disabled';
      incomePlus.style.cursor = 'not-allowed';
      expensesPlus.style.cursor = 'not-allowed';
      depositCheckmark.style.cursor = 'not-allowed';

      start.style.display = 'none';
      cancel.style.display = 'block';

      this.getAddExpInc();
      this.getExpIncMonth();
      this.getBudget();
      this.showResult();
    }
  }

  showResult() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalIncomeValue.value = this.addIncome.join(', ');
    additionalExpensesValue.value = this.addExpenses.join(', ');
    incomePeriodValue.value = this.calcPeriod();
    targetMonthValue.value = this.getTargetMonth();

    periodSelect.addEventListener('input', this.changeIncomePeriod.bind(this));
  }

  addExpIncBlock(event) {
    const target = event.target;

    const addBlock = (items) => {
      const cloneItem = items[0].cloneNode(true);
      const startStr = target.className.split(/[_\s]/)[2];

      cloneItem.querySelector(`.${startStr}-title`).value = '';
      cloneItem.querySelector(`.${startStr}-amount`).value = '';

      items[0].parentNode.insertBefore(cloneItem, target);
      items = document.querySelectorAll(`.${startStr}-items`);
      dataInputsText = dataForm.querySelectorAll('[type="text"]');

      if (items.length === 3) {
        target.style.display = 'none';
      }
    };

    if (target.classList.contains('income_add')) {
      addBlock(incomeItems);
    }

    if (target.classList.contains('expenses_add')) {
      addBlock(expensesItems);
    }
  }

  getExpInc = () => {
    let checkResult = true;
    const count = (item) => {
      const startStr = item.className.split('-')[0];
      const itemTitle = item.querySelector(`.${startStr}-title`).value.trim();
      const itemAmount = item.querySelector(`.${startStr}-amount`).value.trim();
      const sectionName = document.querySelector(`.${startStr}-title.title`).textContent;

      if (this.isNumber(itemTitle) && itemTitle !== '') {
        alert(`Ошибка, в разделе ${sectionName} поле наименование не должно содержать только цифры!`);
        checkResult = false;
        return;
      }

      if (!this.isNumber(itemAmount) && itemAmount !== '') {
        alert(`Ошибка, в разделе ${sectionName} поле сумма должно содержать только цифры!`);
        checkResult = false;
        return;
      }

      if (itemTitle && !itemTitle) {
        alert(`Ошибка, в разделе ${sectionName} поле сумма не должно быть пустым`);
        checkResult = false;
        return;
      }

      if (!itemTitle && itemAmount) {
        alert(`Ошибка, в разделе ${sectionName} поле наименование не должно быть пустым`);
        checkResult = false;
        return;
      }

      this[startStr][itemTitle] = itemAmount;
    }

    expensesItems.forEach(count);
    incomeItems.forEach(count);

    return checkResult;
  }

  getAddExpInc = () => {
    const createAdd = (item) => {
      if (item.className) {
        item = item.value.trim();

        if (item !== '') {
          this.addIncome.push(item);
        }
      } else {
        item = item.trim();

        if (item !== '') {
          this.addExpenses.push(item);
        }
      }
    };

    additionalIncomeItem.forEach(createAdd);
    additionalExpensesItem.value.split(',').forEach(createAdd);
  }

  getExpIncMonth() {
    const count = (allItems, monthCount) => {
      for (let key in allItems) {
        monthCount += +allItems[key];
      }

      return monthCount;
    };

    this.expensesMonth = count(this.expenses, this.expensesMonth);
    this.incomeMonth = count(this.income, this.incomeMonth);
  }

  getBudget() {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);

    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }

  getTargetMonth() {
    if (targetAmount.value === 0 || this.budgetMonth === 0) {
      return 0;
    } else {
      return Math.ceil(targetAmount.value / this.budgetMonth);
    }
  }

  getStatusIncome() {
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
  }

  getInfoDeposit() {
    if (this.deposit) {
      if (!depositBank.value) {
        alert('Ошибка, в разделе "Депозит" должен быть выбран процент');
        return false;
      }

      if (!this.isNumber(depositAmount.value)) {
        alert('Ошибка, в разделе "Депозит" поле сумма должно быть заполнено и содержать только цифры!');
        return false;
      }

      this.percentDeposit = parseFloat(depositPercent.value);
      this.moneyDeposit = parseFloat(depositAmount.value);
      return true;
    }

    return true;
  }

  changePercent() {
    const valueSelect = depositBank.value;
    if (valueSelect === 'other') {
      depositPercent.value = '';
      depositPercent.style.display = 'inline-block';
      this.enableStartBtn();
      depositPercent.addEventListener('input', () => {
        clearTimeout(timerId);
        if (depositBank.value) {
          timerId = setTimeout(() => {
            this.checkDepositPercent();
          }, 1000);
        }
      });
    } else {
      depositPercent.style.display = 'none';
      depositPercent.value = valueSelect;
      this.enableStartBtn();
    }

  }

  depositHandler() {
    if (depositCheck.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;

      depositBank.addEventListener('change', this.changePercent.bind(this));
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositPercent.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      depositPercent.value = '';
      this.deposit = false;

      depositBank.removeEventListener('input', this.changePercent.bind(this));
    }
  }

  getPeriod() {
    periodAmount.innerHTML = periodSelect.value;
  }

  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }

  changeIncomePeriod() {
    incomePeriodValue.value = this.calcPeriod();
  }

  reset() {
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
    start.disabled = 'disabled';
    start.style.cursor = 'not-allowed';

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

    if (depositCheck.checked) {
      depositCheck.checked = false;
      this.depositHandler();
    }

    dataInputsText.forEach((item) => {
      item.disabled = '';
      item.value = '';
    });

    incomePlus.disabled = '';
    expensesPlus.disabled = '';
    depositCheck.disabled = '';

    incomePlus.style.cursor = 'pointer';
    expensesPlus.style.cursor = 'pointer';
    depositCheckmark.style.cursor = 'pointer';

    periodSelect.removeEventListener('input', this.changeIncomePeriod.bind(this));

    this.showResult();
    this.getPeriod();
  }

  eventsListeners() {
    salaryAmount.addEventListener('input', this.enableStartBtn);
    start.addEventListener('click', this.start.bind(this));
    cancel.addEventListener('click', this.reset.bind(this));
    incomePlus.addEventListener('click', this.addExpIncBlock);
    expensesPlus.addEventListener('click', this.addExpIncBlock);
    periodSelect.addEventListener('input', this.getPeriod);
    depositCheck.addEventListener('change', this.depositHandler.bind(this));
  }

  isNumber(data) {
    return !isNaN(parseFloat(data)) && isFinite(data);
  }
}

const appData = new AppData();
appData.eventsListeners();
