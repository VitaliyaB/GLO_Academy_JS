import createSlider from '@modules/createSlider';

const startSlider = () => {
  const clientWidth = document.documentElement.clientWidth;

  if (clientWidth <= 1024) {
    // * hint sliders
    const formulaSliderWrapper = document.querySelector('.formula-slider-wrap');
    const problemsSliderWrapper = document.querySelector('.problems-slider-wrap');
    createSlider(formulaSliderWrapper, 'formula-item__wrapper', 'formula-slider__slide', '.formula');
    createSlider(problemsSliderWrapper, 'problems-item__wrapper', 'problems-slider__slide', '.problems');
  }

  // * reviews slides
  const reviewsSliderWrapper = document.querySelector('.reviews-slider-wrap');
  createSlider(reviewsSliderWrapper, 'reviews-item__wrapper', 'reviews-slider__slide', '.reviews');

  // * partners slides
  // const partnersSliderWrapper = document.querySelector('.partners-slider-wrap');
  // createSlider(partnersSliderWrapper, 'partners-item__wrapper', 'partners-slider__slide', '.partners');

  // * documents slider
  if (clientWidth <= 1090) {
    const transparencySliderWrapper = document.querySelector('.transparency-slider-wrap');
    createSlider(transparencySliderWrapper, 'transparency-item__wrapper', 'transparency-slider__slide',
      '.transparency');
  }
};

export default startSlider;
