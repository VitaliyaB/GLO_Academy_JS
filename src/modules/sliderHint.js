import createSlider from '@modules/createSlider';

const sliderHint = () => {
  const clientWidth = document.documentElement.clientWidth;

  if (clientWidth <= 1024) {
    const formulaSliderWrapper = document.querySelector('.formula-slider-wrap');
    const problemsSliderWrapper = document.querySelector('.problems-slider-wrap');
    createSlider(formulaSliderWrapper, 'formula-item__wrapper', 'formula-slider__slide', '.formula');
    createSlider(problemsSliderWrapper, 'problems-item__wrapper', 'problems-slider__slide', '.problems');
  }
};

export default sliderHint;
