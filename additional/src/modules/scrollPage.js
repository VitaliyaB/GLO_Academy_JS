const scrollPage = () => {
  const links = document.querySelectorAll('a[href*="#"]');

  const scrollToTarget = (event) => {
    event.preventDefault();

    const target = event.target.closest('a');
    const linkHref = target.getAttribute('href').slice(1);

    if (linkHref) {
      document.getElementById(linkHref).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  links.forEach((item) => {
    item.addEventListener('click', scrollToTarget);
  });
};

export default scrollPage;
