/* Напишите функцию на JS. Цель: Убрать все объекты с типом additional, а для basic очки уменьшить в двое.

Cоздать новый массив, оставляя исходные данные неизменными */

const myLesson = [
  {lesson: 1, type: 'basic', points: 2},
  {lesson: 2, type: 'additional', points: 4},
  {lesson: 3, type: 'basic', points: 6},
  {lesson: 4, type: 'additional', points: 3},
  {lesson: 5, type: 'basic', points: 4},
  {lesson: 6, type: 'basic', points: 2},
  {lesson: 7, type: 'additional', points: 2},
  {lesson: 8, type: 'basic', points: 6},
  {lesson: 9, type: 'basic', points: 4},
  {lesson: 10, type: 'basic', points: 6},
  {lesson: 11, type: 'additional', points: 5},
  {lesson: 12, type: 'basic', points: 2},
  {lesson: 13, type: 'additional', points: 2},
  {lesson: 14, type: 'basic', points: 4},
  {lesson: 15, type: 'additional', points: 1},
  {lesson: 16, type: 'additional', points: 7},
];

let newMyLesson = myLesson.map((item) => {
  return { ...item };
});

function changeArray() {
  for (let i = 0; i < newMyLesson.length; i++) {
    if (newMyLesson[i].type === 'basic') {
      newMyLesson[i].points /= 2;
    }
    if (newMyLesson[i].type === 'additional') {
      newMyLesson.splice(i, 1);
      i--;
    }
  }
}

changeArray();

console.log('myLesson', myLesson);
console.log('newMyLesson', newMyLesson);
