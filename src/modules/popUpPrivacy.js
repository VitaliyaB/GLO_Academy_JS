const popUpPrivacy = () => {
  const linkPrivacy = document.querySelectorAll('.link-privacy');
  const popupPrivacy = document.querySelector('.popup-privacy');
  const closeSign = document.querySelector('.popup-dialog-privacy .close');
  const consultBtn = document.querySelector('.button_wide');

  const handlerPrivacy = (event) => {
    const target = event.target;

    if (target.classList.contains('link-privacy') || target.classList.contains('button_wide')) {
      consultBtn.style.backgroundColor = 'transparent';
      popupPrivacy.style.visibility = 'visible';
    }

    if (target.classList.contains('close')) {
      popupPrivacy.style.visibility = 'hidden';
    }
  };

  linkPrivacy.forEach((item) => {
    item.addEventListener('click', handlerPrivacy);
  });

  closeSign.addEventListener('click', handlerPrivacy);
  consultBtn.addEventListener('click', handlerPrivacy);
};

export default popUpPrivacy;
