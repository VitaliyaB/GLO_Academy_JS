const validate = () => {
  const feedbackBlockFormInputPhone = document.querySelectorAll('.feedback-block__form-input_phone');
  const feedbackInputPhone = document.querySelectorAll('.feedback__input-input');

  const validatePhone = (event) => {
    const target = event.target;
    let targetValue = target.value;

    targetValue = targetValue.replace(/\D|^[^78]/gi, '');
    targetValue = targetValue.replace(/^[78]/gi, '+7(');
    targetValue = targetValue.replace(/^\+7\(\d{3}/gi, (match) => match + ')');
    targetValue = targetValue.replace(/^\+7\(\d{3}\)\d{3}/gi, (match) => match + '-');
    targetValue = targetValue.replace(/^\+7\(\d{3}\)\d{3}-\d{2}/gi, (match) => match + '-');
    targetValue = targetValue.replace(/^\+7\(\d{3}\)\d{3}-\d{2}-\d{3,}/gi, (match) => match.slice(0, -1));

    target.value = targetValue;

  };

  feedbackBlockFormInputPhone.forEach((item) => {
    item.addEventListener('input', validatePhone);
  });

  feedbackInputPhone.forEach((item) => {
    item.addEventListener('input', validatePhone);
  });

};

export default validate;
