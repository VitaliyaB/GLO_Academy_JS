import createSlider from '@modules/createSlider';

const toggleTabs = () => {
  const clientWidth = document.documentElement.clientWidth;
  const repairTypesTab = document.querySelector('.repair-types-tab');
  const navListRepair = repairTypesTab.querySelector('.nav-list-repair');
  const repairTypesButtons = repairTypesTab.querySelectorAll('button');
  const tabLength = repairTypesButtons.length;
  const startPos = repairTypesButtons[0].getBoundingClientRect().left;
  const endPos = repairTypesTab.querySelector('.repair-types-nav').getBoundingClientRect().right;
  const arrowRight = repairTypesTab.querySelector('.nav-arrow_right');
  const arrowLeft = repairTypesTab.querySelector('.nav-arrow_left');
  let cloneTypeRepairWrap;
  let targetIndex = 0;
  let typeRepair;
  let countSlide = 0;
  let scrollLength = 0;

  arrowLeft.style.visibility = 'hidden';

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
        const targetRightPos = target.getBoundingClientRect().right;
        const targetLeftPos = target.getBoundingClientRect().left;
        if (targetRightPos > endPos) {
          scrollLength += -(targetRightPos - endPos);
          navListRepair.style.marginLeft = scrollLength + 'px';
        }
        if (targetLeftPos < startPos) {
          scrollLength += (startPos - targetLeftPos);
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
      arrowRight.style.visibility = 'visible';
      if (countSlide > 0) {
        const prevPosLeft = repairTypesButtons[countSlide - 1].getBoundingClientRect().left;
        const currPosLeft = repairTypesButtons[countSlide].getBoundingClientRect().left;
        const firstTabPosRight = repairTypesButtons[0].getBoundingClientRect().right;
        const rightPos =  prevPosLeft - currPosLeft;
        const virtualPosRight = firstTabPosRight + rightPos;

        if (virtualPosRight < startPos) {
          scrollLength += -rightPos;
          navListRepair.style.marginLeft = scrollLength + 'px';
          countSlide--;
        }
      }
      if (countSlide === 0) {
        scrollLength = 0;
        navListRepair.style.marginLeft = 0 + 'px';
        arrowLeft.style.visibility = 'hidden';
      }
    }

    if (target.closest('.nav-arrow_right')) {
      arrowLeft.style.visibility = 'visible';
      if (countSlide < tabLength - 1) {
        const nextPosLeft = repairTypesButtons[countSlide + 1].getBoundingClientRect().left;
        const LastTabPosRight = repairTypesButtons[tabLength - 1].getBoundingClientRect().right;
        const prevPosRight = repairTypesButtons[tabLength - 1].getBoundingClientRect().right;
        const leftPos = nextPosLeft - startPos;
        const virtualPosRight = LastTabPosRight - leftPos;

        if (virtualPosRight > endPos) {
          scrollLength += -leftPos;
          navListRepair.style.marginLeft = scrollLength + 'px';
          countSlide++;
        } else if (LastTabPosRight > endPos) {
          scrollLength += -(prevPosRight - endPos);
          navListRepair.style.marginLeft = scrollLength + 'px';
          arrowRight.style.visibility = 'hidden';
        }
      }
    }
  };

  repairTypesTab.addEventListener('click', toggleTabContent);
};

export default toggleTabs;
