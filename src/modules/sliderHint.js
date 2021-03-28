const sliderHint = () => {
  const clientWidth = document.documentElement.clientWidth;

  if (clientWidth <= 1024) {
    const formulaSliderWrapper = document.querySelector('.formula-slider-wrap');
    const formulaSliderWrapperWidth = formulaSliderWrapper.offsetWidth;
    const formulaSlider = document.querySelector('.formula-item__wrapper');
    let formulaSlides = document.querySelectorAll('.formula-slider__slide');
    const slideWidth = formulaSlides[0].offsetWidth;
    const visibleSlides = formulaSliderWrapperWidth / slideWidth;
    let cloneFirst;
    let cloneLast;
    const cloneFirstItems = [];
    const cloneLastItems = [];

    for (let i = 0; i < visibleSlides; i++) {
      const clone = formulaSlides[i].cloneNode(true);
      cloneFirstItems.push(clone);
    }

    for (let i = formulaSlides.length - 1; i >= formulaSlides.length - visibleSlides; i--) {
      const clone = formulaSlides[i].cloneNode(true);
      cloneLastItems.push(clone);
    }

    cloneFirstItems.forEach((item, idx) => {
      if (idx === 0) {
        item.id = 'first-clone';
        cloneFirst = item;
      }
      formulaSlider.append(item);
    });

    cloneLastItems.forEach((item, idx, arr) => {
      if (idx === arr.length - 1) {
        item.id = 'last-clone';
        cloneLast = item;
      }
      formulaSlider.prepend(item);
    });

    const startPosition = -slideWidth * visibleSlides;
    let index = visibleSlides;

    formulaSlider.style.transform = `translateX(${startPosition}px)`;

    const switchActive = (index, refresh) => {
      const popUp = formulaSlides[index + 1].querySelector('.formula-item-popup');
      popUp.style.visibility = 'visible';
      if (refresh) {
        const formulaIcon = formulaSlides[index + 1].querySelector('.formula-item__icon');
        const formulaIconInner = formulaSlides[index + 1].querySelector('.formula-item__icon-inner');
        formulaIcon.style.transition = 'unset';
        formulaIconInner.style.transition = 'unset';
      }
      formulaSlides[index + 1].classList.add('active-item');
    };

    const checkAllItems = () => {
      formulaSlides = document.querySelectorAll('.formula-slider__slide');
    };

    if (clientWidth > 575) {
      checkAllItems();
      switchActive(index);
    }

    const scrollElem = (event) => {
      const target = event.target;

      checkAllItems();
      formulaSlides.forEach((item) => {
        const popUp = item.querySelector('.formula-item-popup');
        popUp.style.visibility = 'hidden';
        item.classList.remove('active-item');
      });

      if (target.closest('#formula-arrow_right')) {
        if (index >= formulaSlides.length - 1) return;
        index++;
        if (clientWidth >= 575 && clientWidth <= 1024) {
          switchActive(index);
        }
        formulaSlider.style.transform = `translateX(${-slideWidth * index}px)`;
        formulaSlider.style.transition = '.7s';
      }

      if (target.closest('#formula-arrow_left')) {
        if (index <= 0) return;
        index--;
        if (clientWidth >= 575 && clientWidth <= 1024) {
          switchActive(index);
        }
        formulaSlider.style.transform = `translateX(${-slideWidth * index}px)`;
        formulaSlider.style.transition = '.7s';
      }
    };

    formulaSliderWrapper.addEventListener('transitionend', (event) => {
      const target = event.target;
      if (!target.classList.contains('formula-item__wrapper')) return;

      checkAllItems();

      if (formulaSlides[index].id === cloneFirst.id) {
        formulaSlider.style.transition = 'none';
        index = visibleSlides;
        formulaSlider.style.transform = `translateX(${-slideWidth * index}px)`;
        const refresh = 1;
        if (clientWidth >= 575 && clientWidth <= 1024) {
          switchActive(index, refresh);
        }
      }
      if (formulaSlides[index].id === cloneLast.id) {
        formulaSlider.style.transition = 'none';
        index = formulaSlides.length - visibleSlides * 2;
        formulaSlider.style.transform = `translateX(${-slideWidth * index}px)`;
        const refresh = 1;
        if (clientWidth >= 575 && clientWidth <= 1024) {
          switchActive(index, refresh);
        }
      }
    });
    formulaSliderWrapper.addEventListener('click', scrollElem);
  }
};

export default sliderHint;
