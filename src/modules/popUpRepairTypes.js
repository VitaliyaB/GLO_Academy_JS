const popUpRepairTypes = () => {
  const linkListsMenu = document.querySelectorAll('.link-list-menu .menu-link');
  const popupRepairTypes = document.querySelector('.popup-repair-types');
  const closeSign = document.querySelector('.popup-repair-types .close');

  const handlerRepairTypes = (event) => {
    const target = event.target;
    popupRepairTypes.style.visibility = 'visible';

    if (target === closeSign) {
      popupRepairTypes.style.visibility = 'hidden';
    }
  };

  linkListsMenu.forEach((item) => {
    item.addEventListener('click', handlerRepairTypes);
  });
  closeSign.addEventListener('click', handlerRepairTypes);
};

export default popUpRepairTypes;
