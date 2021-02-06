let week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
let today = new Date();
let weekDayToday = today.getDay();
let elemUl = document.getElementById('list');
let weekList = '';

if (weekDayToday) {
  weekDayToday--;
} else {
  weekDayToday = 6;
}

for (let i = 0; i < week.length; i++) {
  if ((i === 5 && weekDayToday === 5 || (i === 6 && weekDayToday === 6))) {
    weekList += `<li><i><b>${week[i]}</b></i></li>`;
  } else if (i === 5 || i === 6) {
    weekList += `<li><i>${week[i]}</i></li>`;
  } else if (weekDayToday === i) {
    weekList += `<li><b>${week[i]}</b></li>`;
  } else {
    weekList += `<li>${week[i]}</li>`;
  }
}

elemUl.insertAdjacentHTML('afterbegin', weekList);

