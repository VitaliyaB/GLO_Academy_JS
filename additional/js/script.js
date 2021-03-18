'use strict';

class Todo {
  constructor(form, input, todoList, todoCompleted, todoContainer) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.todoList = document.querySelector(todoList);
    this.todoCompleted = document.querySelector(todoCompleted);
    this.todoContainer = document.querySelector(todoContainer);
    this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
  }

  addToStorage() {
    localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
  }

  render() {
    this.todoList.textContent = '';
    this.todoCompleted.textContent = '';
    this.todoData.forEach(this.createItem, this);
    this.addToStorage();
  }

  createItem(todo) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.key = todo.key;
    li.insertAdjacentHTML('beforeend', `
      <div class="text-todo">${todo.value}</div>
      <div class="todo-buttons">
        <button class="todo-edit"></button>
        <button class="todo-remove"></button>
        <button class="todo-complete"></button>
      </div>
    `);

    if (todo.completed) {
      this.todoCompleted.append(li);
    } else {
      this.todoList.append(li);
    }

    this.input.value = '';
  }

  addTodo(e) {
    e.preventDefault();

    if (this.input.value.trim()) {
      const newTodo = {
        value: this.input.value,
        completed: false,
        key: this.generateKey()
      };

      this.todoData.set(newTodo.key, newTodo);
      this.render();
    } else {
      alert('Поле с планами должно быть заполнено!');
    }
  }

  generateKey() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  deleteItem(item) {

    this.todoData.delete(item);
    this.render();
  }

  completedItem(item) {
    for (const [key, value] of this.todoData) {
      if (key === item) {
        value.completed = !value.completed;
      }
    }

    this.render();
  }

  editItem(itemKey, item) {
    const editableText = item.querySelector('.text-todo');
    const prevValText = editableText.textContent;

    editableText.style.width = '75%';
    editableText.contentEditable = true;
    editableText.focus();

    editableText.addEventListener('blur', (event) => {
      const target = event.target;
      const curValText = target.textContent;

      if (curValText !== prevValText) {
        for (const [key, value] of this.todoData) {
          if (itemKey === key) {
            value.value = curValText;
          }
        }

        this.render();
      }
    });
  }

  handler(event) {
    const target = event.target;
    const parentTarget = target.closest('.todo-item');

    if (target.matches('.todo-remove')) {
      this.deleteItem(parentTarget.key);
    } else if (target.matches('.todo-complete')) {
      this.completedItem(parentTarget.key);
    } else if (target.matches('.todo-edit')) {
      this.editItem(parentTarget.key, parentTarget);
    } else {
      return;
    }
  }

  init() {
    this.form.addEventListener('submit', this.addTodo.bind(this));
    this.todoContainer.addEventListener('click', this.handler.bind(this));
    this.render();
  }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed', '.todo-container');

todo.init();
