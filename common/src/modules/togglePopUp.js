const togglePopUp = () => {
  const popUp = document.querySelector('.popup');
  const popUpBtn = document.querySelectorAll('.popup-btn');
  const popUpContent = document.querySelector('.popup-content');
  const popUpForm = document.getElementById('form3');
  const inputs = popUpForm.querySelectorAll('input');
  let intervalId;

  const showPopUp = () => {
    popUp.style.display = 'block';

    if (window.innerWidth >= 768) {
      const endPositionPopUp = popUpContent.offsetTop;
      let startPositionPopUp = -popUpContent.offsetHeight;

      popUpContent.style.top = startPositionPopUp + 'px';

      intervalId = setInterval(() => {
        if (endPositionPopUp !== startPositionPopUp) {
          if (startPositionPopUp < 0) {
            startPositionPopUp -= startPositionPopUp;
            popUpContent.style.top = startPositionPopUp + 'px';
          } else {
            if (endPositionPopUp % 2 === 0) {
              startPositionPopUp += 2;
            } else {
              startPositionPopUp++;
            }
            popUpContent.style.top = startPositionPopUp + 'px';
          }
        } else {
          clearInterval(intervalId);
        }
      }, 5);
    }
  };

  popUpBtn.forEach((elem) => {
    elem.addEventListener('click', showPopUp);
  });

  popUp.addEventListener('click', (event) => {
    let target = event.target;

    if (target.classList.contains('popup-close')) {
      popUp.style.display = 'none';

      inputs.forEach((item) => {
        item.value = '';
      });
    } else {
      target = target.closest('.popup-content');

      if (!target) {
        popUp.style.display = 'none';

        inputs.forEach((item) => {
          item.value = '';
        });
      }
    }
  });
};

export default togglePopUp;
