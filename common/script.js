'use strict';

let books = document.querySelectorAll('.book');
console.log('books: ', books);

// restore the order of the books
books[0].before(books[1]);
books[2].before(books[4]);
books[5].after(books[2]);

// change bg-image
document.body.style.backgroundImage = 'url(image/you-dont-know-js.jpg';

// change header book 3
let header3 = books[4].querySelector('a');
header3.textContent = 'Книга 3. this и Прототипы Объектов';

// delete adv
let adv = document.querySelector('.adv');
adv.remove();

// restore the order of the chapter
let chapters2 = books[0].querySelectorAll('li');
let chapters5 = books[5].querySelectorAll('li');
chapters2[2].before(chapters2[3]);
chapters2[2].before(chapters2[6]);
chapters2[2].before(chapters2[8]);
chapters2[2].before(chapters2[4]);
chapters2[2].before(chapters2[5]);
chapters2[10].before(chapters2[2]);

chapters5[1].after(chapters5[9]);
chapters5[9].after(chapters5[3]);
chapters5[3].after(chapters5[4]);
chapters5[7].after(chapters5[5]);

// add chapter 8 to the book 6
let chapters6 = books[2].querySelectorAll('li');
chapters6[8].insertAdjacentHTML('afterend', '<li>Глава 8: За пределами ES6</li>');
