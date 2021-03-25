const popUpPrivacy = () => {
  const linkPrivacy = document.querySelectorAll('.link-privacy');
  const popupPrivacy = document.querySelector('.popup-privacy');

  const handlerPrivacy = () => {
    popupPrivacy.style.visibility = 'visible';
  };

  linkPrivacy.forEach((item) => {
    item.addEventListener('click', handlerPrivacy);
  });
};

export default popUpPrivacy;
