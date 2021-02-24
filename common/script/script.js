'use strict';

window.addEventListener('DOMContentLoaded', () => {

  // * Timer
  function countTimer(deadline) {
    const timerHours = document.getElementById('timer-hours');
    const timerMinutes = document.getElementById('timer-minutes');
    const timerSeconds = document.getElementById('timer-seconds');

    function getTimeRemaining() {
      const dateStop = new Date(deadline).getTime();
      const dateNow = new Date().getTime();
      const timeRemaining = (dateStop - dateNow) / 1000;

      const seconds = Math.floor(timeRemaining % 60);
      const minutes = Math.floor((timeRemaining / 60) % 60);
      const hours = Math.floor(timeRemaining / 60 / 60);

      return { timeRemaining, hours, minutes, seconds };
    }

    function updateClock() {
      const timer = getTimeRemaining();

      if (timer.timeRemaining < 0) {
        clearInterval(timerId);
      } else {
        timerHours.textContent = formatTime(timer.hours);
        timerMinutes.textContent = formatTime(timer.minutes);
        timerSeconds.textContent = formatTime(timer.seconds);
      }
    }

    function formatTime(num) {
      return num >= 10 ? num : '0' + num;
    }

    const timerId = setInterval(updateClock, 1000);
  }

  countTimer('1 march 2021');

  // * Menu
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu');
    const menu = document.querySelector('menu');
    const closeBtn = document.querySelector('.close-btn');
    const menuItems = menu.querySelectorAll('ul > li');

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    btnMenu.addEventListener('click', handlerMenu);
    closeBtn.addEventListener('click', handlerMenu);

    menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
  };

  toggleMenu();

  // * Popup
  const togglePopUp = () => {
    const popup = document.querySelector('.popup');
    const popUpBtn = document.querySelectorAll('.popup-btn');
    const popUpClose = document.querySelector('.popup-close');
    const popUpContent = document.querySelector('.popup-content');
    let intervalId;

    const showPopUp = () => {
      popup.style.display = 'block';

      if (window.innerWidth >= 768) {
        const endPositionPopUp = popUpContent.offsetTop;
        let startPositionPopUp = -popUpContent.offsetHeight;

        popUpContent.style.top = startPositionPopUp + 'px';

        intervalId = setInterval(() => {
          if (endPositionPopUp !== startPositionPopUp) {
            if (startPositionPopUp < 0) {
              startPositionPopUp -= startPositionPopUp;
              console.log('intervalId=setInterval ~ startPositionPopUp', startPositionPopUp);
              popUpContent.style.top = startPositionPopUp + 'px';
            } else {
              if (endPositionPopUp % 2 === 0) {
                startPositionPopUp += 2;
              } else {
                startPositionPopUp++;
              }
              popUpContent.style.top = startPositionPopUp + 'px';
            }
              console.log('intervalId=setInterval ~ startPositionPopUp', startPositionPopUp);
          } else {
            console.log('end');
            clearInterval(intervalId);
          }
        }, 10);
      }
    };

    popUpBtn.forEach((elem) => {
      elem.addEventListener('click', showPopUp);
    });

    popUpClose.addEventListener('click', () => {
      popup.style.display = 'none';
    });
  };

  togglePopUp();
});
