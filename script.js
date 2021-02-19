'use strict';

function countDegree(hours, minutes) {
  let minutesDegree, hoursDegree, degreeBetween;
  
  if (minutes > 60 || hours > 24) {
    return 'Ввведите корректные значения времени!';
  }
  
  if (hours >= 12) {
    hours -=12;
  };
  
  minutesDegree = minutes * 6;
  hoursDegree = hours * 30 + minutes / 2;
  degreeBetween = Math.abs(hoursDegree - minutesDegree);

  return degreeBetween;
};

console.log(countDegree(6, 0));
console.log(countDegree(3, 0));
console.log(countDegree(3, 30));
