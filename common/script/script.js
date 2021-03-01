'use strict';

window.addEventListener('DOMContentLoaded', () => {

  // * Timer
  const countTimer = (deadline) => {
    const timerHours = document.getElementById('timer-hours');
    const timerMinutes = document.getElementById('timer-minutes');
    const timerSeconds = document.getElementById('timer-seconds');

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
        clearInterval(timerId);
      } else {
        timerHours.textContent = formatTime(timer.hours);
        timerMinutes.textContent = formatTime(timer.minutes);
        timerSeconds.textContent = formatTime(timer.seconds);
      }
    };

    updateClock();
    const timerId = setInterval(updateClock, 1000);
  };

  // * Menu
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu');
    const menu = document.querySelector('menu');

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    menu.addEventListener('click', (event) => {
      const target = event.target;

      if (target.classList.contains('close-btn') || target.matches('menu a')) {
        handlerMenu();
      }
    });

    btnMenu.addEventListener('click', handlerMenu);
  };

  // * Popup
  const togglePopUp = () => {
    const popUp = document.querySelector('.popup');
    const popUpBtn = document.querySelectorAll('.popup-btn');
    const popUpContent = document.querySelector('.popup-content');
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
      } else {
        target = target.closest('.popup-content');

        if (!target) {
          popUp.style.display = 'none';
        }
      }
    });
  };

  // * Tabs
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header');
    const tab = tabHeader.querySelectorAll('.service-header-tab');
    const tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };

    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
      target = target.closest('.service-header-tab');

      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });

  };

  // * Slider
  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item');
    const slider = document.querySelector('.portfolio-content');
    const portfolioDots = document.querySelector('.portfolio-dots');
    let currentSlide = 0;
    let interval;
    let dot;

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoplay = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 1500) => {
      interval = setInterval(autoplay, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    const addDots = () => {
      for (let i = 0; i < slide.length; i++) {
        if (i === 0) {
          portfolioDots.insertAdjacentHTML('beforeend', `<li class="dot dot-active"></li>`);
        } else {
          portfolioDots.insertAdjacentHTML('beforeend', `<li class="dot"></li>`);
        }
      }

      dot = portfolioDots.querySelectorAll('.dot');
      startSlide();
    };

    slider.addEventListener('click', (event) => {
      event.preventDefault();
      const target = event.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }

      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', (event) => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', (event) => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        startSlide();
      }
    });

    addDots();
  };

  // * Command
  const command = () => {
    const command = document.getElementById('command');
    let originalImg;

    command.addEventListener('mouseover', (event) => {
      if (event.target.matches('.command__photo')) {
        originalImg = event.target.src;
        event.target.src = event.target.dataset.img;
      } else {
        return;
      }
    });

    command.addEventListener('mouseout', (event) => {
      if (event.target.matches('.command__photo')) {
        event.target.src = originalImg;
      } else {
        return;
      }
    });
  };

  // * Validation
  const validate = () => {
    const inputs = document.querySelectorAll('input');

    inputs.forEach((item) => {
      item.addEventListener('input', (event) => {
        const target = event.target;
        const targetName = target.name;
        const targetValue = target.value;

        if (target.matches('.calc-item')) {
          target.value = targetValue.replace(/\D/, '');
        } else if (targetName === 'user_name' || targetName === 'user_message') {
          target.value = targetValue.replace(/[^а-яё\- ]/i, '');
        } else if (targetName === 'user_email') {
          target.value = targetValue.replace(/[^a-z@\-_.!~*']/i, '');
        } else if (targetName === 'user_phone') {
          target.value = targetValue.replace(/[^\d()-]/, '');
        } else {
          return;
        }
      });

      item.addEventListener('blur', (event) => {
        const target = event.target;
        const targetName = target.name;
        let targetValue = target.value;

        targetValue = targetValue.replace(/^(\s|-)*|(\s|-)*$/g, '');
        targetValue = targetValue.replace(/\s+/g, ' ');
        targetValue = targetValue.replace(/-+/g, '-');

        if (targetName === 'user_name') {
          targetValue = targetValue.toLowerCase().replace(/(\s|^)\S/g, (match) => match.toUpperCase());
        }

        target.value = targetValue;
      });
    });
  };

  countTimer('2 march 2021');
  toggleMenu();
  togglePopUp();
  tabs();
  slider();
  command();
  validate();
});
