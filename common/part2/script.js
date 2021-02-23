'use strict';

const weekDays = [
  'Воскресенье',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота'
];

const newYearDate = '01 january 2022';
const greetingElem = document.getElementById('greeting');
const weekDayElem = document.getElementById('weekDay');
const timeElem = document.getElementById('time');
const untilNYElem = document.getElementById('untilNY');

function countTodayInfo(newYearDate) {

  function getTime() {
    const today = new Date();
    const newYear = new Date(newYearDate);
    const remainTime = Math.floor((newYear - today) / 1000 / 60 / 60 / 24);

    const hours = formatTime(today.getHours());
    const minutes = formatTime(today.getMinutes());
    const seconds = formatTime(today.getSeconds());
    const weekDay = today.getDay();

    const greeting = getGreeting(hours);
    const timeDay = getTimeDay(hours);
    const newYearStr = getNewYearStr(remainTime);

    if (remainTime === 0) {
      clearInterval(timerId);
    } else {
      greetingElem.textContent = greeting;
      weekDayElem.textContent = `Сегодня: ${weekDays[weekDay]}`;
      timeElem.textContent = `Текущее время: ${hours}:${minutes}:${seconds} ${timeDay}`;
      untilNYElem.textContent = `До нового года ${newYearStr}`;
    }
  }

  function getGreeting(hours) {
    if (hours > 5 && hours < 12) {
      return 'Доброе утро';
    } else if (hours >= 12 && hours < 16) {
      return 'Добрый день';
    } else if (hours >= 16 && hours < 24) {
      return 'Добрый вечер';
    } else {
      return 'Доброй ночи';
    }
  }

  function getTimeDay(hours) {
    if (hours >= 12 && hours < 24) {
      return 'PM';
    } else {
      return 'AM';
    }
  }

  function getNewYearStr(remainTime) {
    if (remainTime === 1) {
      return 'остался ' + remainTime + ' день';
    } else if (remainTime >= 2 && remainTime <= 4) {
      return 'осталось ' + remainTime + ' дня';
    } else {
      return 'осталось ' + remainTime + ' дней';
    }
  }

  function formatTime(num) {
    return num >= 10 ? num : '0' + num;
  }

  let timerId = setInterval(getTime, 1000);

}

countTodayInfo(newYearDate);
