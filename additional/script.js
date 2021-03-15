'use strict';

// * заменить слово "функция" и его однокоренные слова в div с id=task1 на «<strong>функция</strong>»
const task1 = document.getElementById('task1');

const newTask1Str = task1.innerHTML.replace(/(функци)(я|и|й|ю|й|ям|ями|ях)/gi,
  (match, p1, p2) => `<strong>${p1}${p2}</strong>`);
task1.innerHTML = newTask1Str;

/* Написать скрипт который в div с id=task2 найдет время. Время имеет формат часы:минуты.
И часы, и минуты состоят из двух цифр, пример: 09: 00.заключить найденное время в тег <b></b> */

const task2 = document.getElementById('task2');

const newTask2Str = task2.innerHTML.replace(/\d\d:\d\d/g, (match) => `<b>${match}</b>`);
task2.innerHTML = newTask2Str;

// * Создать запрос во всем документе найти текст в кавычках и заключить его в теги <mark></mark>
const body = document.querySelector('body');
console.log('body', body.innerHTML);

let newBodyStr = body.innerHTML.replace(/["«][а-яё\s\n\r\t,:0-9—<>b/]+[^"]["»]/gi, (match) => `<mark>${match}</mark>`);

// * Замените в документе домены вида http:/(/site.ru на <a href="http://site.ru">site.ru</a>
// * Ссылки такого вида http://site.ru/aaaa/bbbb.html заменить на <a href="http://site.ru/aaaa/bbbb.html">site.ru</a>
newBodyStr = newBodyStr.replace(/(http:\/\/)((www\.)?[a-z]+\.[a-z]{2,})([a-z/-]*)/gi,
  (match, p1, p2) => `<a href="${match}">${p2}</a>`);

// * Напишите регулярное выражение для поиска цвета, заданного как #ABCDEF, вывести цвет в консоль
const color = newBodyStr.match(/#+?[a-f0-9]{6}/gi);
color.forEach((item, idx) => {
  console.log(`color ${idx + 1}: ${item}`);
});

body.innerHTML = newBodyStr;
