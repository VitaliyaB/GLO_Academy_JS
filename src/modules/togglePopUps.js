const togglePopUps = () => {
  const linkListsMenu = document.querySelectorAll('.link-list-menu .menu-link');
  const closeSign = document.querySelectorAll('.popup .close');
  const linkPrivacy = document.querySelectorAll('.link-privacy');
  const consultationBtn = document.querySelectorAll('.button_wide');

  const popupRepairTypes = document.querySelector('.popup-repair-types');
  const popupPrivacy = document.querySelector('.popup-privacy');
  const popupConsultation = document.querySelector('.popup-consultation');



  const handlerPopUp = (event) => {
    const target = event.target;
    console.log('handlerPopUp ~ target', target);
    console.log('handlerPopUp ~ event', event);

    // * popup repair types
    if (target.matches('.link-list-menu .menu-link')) {
      popupRepairTypes.style.visibility = 'visible';
    }

    // * popup privacy
    if (target.classList.contains('link-privacy')) {
      popupPrivacy.style.visibility = 'visible';
    }

    // * popup consultation
    if (target.classList.contains('button_wide')) {
      popupConsultation.style.visibility = 'visible';
    }

    // * popup close
    if (target.classList.contains('close')) {
      const popUpBlock = target.closest('.popup');
      popUpBlock.style.visibility = 'hidden';
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
};

export default togglePopUps;
