import createSlider from '@modules/createSlider';

const toggleTabs = () => {
  const repairTypesTab = document.querySelector('.repair-types-tab');
  const repairTypesButtons = repairTypesTab.querySelectorAll('button');
  let cloneTypeRepairWrap;
  let targetIndex = 0;
  let typeRepair;

  const getElem = () => {
    typeRepair = document.querySelector(`.types-repair${targetIndex + 1}`);
  };

  const toggleSlider = () => {
    getElem();
    cloneTypeRepairWrap = typeRepair.cloneNode(true);
    typeRepair.classList.remove('hide');
    typeRepair.classList.add('show');
    const repairTypesSliderWrapper = document.querySelector('.repair-types-slider-wrap');
    createSlider(repairTypesSliderWrapper, `types-repair${targetIndex + 1}`, 'repair-types-slider__slide',
      '.repair-types');
  };

  toggleSlider();

  const toggleTabContent = (event) => {
    const target = event.target;

    if (target.type === 'button') {
      getElem();
      typeRepair.replaceWith(cloneTypeRepairWrap);
      typeRepair.classList.remove('show');
      typeRepair.classList.add('hide');

      repairTypesButtons.forEach((item, idx) => {
        if (item === target) targetIndex = idx;
        item.classList.remove('active');
      });

      target.classList.add('active');
      toggleSlider();
    }
  };

  repairTypesTab.addEventListener('click', toggleTabContent);
};

export default toggleTabs;
