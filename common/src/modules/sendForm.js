const sendForm = () => {
  const errorMessage = 'Что-то пошло не так...';
  const loadMessage = 'Загрузка...';
  const successMessage = 'Спасибо! Мы скоро с вами свяжемся!';
  const mainForm = document.getElementById('form1');
  const footerForm = document.getElementById('form2');
  const popUpForm = document.getElementById('form3');
  const statusMessage = document.createElement('div');

  statusMessage.style.cssText = 'font-size: 2rem; color: white; margin-top: 1em;';

  const postData = (formData) => fetch('./server.php', {
    method: 'POST',
    body: formData
  });

  const submitForm = (event) => {
    event.preventDefault();

    const target = event.target;
    const inputs = target.querySelectorAll('input');
    let validName = false;
    let validEmail = false;
    let validPhone = false;
    let validMessage = false;
    const errMessageElem = document.querySelectorAll('.err-message');

    errMessageElem.forEach((item) => {
      item.remove();
    });

    const errorNotify = (text, item, attr) => {
      const errorFormMessage = document.createElement('div');
      errorFormMessage.classList.add('err-message');
      errorFormMessage.textContent = text;

      if (attr === 'user_message') {
        errorFormMessage.style.cssText = 'font-size: 1.3rem;  color: red; margin-top: -2rem';
      } else {
        errorFormMessage.style.cssText = 'font-size: 1.3rem;  color: red;';
      }

      item.style.border = '2px solid red';

      if (target.classList.contains('main-form')) {
        errorFormMessage.style.transform = 'translateY(-3rem)';
      }

      item.after(errorFormMessage);
    };

    inputs.forEach((item) => {
      item.style.border = 'none';

      const attrName = item.getAttribute('name');
      if (attrName === 'user_name') {
        const nameReg = /[а-яё\s]{2,}/gi;
        if (nameReg.test(item.value)) {
          validName = true;
        } else {
          errorNotify('Поле должно содержать не менее 2 символов', item, attrName);
        }
      }

      if (attrName === 'user_phone') {
        const phoneReg = /^(\+7|8)(\d{10}|(-+?\d{3}-+?(\d{3}-+?\d{2}-+?\d{2}|\d{7})|(\(+?\d{3}\)+?(\d{3}-+?\d{2}-+?\d{2}|\d{7}))))$/g;
        if (phoneReg.test(item.value)) {
          validPhone = true;
        } else {
          errorNotify('Введите телефон в формате +7(123)123-45-67 или 8(123)123-45-67', item, attrName);
        }
      }

      if (attrName === 'user_email') {
        const emailReg = /([a-z@\-_.!~*])+(@)([a-z.-])+((\.)([a-z]){2,})$/gi;
        if (emailReg.test(item.value)) {
          validEmail = true;
        } else {
          errorNotify('Введите email в формате test@test.by', item, attrName);
        }
      }

      if (attrName === 'user_message') {
        if (item.value) {
          validMessage = true;
        } else {
          errorNotify('Поле должно быть заполнено', item, attrName);
        }
      }
    });

    if ((target.classList.contains('footer-form') && validPhone && validEmail && validMessage && validName) ||
      (!target.classList.contains('footer-form') && validPhone && validEmail && validName)) {
      event.target.appendChild(statusMessage);
      statusMessage.textContent = loadMessage;

      const formData = new FormData(event.target);

      postData(formData)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('status network not 200');
          }

          const inputs = document.querySelectorAll('input');

          statusMessage.textContent = successMessage;
          inputs.forEach((item) => {
            item.value = '';
          });

          setTimeout(() => {
            statusMessage.remove();

            if (target.id === 'form3') {
              target.closest('.popup').style.display = 'none';
            }
          }, 3000);
        })
        .catch((err) => {
          console.error(err);
          statusMessage.textContent = errorMessage;
        });
    }
  };

  mainForm.addEventListener('submit', submitForm);
  footerForm.addEventListener('submit', submitForm);
  popUpForm.addEventListener('submit', submitForm);
};

export default sendForm;
