'use strict';

function DomElement(selector, height, width, bg, fontSize, step) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
  this.step = step;
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
                           font-size: ${this.fontSize};
                           position: absolute;
                           top: 0px;
                           left: 0px;`;

  newElem.textContent = 'Created new block with text';
  document.body.append(newElem);

  document.addEventListener('keydown', (event) => {
    const step = parseFloat(this.step);
    const elemHeight = parseFloat(this.height);
    const elemWidth = parseFloat(this.width);
    const windowHeight = parseFloat(document.documentElement.clientHeight);
    const windowWidth = parseFloat(document.documentElement.clientWidth);
    const top = parseFloat(newElem.style.top);
    const left = parseFloat(newElem.style.left);
    const bottom = top + elemHeight;
    const right = left + elemWidth;

    switch (event.code) {
      case 'ArrowUp':
        if (top - step > 0) {
          newElem.style.top = top - step + 'px';
        } else {
          newElem.style.top = 0 + 'px';
        }

        break;
      case 'ArrowDown':
        if (windowHeight - bottom < step && windowHeight - bottom > 0) {
          newElem.style.top = top + (windowHeight - bottom)  + 'px';
        }

        if (bottom + step <= windowHeight) {
          newElem.style.top = top + step + 'px';
        }

        break;
      case 'ArrowRight':
        if (windowWidth - right < step && windowWidth - right > 0) {
          newElem.style.left = left + (windowWidth - right)  + 'px';
        }

        if (right + step <= windowWidth) {
          newElem.style.left = left + step + 'px';
        }

        break;
      case 'ArrowLeft':
        if (left - step > 0) {
          newElem.style.left = left - step + 'px';
        } else {
          newElem.style.left = 0 + 'px';
        }

        break;
      default:
        newElem.style.top = top + 'px';
        newElem.style.left = left + 'px';
    }
  });
};

const elem1 = new DomElement('.block', '100px', '100px', '#9932CC', '20px', '10px');

window.addEventListener('DOMContentLoaded', () => {
  elem1.createElement();
});
