'use strict';
let weekDays = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
];
let months = [
  'Января',
  'Февраля',
  'Марта',
  'Апреля',
  'Мая',
  'Июня',
  'Июля',
  'Августа',
  'Сентября',
  'Октября',
  'Ноября',
  'Декабря',
];

let elemFullDate = document.getElementById('date_full');
let elemDate = document.getElementById('date');

let timer = setInterval(updateTime, 1000);

function updateTime() {
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth();
  let date = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let day = now.getDay();

  let currentTimeFull = formatTimeFull(
    day,
    date,
    month,
    year,
    hours,
    minutes,
    seconds
    );
  let currentTime = formatTime(date, month, year, hours, minutes, seconds);

  elemFullDate.textContent = currentTimeFull;
  elemDate.textContent = currentTime;
}

function formatTimeFull(day, date, month, year, hours, minutes, seconds) {
  let hoursWord = changeWord(hours, 'hours');
  let minutesWord = changeWord(minutes, 'minutes');
  let secondsWord = changeWord(seconds, 'seconds');
  day = day ? --day : day = 6;

  return `Сегодня ${weekDays[day]}, ${date} ${months[month]} ${year} года, ${hours} ${hoursWord} ${minutes} ${minutesWord} ${seconds} ${secondsWord}`;
}

function formatTime(date, month, year, hours, minutes, seconds) {
  month = ++month;
  date = format00Time(date);
  month = format00Time(month);
  hours = format00Time(hours);
  minutes = format00Time(minutes);
  seconds = format00Time(seconds);
  
  return `${date}.${month}.${year} - ${hours}:${minutes}:${seconds}`;
}

function changeWord(num, period) {
  let words = {
    hours: ['час', 'часа', 'часов'],
    minutes: ['минута', 'минуты', 'минут'],
    seconds: ['секунда', 'секунды', 'секунд']
  };

  for (let key in words) {
    if (key === period) {
      return num % 10 === 1
             ? words[key][0]
             : num % 10 === 2 || num % 10 === 3 || num % 10 === 4
             ? words[key][1]
             : words[key][2];
    };
  }
}

function format00Time(num) {
  return num >= 10 ? num.toString() : '0' + num;
}