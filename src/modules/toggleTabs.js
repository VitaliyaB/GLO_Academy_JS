import createSlider from '@modules/createSlider';

const toggleTabs = () => {
  const clientWidth = document.documentElement.clientWidth;
  const repairTypesTab = document.querySelector('.repair-types-tab');
  const repairTypesButtons = repairTypesTab.querySelectorAll('button');
  const tabLength = repairTypesButtons.length;
  const endPos = repairTypesTab.querySelector('.repair-types-nav').getBoundingClientRect().right;
  console.log('toggleTabs ~ endPos', endPos);
  const navListRepair = repairTypesTab.querySelector('.nav-list-repair');
  let cloneTypeRepairWrap;
  let targetIndex = 0;
  let typeRepair;
  const startPos = repairTypesButtons[0].getBoundingClientRect().left;
  console.log('toggleTabs ~ startPos', startPos);
  let countSlide = 0;
  let scrollLength = 0;

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

      if (clientWidth <= 1024) {
        if (target.getBoundingClientRect().right > endPos) {
          scrollLength += -(target.getBoundingClientRect().right - endPos);
          navListRepair.style.marginLeft = scrollLength + 'px';
        }
        if (target.getBoundingClientRect().left < startPos) {
          scrollLength += (startPos - target.getBoundingClientRect().left);
          navListRepair.style.marginLeft = scrollLength + 'px';
        }
      }

      getElem();
      typeRepair.replaceWith(cloneTypeRepairWrap);
      typeRepair.classList.remove('show');
      typeRepair.classList.add('hide');

      repairTypesButtons.forEach((item, idx) => {
        if (item === target) targetIndex = idx;
        item.classList.remove('active');
        item.classList.remove('fade-tab');
      });

      target.classList.add('active');
      target.classList.add('fade-tab');
      toggleSlider();
    }

    if (target.closest('.nav-arrow_left')) {
      if (countSlide < tabLength - 1) {
        const leftPos = repairTypesButtons[countSlide + 1].getBoundingClientRect().left - startPos;
        const virtualPosRight = repairTypesButtons[tabLength - 1].getBoundingClientRect().right - leftPos;
        if (virtualPosRight > endPos) {
          scrollLength += -leftPos;
          navListRepair.style.marginLeft = scrollLength + 'px';
          countSlide++;
        } else if (repairTypesButtons[tabLength - 1].getBoundingClientRect().right > endPos) {
          scrollLength += -(repairTypesButtons[tabLength - 1].getBoundingClientRect().right - endPos);
          navListRepair.style.marginLeft = scrollLength + 'px';
        }
      }
    }

    if (target.closest('.nav-arrow_right')) {
      if (countSlide > 0) {
        const rightPos = repairTypesButtons[countSlide - 1].getBoundingClientRect().left -
          repairTypesButtons[countSlide].getBoundingClientRect().left;
        const virtualPosRight = repairTypesButtons[0].getBoundingClientRect().right + rightPos;
        if (virtualPosRight < startPos) {
          scrollLength += -rightPos;
          navListRepair.style.marginLeft = scrollLength + 'px';
          countSlide--;
        }
      }
      if (countSlide === 0) {
        scrollLength = 0;
        navListRepair.style.marginLeft = 0 + 'px';
      }
    }
  };

  repairTypesTab.addEventListener('click', toggleTabContent);
};

export default toggleTabs;
