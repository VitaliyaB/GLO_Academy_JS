'use strict';

function DomElement(selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
}

DomElement.prototype.createElement = function() {
  let newElem;

  if (this.selector[0] === '.') {
    newElem = document.createElement('div');
    newElem.classList.add(this.selector.substring(1));
  } else if (this.selector[0] === '#') {
    newElem = document.createElement('p');
    newElem.setAttribute('id', this.selector.substring(1));
  } else {
    alert('Передана не корректная строка');
  }

  newElem.style.cssText = `height: ${this.height};
                           width: ${this.width};
                           background: ${this.bg};
                           font-size: ${this.fontSize}`;

  newElem.textContent = 'Created new block with text';
  document.body.append(newElem);
};

let elem1 = new DomElement('.block', '50px', '100%', '#9932CC', '20px');
let elem2 = new DomElement('#best', '200px', '50%', '#7B68EE', '25px');

elem1.createElement();
elem2.createElement();