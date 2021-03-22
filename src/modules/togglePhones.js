const togglePhones = () => {
  const headerContactsArrow = document.querySelector('.header-contacts__arrow');
  const headerContactsPhoneNumberAccord = document.querySelector('.header-contacts__phone-number-accord');
  const headerContactsPhoneNumber =
    document.querySelector('.header-contacts__phone-number-accord .header-contacts__phone-number');

  const showPhone = () => {
    if (headerContactsPhoneNumber.style.opacity === '0') {
      headerContactsPhoneNumberAccord.style.top = '23px';
      headerContactsPhoneNumber.style.opacity = '1';
    } else {
      headerContactsPhoneNumberAccord.style.top = '0';
      headerContactsPhoneNumber.style.opacity = '0';
    }
  };

  headerContactsArrow.addEventListener('click', showPhone);
};

export default togglePhones;
