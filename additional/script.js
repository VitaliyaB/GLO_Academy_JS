let inputElem = document.querySelector('[type="text"]');
let addBtn = document.getElementsByTagName('button');
let list = document.getElementsByTagName('ul');

addBtn[0].addEventListener('click', () => {
  let inputValue = inputElem.value;
  if (inputValue) {
    list[0].insertAdjacentHTML('beforeend', `<li>${inputValue}</li>`);
  }
  
  inputElem.value = '';
});