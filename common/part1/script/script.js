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

  countTimer('24 february 2021');

});
