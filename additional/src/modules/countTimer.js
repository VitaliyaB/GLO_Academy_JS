const countTimer = (deadline) => {
  const timerHours = document.getElementById('timer-hours');
  const timerMinutes = document.getElementById('timer-minutes');
  const timerSeconds = document.getElementById('timer-seconds');
  let timerId = 0;

  const formatTime = (num) => (num >= 10 ? num : '0' + num);

  const getTimeRemaining = () => {
    const dateStop = new Date(deadline).getTime();
    const dateNow = new Date().getTime();
    const timeRemaining = (dateStop - dateNow) / 1000;

    const seconds = Math.floor(timeRemaining % 60);
    const minutes = Math.floor((timeRemaining / 60) % 60);
    const hours = Math.floor(timeRemaining / 60 / 60);

    return { timeRemaining, hours, minutes, seconds };
  };

  const updateClock = () => {
    const timer = getTimeRemaining();

    if (timer.timeRemaining <= 0) {
      if (timerId) {
        clearInterval(timerId);
      }
    } else {
      timerHours.textContent = formatTime(timer.hours);
      timerMinutes.textContent = formatTime(timer.minutes);
      timerSeconds.textContent = formatTime(timer.seconds);
    }
  };

  updateClock();
  timerId = setInterval(updateClock, 1000);
};

export default countTimer;
