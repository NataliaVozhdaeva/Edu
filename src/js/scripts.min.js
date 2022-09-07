/* прокрутка меню в шапке */

const menuArrowNext = document.querySelector('.header_btn__next');
const menuArrowPrev = document.querySelector('.header_btn__prev');
const headerNav = document.querySelector('.header_navigation');
const navLastChild = document.querySelector('.navigation_item:last-child');
const navFirstChild = document.querySelector('.navigation_item:first-child');
const nav2ndChild = document.querySelector('.navigation_item:nth-child(2)');
/* Можно было бы применить эффект угасания текста только к первому и последнему элементам как в макете 
и укоротить код, но при небольшой ширине первого красивее накладывать эффект на второй */

const toggleMenuItemsClass = (el1, el2, className) => {
  el1.classList.toggle(className);
  el2.classList.toggle(className);
};

const changeMenuPosition = () => {
  headerNav.classList.toggle('translateToLeft');
  navFirstChild.classList.toggle('hidden');
  toggleMenuItemsClass(navLastChild, nav2ndChild, 'active');
  toggleMenuItemsClass(menuArrowNext, menuArrowPrev, 'notDisplay');
};

menuArrowNext.addEventListener('click', changeMenuPosition);
menuArrowPrev.addEventListener('click', changeMenuPosition);

/* Код для вкладки выбора регионов */

const citiesList = document.querySelector('.city_container');

addCityToFiltered = (e) => {
  if (!e.target.classList.contains('city_item')) {
    var filteredCity = e.target.parentNode.firstElementChild;
  } else {
    var filteredCity = e.target.firstElementChild;
  }
  console.log(filteredCity.classList);
};

citiesList.addEventListener('click', addCityToFiltered);

/*const cities = document.querySelectorAll('.city_item');

 for (let i = 0; i < cities.length; i++) {
  cities[i].addEventListener('click', function () {
    cities[i].classList.add('activeCity');

    if (cities[i].classList.contains('activeCity')) {
      const filteredCitiesContainer = document.querySelector(
        '.citySearchMenu_doneContainer'
      );
      const filteredCity = document.createElement('span');
      const delCityBtn = document.createElement('span');
      filteredCity.classList.add('citySearchMenu_done');
      delCityBtn.classList.add('citySearchMenu_delBtn');
      filteredCity.textContent = cities[i].firstElementChild.textContent;
      delCityBtn.textContent = 'X';
      filteredCitiesContainer.appendChild(filteredCity);
      filteredCity.appendChild(delCityBtn);

      let filteredCities = document.querySelectorAll('.citySearchMenu_done');
      for (let i = 0; i < filteredCities.length; i++) {
        const delCityBtn = filteredCities[i].querySelector(
          '.citySearchMenu_delBtn'
        );
        const delCityFromFiltered = () => {
          filteredCities[i].remove();
        };
        delCityBtn.addEventListener('click', delCityFromFiltered);
      }
    } else {
      let filteredCities = document.querySelectorAll('.citySearchMenu_done');
      for (let i = 0; i < filteredCities.length; i++) {
        if (
          (filteredCities[i].textContent =
            cities[i].firstElementChild.textContent)
        ) {
          filteredCities[i].remove();
        }
      }
    }
  });
}
 */
