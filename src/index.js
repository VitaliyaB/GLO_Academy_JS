import '@styles/style.css';
import toggleMenu from '@modules/toggleMenu';
import togglePhones from '@modules/togglePhones';
import scrollPage from '@modules/scrollPage';
import togglePopUps from '@modules/togglePopUps';
import validate from '@modules/validate';
import sendForm from '@modules/sendForm';
import showHint from '@modules/showHint';
import sliders from '@modules/sliders';
import popUpSlider from '@modules/popUpSlider';
import tabs from '@modules/tabs';

document.addEventListener('DOMContenteLoaded', () => {
  const body = document.querySelector('.preload');
  body.classList.remove('preload');
});

toggleMenu();
togglePhones();
scrollPage();
togglePopUps();
validate();
sendForm();
showHint();
sliders();
popUpSlider();
tabs();
