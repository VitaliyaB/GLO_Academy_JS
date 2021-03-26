import '@styles/style.css';
import togglePhones from '@modules/togglePhones';
import toggleMenu from '@modules/toggleMenu';
import scrollPage from '@modules/scrollPage';
import popUps from '@modules/popUps';
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
popUps();
validate();
sendForm();
showHint();
sliders();
popUpSlider();
tabs();
