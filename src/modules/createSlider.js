const createSlider = (sliderWrapper, itemsWrapperClass, slidesClass, activeClass) => {
  const sliderWrapperWidth = sliderWrapper.offsetWidth;
  const itemsWrapper = document.querySelector('.' + itemsWrapperClass);
  let slides = document.querySelectorAll('.' + slidesClass);
  const slideStyles = window.getComputedStyle(slides[0]);
  const slideWidth = slides[0].offsetWidth + parseFloat(slideStyles.marginLeft) + parseFloat(slideStyles.marginRight);
  const visibleSlides = Math.floor(sliderWrapperWidth / slideWidth);
  let cloneFirst;
  let cloneLast;
  const cloneFirstItems = [];
  const cloneLastItems = [];
  let interval;

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

  const startPosition = -slideWidth * visibleSlides;
  let index = visibleSlides;

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
    slides = document.querySelectorAll('.' + slidesClass);
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

  const scrollRight = () => {
    checkAllItems();
    if (index >= slides.length - 1) return;
    index++;
    scrollSlides();
  };

  const scrollLeft = () => {
    checkAllItems();
    if (index <= 0) return;
    index--;
    scrollSlides();
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

  const scrollElem = (event) => {
    const target = event.target;

    if (target.closest('.slider-arrow_right') || target.closest('.slider-arrow_left')) {
      checkAllItems();

      if (activeClass === '.formula' || activeClass === '.problems') {
        slides.forEach((item) => {
          const popUp = item.querySelector(activeClass + '-item-popup');
          popUp.style.visibility = 'hidden';
          item.classList.remove('active-item');
        });
      }

      if (target.closest('.slider-arrow_right')) {
        scrollRight();
      }

      if (target.closest('.slider-arrow_left')) {
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
