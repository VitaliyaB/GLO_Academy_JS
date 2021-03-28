const showHint = () => {
  const formulaItem = document.querySelectorAll('.formula-item');
  const problemsItem = document.querySelectorAll('.problems-item');

  const showFormulaPopUp = (event, className) => {
    if (document.documentElement.clientWidth <= 1024) return;
    const target = event.target;
    const eventBlock = target.closest(className + '-item');
    const popUpItem = eventBlock.querySelector(className + '-item-popup');

    if (eventBlock.classList.contains('active-item')) {
      eventBlock.classList.remove('active-item');
    } else {
      const hintTop = popUpItem.getBoundingClientRect().top;
      eventBlock.classList.add('active-item');

      if (hintTop < 0) {
        eventBlock.classList.add('active-item__reverse');
      }
    }
  };

  formulaItem.forEach((item) => {
    item.addEventListener('mouseover', (event) => {
      showFormulaPopUp(event, '.formula');
    });
  });
  formulaItem.forEach((item) => {
    item.addEventListener('mouseout', (event) => {
      showFormulaPopUp(event, '.formula');
    });
  });
  problemsItem.forEach((item) => {
    item.addEventListener('mouseover', (event) => {
      showFormulaPopUp(event, '.problems');
    });
  });
  problemsItem.forEach((item) => {
    item.addEventListener('mouseout', (event) => {
      showFormulaPopUp(event, '.problems');
    });
  });
};

export default showHint;
