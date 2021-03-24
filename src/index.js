import '@styles/style.css';
import togglePhones from '@modules/togglePhones';
import toggleMenu from '@modules/toggleMenu';
import scrollPage from '@modules/scrollPage';
import popUpRepairTypes from '@modules/popUpRepairTypes';
import validate from '@modules/validate';
import sendForm from '@modules/sendForm';
import showHint from '@modules/showHint';
import sliders from '@modules/sliders';
import popUpSlider from '@modules/popUpSlider';
import tabs from '@modules/tabs';

window.onload = () => {
  const body = document.querySelector('.preload');
  body.classList.remove('preload');
};

togglePhones();
toggleMenu();
scrollPage();
popUpRepairTypes();
validate();
sendForm();
showHint();
sliders();
popUpSlider();
tabs();
