'use strict';

const calculator = {
  a: document.getElementById('a'),
  b: document.getElementById('b'),

  sum() {
    if (this.a.value && this.b.value) {
      return +this.a.value + +this.b.value;
    }
  },

  mult() {
    if (this.a.value && this.b.value) {
      return +this.a.value * +this.b.value;
    }
  },

  show(e) {
    if (e.target.id === 'sum') {
      return this.sum();
    }

    if (e.target.id === 'mult') {
      return this.mult();
    }
  }
};

const btn = document.querySelectorAll('button');
const res = document.getElementById('res');

btn.forEach((item) => {
  item.addEventListener('click', (e) => {
    res.value = calculator.show(e);
  });
});
