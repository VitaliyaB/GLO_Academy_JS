'use strict';

const userName = document.getElementById('username');
const registerUser = document.getElementById('registerUser');
const login = document.getElementById('login');
const list = document.getElementById('list');

const months = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря'
];

const formatDate = (num) => (num > 10 ? num : '0' + num);

// * Get user data from LS
const getData = () => {
  const arrData = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    arrData.push(JSON.parse(localStorage.getItem(key)));
  }

  return arrData;
};

// * Render html
const render = () => {
  list.textContent = '';
  const allUsersData = getData();

  allUsersData.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add('user-info');

    li.innerHTML = `
        <span>Имя: ${item.firstName}, фамилия: ${item.lastName}, зарегистрирован: ${item.regDate}</span>
        <button class="btn-delete">Удалить</button>`;

    list.append(li);

    const btnDelete = li.querySelector('.btn-delete');

    btnDelete.addEventListener('click', () => {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const data = JSON.parse(localStorage.getItem(key));

        if (item.login === data.login) {
          localStorage.removeItem(key);
          userName.textContent = 'Аноним';
          break;
        }
      }

      render();
    });
  });
};

// * Registration
const signUp = () => {
  let user;
  let userLogin;
  let userPassword;
  const signUpDate = new Date();
  const day = formatDate(signUpDate.getDate());
  const month = months[signUpDate.getMonth()];
  const year = signUpDate.getFullYear();
  const hours = formatDate(signUpDate.getHours());
  const minutes = formatDate(signUpDate.getMinutes());
  const seconds = formatDate(signUpDate.getSeconds());
  const data = getData();

  do {
    user = prompt('Введите через пробел Имя и Фамилию пользователя', 'Иван Иванов').trim();
    user = user.split(' ').filter((item) => item !== '');
  } while (user.length > 2);

  do {
    userLogin = prompt('Введите логин', 'Ivan').trim();

    const existUser = data.find((item) => item.login === userLogin.trim());

    if (existUser) {
      alert('Пользователь с таким логинов уже существует!');
      userLogin = '';
    }
  } while (!userLogin);

  do {
    userPassword = prompt('Введите пароль').trim();
  } while (!userPassword);

  const userData = {
    firstName: user[0],
    lastName: user[1],
    login: userLogin,
    password: userPassword,
    regDate: `${day} ${month} ${year} г., ${hours}:${minutes}:${seconds}`
  };

  localStorage.setItem(userLogin, JSON.stringify(userData));

  render();
};

// * Authorization
const signIn = () => {
  let userLogin;
  let userPassword;
  let user = getData();

  do {
    userLogin = prompt('Введите логин').trim();
  } while (!userLogin);

  do {
    userPassword = prompt('Введите пароль').trim();
  } while (!userPassword);

  user = user.find((item) => userLogin === item.login && userPassword === item.password);

  if (user) {
    userName.textContent = user.firstName;
  } else {
    alert('Пользователь с такими данными не найден!');
  }
};

render();

registerUser.addEventListener('click', signUp);
login.addEventListener('click', signIn);
