const showHint = () => {
  const formulaItem = document.querySelectorAll('.formula-item');

  const showFormulaPopUp = (event) => {
    const target = event.target;
    const eventFormula = target.closest('.formula-item');
    const popUpItem = eventFormula.querySelector('.formula-item-popup');

    popUpItem.style.visibility = 'visible';

    // eventFormula.addEventListener('mouseout', () => {
    //   popUpItem.style.visibility = 'hidden';
    // });

  };

  formulaItem.forEach((item) => {
    item.addEventListener('mouseover', showFormulaPopUp);
  });
};

export default showHint;
