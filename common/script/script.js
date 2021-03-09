'use strict';

window.addEventListener('DOMContentLoaded', () => {

  // * Timer
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
        let targetValue = target.value;

        switch (true) {
          case (target.matches('.calc-item')):
            targetValue = targetValue.replace(/\D/, '');
            break;
          case ((targetName === 'user_name' || targetName === 'user_message')):
            targetValue = targetValue.replace(/[^а-яё\-\s]/i, '');
            break;
          case (targetName === 'user_email'):
            // * check first character, for valid characters and for double special characters
            targetValue = targetValue.replace(/^[^a-z]|[\^\\]|[^a-z@\-_.!~*']|([@\-_.!~*])(?=\1)/gi, '');
            targetValue = targetValue.replace(/@[^a-z]/gi, '@'); // * check first character after @
            // * check for valid characters after @
            targetValue = targetValue.replace(/(@.+?)([^a-z.-])/gi, (match, p1, p2) => {
              p2 = '';
              return p1 + p2;
            });
            // * check first character after @ after dot and only one dot after @
            targetValue = targetValue.replace(/(@[^.]+\.)([a-z]+)([.])/gi, (match, p1, p2) => p1 + p2);
            break;
          case (targetName === 'user_phone'):
            // * check first character and all inputs
            targetValue = targetValue.replace(/[^\d()\-+]|^[^8+]|([()-])(?=\1)/g, '');
            // * check characters after ()-
            targetValue = targetValue.replace(/([()-])([^\d])/g, (match, p1) => p1);
            // * check characters after '(' and ')', ')' can't be without '('
            targetValue = targetValue.replace(/(\(.+?)([^\d)-])|(\).+?)([^\d-])|^(\+7|8)([\d-]*\))/g,
              (match) => match.slice(0, -1));
            // * if first character + add 7
            targetValue = targetValue.replace(/^(\++?)$/g, (match, p1) => {
              if (!event.data) {
                p1 = '';
              } else {
                p1 = '+7';
              }
              return p1;
            });
            // * check characters after +7- or 8-
            targetValue = targetValue.replace(/^(\+7|8)(\(+?|-+?)(\d{3})$/g, (match, p1, p2) => {
              if (!event.data) {
                return match;
              } else if (p2 === '-') {
                return match + '-';
              } else if (p2 === '(') {
                return match + ')';
              }
            });
            // * add - before last two digits
            targetValue = targetValue.replace(/^(\+7|8)(-|\()(\d{3})(-|\))(\d{3})(-+?)(\d{2})$/g, (match) => {
              if (!event.data) {
                return match;
              } else {
                return match + '-';
              }
            });
            // * check 81231234567 or +71231234567
            targetValue = targetValue.replace(/^(\+7|8)(([^\d(-])|((\d+?)([^\d]|[\d]{10,})))/g,
              (match) => match.slice(0, -1));
            // * check 8-123-123-12-12 8(123)123-12-12 8(123)1234567 8-123-1234567 or same with +7
            targetValue = targetValue.
              replace(/^(\+7|8)(-|\()(\d{3})(-|\))(\d{3})((-+?)(\d{2})(-+?)([\d]{3,}|\d{2}[^\d])|(\d+?)([^\d]|\d{4,}))/g,
                (match) => match.slice(0, -1));
            break;
          default:
            target.value = targetValue;
        }

        target.value = targetValue;
      });

      item.addEventListener('blur', (event) => {
        const target = event.target;
        const targetName = target.name;
        let targetValue = target.value;
        const emailReg = /([a-z@\-_.!~*])+(@)([a-z.-])+((\.)([a-z]){2,})$/;
        const phoneReg = /^(\+7|8)(\d{10}|(-+?\d{3}-+?(\d{3}-+?\d{2}-+?\d{2}|\d{7})|(\(+?\d{3}\)+?(\d{3}-+?\d{2}-+?\d{2}|\d{7}))))$/g;

        // * delete spaces and - from begin, end and double in the middle
        targetValue = targetValue.replace(/^[\s-]*|\s(?=\s)|-(?=-)|[\s-]*$/g, '');

        switch (true) {
          case (targetName === 'user_email'):
            targetValue = targetValue.replace(/\s/, ''); // * delete spaces inside
            targetValue = targetValue.replace(/[^a-z]*$/, ''); // * delete symbols at the end
            break;
          case (targetName === 'user_phone'):
            if (!phoneReg.test(targetValue)) {
              targetValue = targetValue.replace(/[()-]/g, '');
              targetValue = targetValue.replace(/^(\+7|8)(\d{11,})/g, (match, p1, p2) => {
                p2 = p2.slice(0, 10);
                return p1 + p2;
              });
              targetValue = targetValue.replace(/(\+?[0-9])(.*)/, (match, p1) => {
                if (p1 !== '+7' && p1 !== '8') {
                  return '';
                }
                return match;
              });
            }
            break;
          case (targetName === 'user_name'):
            targetValue = targetValue.toLowerCase().replace(/(\s|^)\S/g, (match) => match.toUpperCase());
            break;
          default:
            target.value = targetValue;
        }

        target.value = targetValue;
      });
    });
  };

  // * Calculator
  const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block');
    const calcType = document.querySelector('.calc-type');
    const calcSquare = document.querySelector('.calc-square');
    const calcCount = document.querySelector('.calc-count');
    const calcDay = document.querySelector('.calc-day');
    const totalValue = document.getElementById('total');

    const countSum = () => {
      let total = 0;
      let countValue = 1;
      let dayValue = 1;
      const typeValue = calcType.options[calcType.selectedIndex].value;
      const squareValue = +calcSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      }

      totalValue.textContent = total;
    };

    calcBlock.addEventListener('change', (event) => {
      const target = event.target;

      if (target.matches('select, input')) {
        countSum();
      }
    });

  };

  // * send-ajax-form
  const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...';
    const loadMessage = 'Загрузка...';
    const successMessage = 'Спасибо! Мы скоро с вами свяжемся!';
    const form = document.getElementById('form1');
    const statusMessage = document.createElement('div');

    statusMessage.style.cssText = 'font-size: 2rem;';

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      form.appendChild(statusMessage);
      statusMessage.textContent = loadMessage;

      const formData = new FormData(form);
      const body = {};

      for (const val of formData.entries()) {
        body[val[0]] = val[1];
      }

      postData(body, () => {
        statusMessage.textContent = successMessage;
      }, (error) => {
        console.error(error);
        statusMessage.textContent = errorMessage;
      });
    });

    const postData = (body, outputData, errorData) => {
      const request = new XMLHttpRequest();

      request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) {
          return;
        }

        if (request.status === 200) {
          outputData();
        } else {
          errorData(request.status);
        }
      });

      request.open('POST', './server.php');
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(JSON.stringify(body));
    };
  };

  countTimer('10 march 2021');
  toggleMenu();
  togglePopUp();
  tabs();
  slider();
  command();
  validate();
  calc(100);
  sendForm();
});
