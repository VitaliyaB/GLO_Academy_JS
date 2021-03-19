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
    li.style.opacity = todo.opacity;
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
      if (todo.opacity === '0') {
        this.fadeIn(li);
        for (const [key, value] of this.todoData) {
          if (key === todo.key) {
            value.opacity = '1';
          }
        }
      }
    } else {
      this.todoList.append(li);
      if (todo.opacity === '0') {
        this.fadeIn(li);
        for (const [key, value] of this.todoData) {
          if (key === todo.key) {
            value.opacity = '1';
          }
        }
      }
    }

    this.input.value = '';
  }

  addTodo(e) {
    e.preventDefault();

    if (this.input.value.trim()) {
      const newTodo = {
        value: this.input.value,
        completed: false,
        key: this.generateKey(),
        opacity: '1'
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

  deleteItem(itemKey, item) {
    let timerId;
    let itemOpacity = 1;

    const fadeOutItem = () => {
      if (itemOpacity > 0.1) {
        item.style.opacity = `${itemOpacity}`;
        itemOpacity = +(itemOpacity - 0.1).toFixed(1);
      } else {
        clearTimeout(timerId);
        this.todoData.delete(itemKey);
        this.render();
      }
    };

    timerId = setInterval(fadeOutItem, 50);
  }

  completedItem(itemKey, item) {
    let timerId;
    let itemOpacity = 1;

    timerId = setInterval(() => {
      if (itemOpacity > 0.1) {
        item.style.opacity = `${itemOpacity}`;
        itemOpacity = +(itemOpacity - 0.1).toFixed(1);
      } else {
        clearTimeout(timerId);
        item.style.opacity = '0';

        for (const [key, value] of this.todoData) {
          if (key === itemKey) {
            value.completed = !value.completed;
            value.opacity = '0';
          }
        }
        this.render();
      }
    }, 50);
  }

  fadeIn(item) {
    let timerId;
    let itemOpacity = 0;

    timerId = setInterval(() => {
      if (itemOpacity < 1) {
        item.style.opacity = `${itemOpacity}`;
        itemOpacity = +(itemOpacity + 0.1).toFixed(1);
      } else {
        clearTimeout(timerId);
        item.style.opacity = '1';
      }
    }, 50);
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
      this.deleteItem(parentTarget.key, parentTarget);
    } else if (target.matches('.todo-complete')) {
      this.completedItem(parentTarget.key, parentTarget);
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
