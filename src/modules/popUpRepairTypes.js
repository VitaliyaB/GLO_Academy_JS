const popUpRepairTypes = () => {
  const linkListsMenu = document.querySelectorAll('.link-list-menu');
  const popupRepairTypes = document.querySelector('.popup-repair-types');
  const closeSign = document.querySelector('.popup-repair-types .close');

  const handlerRepairTypes = (event) => {
    const event = event.target;
    popupRepairTypes.style.visibility = 'visible';

    // if (target.closest('.popup-repair-types" && )
  };

  linkListsMenu.forEach((item) => {
    item.addEventListener('click', handlerRepairTypes);
  });
};

export default popUpRepairTypes;
