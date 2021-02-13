'use strict';

let todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

let todoData = localStorage.myTodo? JSON.parse(localStorage.myTodo) : [];

let render = function() {
  todoList.textContent = '';
  todoCompleted.textContent = '';

  todoData.forEach(function(item, idx) {
    let li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
        '<div class="todo-buttons">' +
          '<button class="todo-remove"></button>' +
          '<button class="todo-complete"></button>' +
        '</div>';

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    let btnTodoComplete = li.querySelector('.todo-complete');
    let btnTodoRemove = li.querySelector('.todo-remove');

    btnTodoComplete.addEventListener('click', function() {
      item.completed = !item.completed;
      render();
    });

    btnTodoRemove.addEventListener('click', function() {
      todoData.splice(idx, 1);
      render();
    });

    localStorage.myTodo = JSON.stringify(todoData);
  });

};

todoControl.addEventListener('submit', function(event) {
  event.preventDefault();

  if (headerInput.value) {
    let newTodo = {
      value: headerInput.value,
      completed: false
    };

    todoData.push(newTodo);
    headerInput.value = '';
    render();
  } else {
    return;
  }
});

render();