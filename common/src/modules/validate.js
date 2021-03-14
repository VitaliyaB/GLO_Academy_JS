const validate = () => {
  const inputs = document.querySelectorAll('input');

  inputs.forEach((item) => {
    if (item.classList.contains('form-email')) {
      item.required = true;
    }

    item.addEventListener('input', (event) => {
      const target = event.target;
      const targetName = target.name;
      let targetValue = target.value;

      switch (true) {
        case (target.matches('.calc-item')):
          targetValue = targetValue.replace(/\D/gi, '');
          break;
        case (targetName === 'user_name'):
          targetValue = targetValue.replace(/[^а-яё\s]/gi, '');
          break;
        case (targetName === 'user_message'):
          targetValue = targetValue.replace(/[^а-яё\s\W0-9]|(\W)(?=\1)/gi, '');
          break;
        case (targetName === 'user_email'):
          // * check first character, for valid characters and for double special characters
          targetValue = targetValue.replace(/^[^a-z]|[\^\\]|[^a-z@\-_.!~*']|([@\-_.!~*])(?=\1)/gi, '');
          targetValue = targetValue.replace(/@[^a-z]/gi, '@'); // * check first character after @
          // * check for valid characters after @
          targetValue = targetValue.replace(/(@.+?)([^a-z.-])/gi, (match, p1, p2) => {
            p2 = '';
            return p1 + p2;
          });
          // * check first character after @ after dot and only one dot after @
          targetValue = targetValue.replace(/(@[^.]+\.)([a-z]+)([.])/gi, (match, p1, p2) => p1 + p2);
          break;
        case (targetName === 'user_phone'):
          // * check first character and all inputs
          targetValue = targetValue.replace(/[^\d()\-+]|^[^8+]|([()-])(?=\1)/g, '');
          // * check characters after ()-
          targetValue = targetValue.replace(/([()-])([^\d])/g, (match, p1) => p1);
          // * check characters after '(' and ')', ')' can't be without '('
          targetValue = targetValue.replace(/(\(.+?)([^\d)-])|(\).+?)([^\d-])|^(\+7|8)([\d-]*\))/g,
            (match) => match.slice(0, -1));
          // * if first character + add 7
          targetValue = targetValue.replace(/^(\++?)$/g, (match, p1) => {
            if (!event.data) {
              p1 = '';
            } else {
              p1 = '+7';
            }
            return p1;
          });
          // * check characters after +7- or 8-
          targetValue = targetValue.replace(/^(\+7|8)(\(+?|-+?)(\d{3})$/g, (match, p1, p2) => {
            if (!event.data) {
              return match;
            } else if (p2 === '-') {
              return match + '-';
            } else if (p2 === '(') {
              return match + ')';
            }
          });
          // * add - before last two digits
          targetValue = targetValue.replace(/^(\+7|8)(-|\()(\d{3})(-|\))(\d{3})(-+?)(\d{2})$/g, (match) => {
            if (!event.data) {
              return match;
            } else {
              return match + '-';
            }
          });
          // * check 81231234567 or +71231234567
          targetValue = targetValue.replace(/^(\+7|8)(([^\d(-])|((\d+?)([^\d]|[\d]{10,})))/g,
            (match) => match.slice(0, -1));
          // * check 8-123-123-12-12 8(123)123-12-12 8(123)1234567 8-123-1234567 or same with +7
          targetValue = targetValue.
            replace(/^(\+7|8)(-|\()(\d{3})(-|\))(\d{3})((-+?)(\d{2})(-+?)([\d]{3,}|\d{2}[^\d])|(\d+?)([^\d]|\d{4,}))/g,
              (match) => match.slice(0, -1));
          break;
        default:
          target.value = targetValue;
      }

      target.value = targetValue;
    });

    item.addEventListener('blur', (event) => {
      const target = event.target;
      const targetName = target.name;
      let targetValue = target.value;
      const emailReg = /([a-z@\-_.!~*])+(@)([a-z.-])+((\.)([a-z]){2,})$/;
      const phoneReg = /^(\+7|8)(\d{10}|(-+?\d{3}-+?(\d{3}-+?\d{2}-+?\d{2}|\d{7})|(\(+?\d{3}\)+?(\d{3}-+?\d{2}-+?\d{2}|\d{7}))))$/g;

      // * delete spaces and - from begin, end and double in the middle
      targetValue = targetValue.replace(/^[\s-]*|\s(?=\s)|-(?=-)|[\s-]*$/g, '');

      switch (true) {
        case (targetName === 'user_email'):
          targetValue = targetValue.replace(/\s/, ''); // * delete spaces inside
          targetValue = targetValue.replace(/[^a-z]*$/, ''); // * delete symbols at the end
          break;
        case (targetName === 'user_phone'):
          if (!phoneReg.test(targetValue)) {
            targetValue = targetValue.replace(/[()-]/g, '');
            targetValue = targetValue.replace(/^(\+7|8)(\d{11,})/g, (match, p1, p2) => {
              p2 = p2.slice(0, 10);
              return p1 + p2;
            });
            targetValue = targetValue.replace(/(\+?[0-9])(.*)/, (match, p1) => {
              if (p1 !== '+7' && p1 !== '8') {
                return '';
              }
              return match;
            });
          }
          break;
        case (targetName === 'user_name'):
          targetValue = targetValue.toLowerCase().replace(/(\s|^)\S/g, (match) => match.toUpperCase());
          break;
        default:
          target.value = targetValue;
      }

      target.value = targetValue;
    });
  });
};

export default validate;
