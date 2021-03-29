import createSlider from '@modules/createSlider';

const togglePopUps = () => {
  const linkListsMenu = document.querySelectorAll('.link-list');
  const closeSign = document.querySelectorAll('.popup .close');
  const linkPrivacy = document.querySelectorAll('.link-privacy');
  const consultationBtn = document.querySelectorAll('.button_wide');
  const transparencyItemImg = document.querySelectorAll('.transparency-item__img');

  const popupRepairTypes = document.querySelector('.popup-repair-types');
  const popupPrivacy = document.querySelector('.popup-privacy');
  const popupConsultation = document.querySelector('.popup-consultation');
  const popupTransparency = document.querySelector('.popup-transparency');

  let clonePopUpTransparencyWrap;

  const handlerPopUp = (event, idx) => {
    const target = event.target;

    // * popup repair types
    if (target.closest('.link-list')) {
      popupRepairTypes.style.visibility = 'visible';
    }

    // * popup privacy
    if (target.classList.contains('link-privacy')) {
      popupPrivacy.style.visibility = 'visible';
    }

    // * popup consultation
    if (target.classList.contains('button_wide')) {
      const errMessage = popupConsultation.querySelectorAll('.err-message');

      errMessage.forEach((item) => {
        item.remove();
      });
      popupConsultation.style.visibility = 'visible';
    }

    // * popup documents
    if (target.closest('.transparency-item__img')) {
      popupTransparency.style.visibility = 'visible';
      // * popup document slider
      clonePopUpTransparencyWrap = document.querySelector('.popup-transparency-item__wrapper').cloneNode(true);
      const popupTransparencySliderWrapper = document.querySelector('.popup-transparency-slider-wrap');
      createSlider(popupTransparencySliderWrapper, 'popup-transparency-item__wrapper',
        'popup-transparency-slider__slide', '.popup-transparency', idx);
    }

    // * popup close
    if (target.classList.contains('close')) {
      const popUpBlock = target.closest('.popup');
      popUpBlock.style.visibility = 'hidden';

      if (target.closest('.popup-transparency')) {
        document.querySelector('.popup-transparency-item__wrapper').replaceWith(clonePopUpTransparencyWrap);
      }
    }
  };

  // * popup repair types
  linkListsMenu.forEach((item) => {
    item.addEventListener('click', handlerPopUp);
  });

  // * popup close
  closeSign.forEach((item) => {
    item.addEventListener('click', handlerPopUp);
  });

  // * popup privacy
  linkPrivacy.forEach((item) => {
    item.addEventListener('click', handlerPopUp);
  });

  // * popup consultation
  consultationBtn.forEach((item) => {
    item.addEventListener('click', handlerPopUp);
  });

  // * popup documents
  transparencyItemImg.forEach((item, idx) => {
    item.addEventListener('click', (event) => {
      handlerPopUp(event, idx);
    });
  });
};

export default togglePopUps;
