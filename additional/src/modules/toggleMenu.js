const toggleMenu = () => {
  const body = document.querySelector('body');
  const menu = document.querySelector('menu');

  const handlerMenu = (event) => {
    const target = event.target;
    console.log('handlerMenu ~ target', target);
    if (target.closest('.menu') || target.classList.contains('close-btn') ||
      target.matches('menu a') || !target.closest('.active-menu')) {

      menu.classList.toggle('active-menu');
    }
  };

  body.addEventListener('click', handlerMenu);
};

export default toggleMenu;
