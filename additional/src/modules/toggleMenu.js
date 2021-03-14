const toggleMenu = () => {
  const btnMenu = document.querySelector('.menu');
  const menu = document.querySelector('menu');

  const handlerMenu = () => {
    menu.classList.toggle('active-menu');
  };

  menu.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('close-btn') || target.matches('menu a')) {
      handlerMenu();
    }
  });

  btnMenu.addEventListener('click', handlerMenu);
};

export default toggleMenu;
