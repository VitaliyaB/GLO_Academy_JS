const accordion = () => {
  const accordion = document.querySelector('.accordion');

  const toggleMessages = (event) => {
    const target = event.target;

    if (target.closest('.title_block')) {
      const titles = accordion.querySelectorAll('.title_block');
      const title = target.closest('.title_block');

      if (title.classList.contains('msg-active')) {
        title.classList.remove('msg-active');
        return;
      }

      titles.forEach((item) => {
        item.classList.remove('msg-active');
      });

      title.classList.add('msg-active');
    }
  };

  accordion.addEventListener('click', toggleMessages);
};

export default accordion;
