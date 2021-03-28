import '@styles/style.css';
import togglePhones from '@modules/togglePhones';
import toggleMenu from '@modules/toggleMenu';
import scrollPage from '@modules/scrollPage';
import togglePopUps from '@modules/togglePopUps';
import validate from '@modules/validate';
import sendForm from '@modules/sendForm';
import showHint from '@modules/showHint';
import tabs from '@modules/tabs';
import startSlider from '@modules/startSlider';
import accordion from '@modules/accordion';

window.onload = () => {
  const body = document.querySelector('.preload');
  body.classList.remove('preload');
};

togglePhones();
toggleMenu();
scrollPage();
startSlider();
togglePopUps();
showHint();
validate();
sendForm();
accordion();
tabs();
