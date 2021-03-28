const showHint = () => {
  const formulaItem = document.querySelectorAll('.formula-item');

  const showFormulaPopUp = (event) => {
    if (document.documentElement.clientWidth <= 1024) return;
    const target = event.target;
    const eventFormula = target.closest('.formula-item');
    const popUpItem = eventFormula.querySelector('.formula-item-popup');
    const itemDescr = eventFormula.querySelector('.formula-item__descr');

    if (eventFormula.classList.contains('active-item')) {
      eventFormula.classList.remove('active-item');
      popUpItem.style.visibility = 'hidden';
      itemDescr.style.visibility = 'visible';
    } else {
      popUpItem.style.visibility = 'visible';
      eventFormula.classList.add('active-item');

      const hintTop = popUpItem.getBoundingClientRect().top;

      if (hintTop < 0) {
        eventFormula.classList.add('active-item__reverse');
        itemDescr.style.visibility = 'hidden';
      }
    }
  };

  formulaItem.forEach((item) => {
    item.addEventListener('mouseover', showFormulaPopUp);
  });
  formulaItem.forEach((item) => {
    item.addEventListener('mouseout', showFormulaPopUp);
  });
};

export default showHint;
