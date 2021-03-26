const showHint = () => {
  const formulaItem = document.querySelectorAll('.formula-item');

  const showFormulaPopUp = (event) => {
    const target = event.target;
    const eventFormula = target.closest('.formula-item');
    const popUpItem = eventFormula.querySelector('.formula-item-popup');
    const itemDescr = eventFormula.querySelector('.formula-item__descr');

    popUpItem.style.visibility = 'visible';
    eventFormula.classList.add('active-item');

    const hintTop = popUpItem.getBoundingClientRect().top;

    if (hintTop < 0) {
      eventFormula.classList.add('active-item__reverse');
      itemDescr.style.visibility = 'hidden';
    }

    // eventFormula.addEventListener('mouseout', () => {
    //   eventFormula.classList.remove('active-item');
    //   popUpItem.style.visibility = 'hidden';
    //   itemDescr.style.visibility = 'visible';
    // });
  };

  formulaItem.forEach((item) => {
    item.addEventListener('mouseover', showFormulaPopUp);
  });
};

export default showHint;
