const getData = () => {
  const getData = () => fetch('/src/db/db.json');
  let base;

  const popUpRepairTypesTab = document.querySelector('.popup-repair-types-tab');

  const getPricesServices = (event) => {
    const target = event.target;

    if (target.contains('.popup-repair-types-nav__item')) {
      getData()
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('status network not 200');
          }

          return response.json();
        })
        .then((data) => {
          base = data;
          console.log('.then ~ base', base);
        })
        .catch((err) => {
          console.log('changeCurTo ~ err', err);
        });

      const targetName = target.textContent.trim();
      console.log('getPricesServices ~ targetName', targetName);
    }
  };

  popUpRepairTypesTab.addEventListener('click', getPricesServices);
};

export default getData;
