'use strict';

class First {
  constructor() {}

  hello() {
    console.log('Привет я метод родителя!');
  }
}

class Second extends First {
  constructor() {
    super();
  }

  hello() {
    super.hello();
    console.log('А я наследуемый метод!');
  }
}

const hello1 = new Second();
hello1.hello();

