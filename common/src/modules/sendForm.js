const sendForm = () => {
  const errorMessage = 'Что-то пошло не так...';
  const loadMessage = 'Загрузка...';
  const successMessage = 'Спасибо! Мы скоро с вами свяжемся!';
  const mainForm = document.getElementById('form1');
  const footerForm = document.getElementById('form2');
  const popUpForm = document.getElementById('form3');
  const statusMessage = document.createElement('div');

  statusMessage.style.cssText = 'font-size: 2rem; color: white; margin-top: 1em;';

  const postData = (body) => fetch('./server.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body
  });

  const submitForm = (event) => {
    event.preventDefault();
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
      })
      .catch((err) => {
        console.error(err);
        statusMessage.textContent = errorMessage;
      });
  };

  mainForm.addEventListener('submit', submitForm);
  footerForm.addEventListener('submit', submitForm);
  popUpForm.addEventListener('submit', submitForm);
};

export default sendForm;
