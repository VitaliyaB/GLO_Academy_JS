const createSlider = (sliderWrapper, itemsWrapperClass, slidesClass, activeClass, curItems) => {
  const sliderWrapperWidth = sliderWrapper.offsetWidth;
  const itemsWrapper = document.querySelector('.' + itemsWrapperClass);
  let slides = itemsWrapper.querySelectorAll('.' + slidesClass);
  const slidesLength = slides.length;
  const slideStyles = window.getComputedStyle(slides[0]);
  const slideWidth = slides[0].offsetWidth + parseFloat(slideStyles.marginLeft) + parseFloat(slideStyles.marginRight);
  const visibleSlides = Math.floor(sliderWrapperWidth / slideWidth);
  let cloneFirst;
  let cloneLast;
  const cloneFirstItems = [];
  const cloneLastItems = [];
  let interval;
  let startPosition;
  let index;

  // * cloning items
  for (let i = 0; i < visibleSlides; i++) {
    const clone = slides[i].cloneNode(true);
    cloneFirstItems.push(clone);
  }

  for (let i = slides.length - 1; i >= slides.length - visibleSlides; i--) {
    const clone = slides[i].cloneNode(true);
    cloneLastItems.push(clone);
  }

  cloneFirstItems.forEach((item, idx) => {
    if (idx === 0) {
      item.id = 'first-clone';
      cloneFirst = item;
    }
    itemsWrapper.append(item);
  });

  cloneLastItems.forEach((item, idx, arr) => {
    if (idx === arr.length - 1) {
      item.id = 'last-clone';
      cloneLast = item;
    }
    itemsWrapper.prepend(item);
  });

  if (activeClass === '.popup-transparency') {
    index = curItems + 1;
    startPosition = -slideWidth * index;
  } else {
    startPosition = -slideWidth * visibleSlides;
    index = visibleSlides;
  }

  itemsWrapper.style.transform = `translateX(${startPosition}px)`;

  //* switch active items
  const switchActive = (refresh) => {
    let idx = index;
    if (visibleSlides !== 1) idx += 1;

    const popUp = slides[idx].querySelector(activeClass + '-item-popup');
    popUp.style.visibility = 'visible';
    if (refresh) {
      const slideIcon = slides[idx].querySelector(activeClass + '-item__icon');
      const slideIconInner = slides[idx].querySelector(activeClass + '-item__icon-inner');
      if (activeClass === '.problems') {
        const slideIconInnerSvg = slideIconInner.querySelector('svg');
        slideIconInnerSvg.style.transition = 'unset';
      }
      slideIcon.style.transition = 'unset';
      slideIconInner.style.transition = 'unset';
    }
    slides[idx].classList.add('active-item');
  };

  const checkAllItems = () => {
    slides = itemsWrapper.querySelectorAll('.' + slidesClass);
  };

  const checkRefresh = (refresh) => {
    if (activeClass === '.formula' || activeClass === '.problems') {
      switchActive(refresh);
    }
  };

  const scrollSlides = (refresh) => {
    checkRefresh(refresh);
    itemsWrapper.style.transform = `translateX(${-slideWidth * index}px)`;
    itemsWrapper.style.transition = '.7s';
  };

  const pagination = () => {
    const sliderCounterCurrent = document.querySelector(activeClass + '-slider-wrap .slider-counter-content__current');
    let page = 1;

    if (index > slidesLength) {
      page = index - slidesLength;
    } else if (index === 0) {
      page = slidesLength;
    } else {
      page = index;
    }

    sliderCounterCurrent.textContent = page;
  };

  const scrollRight = () => {
    checkAllItems();
    if (index >= slides.length - 1) return;
    index++;
    scrollSlides();
    if (activeClass === '.popup-transparency' || activeClass === '.repair-types') {
      pagination();
    }
  };

  const scrollLeft = () => {
    checkAllItems();
    if (index <= 0) return;
    index--;
    scrollSlides();
    if (activeClass === '.popup-transparency' || activeClass === '.repair-types') {
      pagination();
    }
  };

  const startSlide = () => {
    interval = setInterval(scrollRight, 1500);
  };

  const stopSlide = () => {
    clearInterval(interval);
  };

  if (activeClass === '.formula' || activeClass === '.problems') {
    checkAllItems();
    switchActive();
  }

  if (activeClass === '.partners') {
    startSlide();
  }

  if (activeClass === '.popup-transparency' || activeClass === '.repair-types') {
    const sliderCounterTotal = document.querySelector(activeClass + '-slider-wrap .slider-counter-content__total');
    sliderCounterTotal.textContent = slidesLength;

    pagination();
  }

  const scrollElem = (event) => {
    const target = event.target;

    if (target.closest('.slider-arrow_right') ||
      target.closest('.slider-arrow_left') ||
      target.closest('.popup-arrow_transparency_left') ||
      target.closest('.popup-arrow_transparency_right')) {
      checkAllItems();

      if (activeClass === '.formula' || activeClass === '.problems') {
        slides.forEach((item) => {
          const popUp = item.querySelector(activeClass + '-item-popup');
          popUp.style.visibility = 'hidden';
          item.classList.remove('active-item');
        });
      }

      if (target.closest('.slider-arrow_right') || target.closest('.popup-arrow_transparency_right')) {
        scrollRight();
      }

      if (target.closest('.slider-arrow_left') || target.closest('.popup-arrow_transparency_left')) {
        scrollLeft();
      }
    }
  };

  sliderWrapper.addEventListener('transitionend', (event) => {
    const target = event.target;
    if (!target.classList.contains(itemsWrapperClass)) return;

    checkAllItems();

    if (slides[index].id === cloneFirst.id) {
      itemsWrapper.style.transition = 'none';
      index = visibleSlides;
      itemsWrapper.style.transform = `translateX(${-slideWidth * index}px)`;
      const refresh = 1;
      checkRefresh(refresh);
    }
    if (slides[index].id === cloneLast.id) {
      itemsWrapper.style.transition = 'none';
      index = slides.length - visibleSlides * 2;
      itemsWrapper.style.transform = `translateX(${-slideWidth * index}px)`;
      const refresh = 1;
      checkRefresh(refresh);
    }
  });

  sliderWrapper.addEventListener('click', scrollElem);

  if (activeClass === '.partners') {
    sliderWrapper.addEventListener('mouseover', (event) => {
      if (event.target.closest('.' + itemsWrapperClass) || event.target.closest('.slider-arrow')) {
        stopSlide();
      }
    });
    sliderWrapper.addEventListener('mouseout',  (event) => {
      if (event.target.closest('.' + itemsWrapperClass) || event.target.closest('.slider-arrow')) {
        startSlide();
      }
    });
  }
};

export default createSlider;
