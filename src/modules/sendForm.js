// import togglePopUps from '@modules/togglePopUps';

const sendForm = () => {
  const errorMessage = 'Что-то пошло не так...';
  const feedbackForm = document.querySelectorAll('.feedback__form');
  const feedbackBlockForm = document.querySelectorAll('.feedback-block__form');
  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = 'font-size: 2rem; color: white; margin-top: 1em;';

  const postData = (formData) => fetch('../../server.php', {
    method: 'POST',
    body: formData
  });

  const submitForm = (event) => {
    event.preventDefault();
    const target = event.target;
    const inputs = target.querySelectorAll('input');
    let validPhone = false;
    let validName = false;
    let validPrivacy = false;
    const errMessageElem = document.querySelectorAll('.err-message');

    errMessageElem.forEach((item) => {
      item.remove();
    });

    const errorNotify = (text, item, attr) => {
      const errorFormMessage = document.createElement('div');
      errorFormMessage.classList.add('err-message');
      errorFormMessage.textContent = text;

      if (attr === 'phone') {
        errorFormMessage.style.cssText = 'margin-bottom: 10px;';
        if (item.closest('.feedback__form')) {
          item.style.border = '2px solid #f15858; z-index: 1; border-bottom: 5px solid #f15858;';
          errorFormMessage.style.color = '#f15858';
          item.closest('.feedback__form').append(errorFormMessage);
        }
        if (item.closest('.feedback-block__form')) {
          item.style.border = '2px solid #bb2626; z-index: 1; border-bottom: 5px solid #bb2626;';
          errorFormMessage.style.color = '#bb2626';
          item.closest('.feedback-block__form').append(errorFormMessage);
        }
        item.before(errorFormMessage);
      }

      if (attr === 'checkbox') {
        if (item.closest('.feedback__form')) {
          errorFormMessage.style.color = '#f15858';
          errorFormMessage.style.marginTop = '-25px';
          item.closest('.feedback__form').append(errorFormMessage);
        }
        if (item.closest('.feedback-block__form')) {
          errorFormMessage.style.color = '#bb2626';
          item.closest('.feedback-block__form').append(errorFormMessage);
        }
      }

      if (attr === 'name') {
        errorFormMessage.style.cssText = 'color: #bb2626; margin-bottom: 10px;';
        item.before(errorFormMessage);
      }
    };

    if (target.classList.contains('feedback__form')) {
      validName = true;
    }

    inputs.forEach((item) => {
      const attrName = item.name;
      const attrType = item.type;

      if (attrName === 'phone') {
        const phoneReg = /^\++?7\(+?\d{3}\)+?\d{3}-+?\d{2}-+?\d{2}$/gi;
        if (phoneReg.test(item.value)) {
          validPhone = true;
        } else {
          errorNotify('Введите телефон в формате +7(123)123-45-67', item, attrName);
        }
      }

      if (attrType === 'checkbox') {
        if (item.checked) {
          validPrivacy = true;
        } else {
          errorNotify('Ознакомьтесь, пожалуйста.', item, attrType);
        }
      }

      if (attrName === 'name') {
        item.value = item.value.trim();
        const nameReg = /^[а-я]+$/gi;
        if (nameReg.test(item.value)) {
          validName = true;
        } else {
          errorNotify('Поле должно содержать только русские буквы', item, attrName);
        }
      }

      if (validPhone && validPrivacy && validName) {
        event.target.appendChild(statusMessage);
        const formData = new FormData(event.target);

        postData(formData)
          .then((response) => {
            if (response.status !== 200) {
              throw new Error('status network not 200');
            }

            const inputs = document.querySelectorAll('input');
            const popupThank = document.querySelector('.popup-thank');
            popupThank.style.visibility = 'visible';

            inputs.forEach((item) => {
              item.value = '';
            });
          })
          .catch((err) => {
            console.error(err);
            statusMessage.textContent = errorMessage;
          });
      }
    });
  };



  feedbackForm.forEach((item) => {
    item.addEventListener('submit', submitForm);
  });

  feedbackBlockForm.forEach((item) => {
    item.addEventListener('submit', submitForm);
  });
};

export default sendForm;
