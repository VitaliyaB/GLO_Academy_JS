'use strict';

// * Part one
let lang;
let arr = [
  ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'],
  ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
];

do {
  lang = prompt('Введите язык для отображения', 'ru либо en').toLowerCase();
} while (lang !== 'ru' && lang !== 'en' && lang);

// variant a.
if (lang === 'ru') {
  console.log('Понедельник, вторник, среда, четверг, пятница, суббота, воскресенье');
} else {
  console.log('Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');
}

// variant b.
switch (lang) {
  case 'ru':
    console.log('Понедельник, вторник, среда, четверг, пятница, суббота, воскресенье');
    break;
  case 'en':
    console.log('Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');
    break;
  default:
    console.log('Не выбран подходящий язык.');
}

// variant c.
lang === 'ru' ? console.log(arr[0]) : console.log(arr[1]);


// * Part two
let namePerson = prompt('Введите имя').toLowerCase();
namePerson === 'артем' ? console.log('Директор') : namePerson === 'максим' ? console.log('Преподаватель') : console.log('Студент');


