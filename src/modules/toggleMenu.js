const toggleMenu = () => {
  const body = document.querySelector('body');
  const popupMenu = document.querySelector('.popup-menu');
  const popupDialogMenu = document.querySelector('.popup-dialog-menu');

  const handlerMenu = (event) => {
    const target = event.target;

    if (target.classList.contains('menu__icon')) {
      body.style.overflow = 'hidden';
      popupMenu.style.visibility = 'visible';
      popupDialogMenu.style.transform = 'translate3d(0, 0, 0)';
      popupDialogMenu.classList.remove('hideMenu');
      popupDialogMenu.classList.add('showMenu');
    }

    if (target.classList.contains('close-menu') || target.matches('.popup-menu a') ||
    (!target.closest('.popup-dialog-menu') && popupDialogMenu.classList.contains('showMenu') &&
    !target.classList.contains('menu__icon'))) {
      popupMenu.style.visibility = 'hidden';
      popupDialogMenu.style.transform = 'translate3d(645px, 0, 0)';
      popupDialogMenu.classList.remove('showMenu');
      popupDialogMenu.classList.add('hideMenu');
    }
  };

  body.addEventListener('click', handlerMenu);
};

export default toggleMenu;
