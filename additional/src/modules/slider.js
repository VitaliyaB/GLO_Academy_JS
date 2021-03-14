const slider = () => {
  const slide = document.querySelectorAll('.portfolio-item');
  const slider = document.querySelector('.portfolio-content');
  const portfolioDots = document.querySelector('.portfolio-dots');
  let currentSlide = 0;
  let interval;
  let dot;

  const prevSlide = (elem, index, strClass) => {
    elem[index].classList.remove(strClass);
  };

  const nextSlide = (elem, index, strClass) => {
    elem[index].classList.add(strClass);
  };

  const autoplay = () => {
    prevSlide(slide, currentSlide, 'portfolio-item-active');
    prevSlide(dot, currentSlide, 'dot-active');
    currentSlide++;
    if (currentSlide >= slide.length) {
      currentSlide = 0;
    }
    nextSlide(slide, currentSlide, 'portfolio-item-active');
    nextSlide(dot, currentSlide, 'dot-active');
  };

  const startSlide = (time = 1500) => {
    interval = setInterval(autoplay, time);
  };

  const stopSlide = () => {
    clearInterval(interval);
  };

  const addDots = () => {
    for (let i = 0; i < slide.length; i++) {
      if (i === 0) {
        portfolioDots.insertAdjacentHTML('beforeend', `<li class="dot dot-active"></li>`);
      } else {
        portfolioDots.insertAdjacentHTML('beforeend', `<li class="dot"></li>`);
      }
    }

    dot = portfolioDots.querySelectorAll('.dot');
    startSlide();
  };

  slider.addEventListener('click', (event) => {
    event.preventDefault();
    const target = event.target;

    if (!target.matches('.portfolio-btn, .dot')) {
      return;
    }

    prevSlide(slide, currentSlide, 'portfolio-item-active');
    prevSlide(dot, currentSlide, 'dot-active');

    if (target.matches('#arrow-right')) {
      currentSlide++;
    } else if (target.matches('#arrow-left')) {
      currentSlide--;
    } else if (target.matches('.dot')) {
      dot.forEach((elem, index) => {
        if (elem === target) {
          currentSlide = index;
        }
      });
    }

    if (currentSlide >= slide.length) {
      currentSlide = 0;
    }

    if (currentSlide < 0) {
      currentSlide = slide.length - 1;
    }
    nextSlide(slide, currentSlide, 'portfolio-item-active');
    nextSlide(dot, currentSlide, 'dot-active');
  });

  slider.addEventListener('mouseover', (event) => {
    if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
      stopSlide();
    }
  });

  slider.addEventListener('mouseout', (event) => {
    if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
      startSlide();
    }
  });

  addDots();
};

export default slider;
