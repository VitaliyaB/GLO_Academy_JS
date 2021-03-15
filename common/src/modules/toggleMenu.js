const toggleMenu = () => {
  const body = document.querySelector('body');
  const menu = document.querySelector('menu');

  const handlerMenu = (event) => {
    const target = event.target;

    if (target.closest('.menu')) {
      menu.classList.add('active-menu');
    }

    if (target.classList.contains('close-btn') || target.matches('menu a')) {
      menu.classList.remove('active-menu');
    }

    if (!target.closest('.active-menu') && menu.classList.contains('active-menu') && !target.closest('.menu')) {
      menu.classList.remove('active-menu');
    }
  };

  body.addEventListener('click', handlerMenu);
};

export default toggleMenu;
