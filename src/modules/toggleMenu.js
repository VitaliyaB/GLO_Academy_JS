const toggleMenu = () => {
  const body = document.querySelector('body');
  const popupMenu = document.querySelector('.popup-menu');
  const popupDialogMenu = document.querySelector('.popup-dialog-menu');

  const handlerMenu = (event) => {
    const target = event.target;

    if (target.classList.contains('menu__icon')) {
      body.style.overflowY = 'hidden';
      popupMenu.style.visibility = 'visible';
      popupDialogMenu.style.transform = 'translate3d(0, 0, 0)';
      if (document.documentElement.clientWidth >= 575) {
        popupDialogMenu.classList.remove('hideMenu');
        popupDialogMenu.classList.add('showMenu');
      } else {
        popupDialogMenu.classList.add('showMenu-mobile');
      }
    }

    if (target.classList.contains('close-menu') || target.matches('.popup-menu a') ||
    (!target.closest('.popup-dialog-menu') && popupDialogMenu.classList.contains('showMenu') &&
    !target.classList.contains('menu__icon'))) {
      body.style.overflowY = 'unset';
      popupMenu.style.visibility = 'hidden';
      if (document.documentElement.clientWidth >= 575) {
        popupDialogMenu.style.transform = 'translate3d(645px, 0, 0)';
        popupDialogMenu.classList.remove('showMenu');
        popupDialogMenu.classList.add('hideMenu');
      } else {
        popupDialogMenu.style.transform = 'translate3d(0, -100vh, 0)';
        popupDialogMenu.classList.remove('showMenu-mobile');
      }
    }
  };

  body.addEventListener('click', handlerMenu);
};

export default toggleMenu;
