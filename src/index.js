import '@styles/style.css';
import togglePhones from '@modules/togglePhones';
import toggleMenu from '@modules/toggleMenu';
import scrollPage from '@modules/scrollPage';
import togglePopUps from '@modules/togglePopUps';
import validate from '@modules/validate';
import sendForm from '@modules/sendForm';
import showHint from '@modules/showHint';
import toggleTabs from '@modules/toggleTabs';
import startSlider from '@modules/startSlider';
import accordion from '@modules/accordion';
import getData from '@modules/getData';

window.onload = () => {
  const body = document.querySelector('.preload');
  body.classList.remove('preload');
};

togglePhones();
toggleMenu();
scrollPage();
togglePopUps();
startSlider();
showHint();
validate();
sendForm();
accordion();
toggleTabs();
getData();
