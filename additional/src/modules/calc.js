const calc = (price = 100) => {
  const calcBlock = document.querySelector('.calc-block');
  const calcType = document.querySelector('.calc-type');
  const calcSquare = document.querySelector('.calc-square');
  const calcCount = document.querySelector('.calc-count');
  const calcDay = document.querySelector('.calc-day');
  const totalValue = document.getElementById('total');
  let countSumTotal = 0;
  let step = 1;
  const animationTime = 2000;
  let timerId;

  const countSum = () => {
    let total = 0;
    let countValue = 1;
    let dayValue = 1;
    const typeValue = calcType.options[calcType.selectedIndex].value;
    const squareValue = +calcSquare.value;
    clearInterval(timerId);
    totalValue.textContent = total;

    if (calcCount.value > 1) {
      countValue += (calcCount.value - 1) / 10;
    }

    if (calcDay.value && calcDay.value < 5) {
      dayValue *= 2;
    } else if (calcDay.value && calcDay.value < 10) {
      dayValue *= 1.5;
    }

    if (typeValue && squareValue) {
      total = price * typeValue * squareValue * countValue * dayValue;
    }

    if (total < 500) {
      step = 10;
    } else if (total > 10000) {
      step = 1000;
    } else {
      step = 100;
    }

    const time = Math.round(animationTime / (total / step));
    countSumTotal = total % step;

    const setTotal = () => {
      if (total > 0) {
        countSumTotal += step;
        totalValue.textContent = countSumTotal;
      }

      if (countSumTotal >= total || total <= 0) {
        clearInterval(timerId);
      }
    };

    timerId = setInterval(setTotal, time);
  };

  calcBlock.addEventListener('change', (event) => {
    const target = event.target;

    if (target.matches('select, input')) {
      countSum();
    }
  });
};

export default calc;
