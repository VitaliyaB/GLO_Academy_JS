const sendForm = () => {
  const errorMessage = 'Что-то пошло не так...';
  const loadMessage = document.createElement('div');
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
    let validEmail = false;
    let validPhone = false;

    inputs.forEach((item) => {
      if (item.classList.contains('form-phone')) {
        const phoneReg = /^(\+7|8)(\d{10}|(-+?\d{3}-+?(\d{3}-+?\d{2}-+?\d{2}|\d{7})|(\(+?\d{3}\)+?(\d{3}-+?\d{2}-+?\d{2}|\d{7}))))$/g;
        if (phoneReg.test(item.value)) {
          validPhone = true;
        } else {
          const errorFormMessage = document.createElement('div');
          errorFormMessage.textContent = 'Введите корректный номер телефона';
          errorFormMessage.style.cssText = 'font-size: 1.3rem;  color: red;';
          item.style.border = '2px solid red';

          if (target.classList.contains('main-form')) {
            errorFormMessage.style.transform = 'translateY(-3rem)';
          }

          item.after(errorFormMessage);
        }
      }

      if (item.classList.contains('form-email')) {
        const emailReg = /([a-z@\-_.!~*])+(@)([a-z.-])+((\.)([a-z]){2,})$/;
        if (emailReg.test(item.value)) {
          validEmail = true;
        } else {
          const errorFormMessage = document.createElement('div');
          errorFormMessage.textContent = 'Введите корректный email';
          errorFormMessage.style.cssText = 'font-size: 1.3rem;  color: red;';
          item.style.border = '2px solid red';

          if (target.classList.contains('main-form')) {
            errorFormMessage.style.transform = 'translateY(-3rem)';
          }

          item.after(errorFormMessage);
        }
      }
    });

    if (validPhone && validEmail) {
      event.target.appendChild(statusMessage);
      loadMessage.classList.add('sk-three-bounce');
      for (let i = 1; i <= 3; i++) {
        loadMessage.insertAdjacentHTML('beforeend', `
          <div class='sk-bounce-${i} sk-child'></div>
        `);
      }
      statusMessage.append(loadMessage);

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
