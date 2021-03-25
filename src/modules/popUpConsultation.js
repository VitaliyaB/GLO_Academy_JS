const popUpConsultation = () => {
  const consultationBtn = document.querySelectorAll('.button_wide');
  const popupConsultation = document.querySelector('.popup-consultation');
  const closeConsultation = document.querySelector('.close-consultation');

  const handlerConsultation = (event) => {
    const target = event.target;

    if (target.classList.contains('button_wide')) {
      popupConsultation.style.visibility = 'visible';
    }

    if (target.classList.contains('close-consultation')) {
      popupConsultation.style.visibility = 'hidden';
    }
  };

  consultationBtn.forEach((item) => {
    item.addEventListener('click', handlerConsultation);
  });
  closeConsultation.addEventListener('click', handlerConsultation);
};

export default popUpConsultation;
