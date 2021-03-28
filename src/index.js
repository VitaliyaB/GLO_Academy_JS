import '@styles/style.css';
import togglePhones from '@modules/togglePhones';
import toggleMenu from '@modules/toggleMenu';
import scrollPage from '@modules/scrollPage';
import togglePopUps from '@modules/togglePopUps';
import validate from '@modules/validate';
import sendForm from '@modules/sendForm';
import showHint from '@modules/showHint';
import popUpSlider from '@modules/popUpSlider';
import tabs from '@modules/tabs';
import startSlider from '@modules/startSlider';

window.onload = () => {
  const body = document.querySelector('.preload');
  body.classList.remove('preload');
};

togglePhones();
toggleMenu();
scrollPage();
togglePopUps();
validate();
sendForm();
showHint();
popUpSlider();
tabs();
startSlider();
