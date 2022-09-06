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

const cities = document.querySelectorAll('.city_item');

/* const addToFiltered = (el) => {
  const filteredCitiesContainer = document.querySelector(
    '.citySearchMenu_doneContainer'
  );
  const filteredCity = document.createElement('span');
  filteredCity.classList.add('citySearchMenu_done');
  filteredCity.textContent = el.textcontent;
  filteredCitiesContainer.appendChild(filteredCity);
}; */

for (let i = 0; i < cities.length; i++) {
  cities[i].addEventListener('click', function () {
    const filteredCitiesContainer = document.querySelector(
      '.citySearchMenu_doneContainer'
    );
    const filteredCity = document.createElement('span');
    filteredCity.classList.add('citySearchMenu_done');
    filteredCity.textContent = cities[i].textcontent;
    filteredCitiesContainer.appendChild(filteredCity);
  });
}

//console.log(cities);

const filteredCities = document.querySelectorAll('.citySearchMenu_done');

for (let i = 0; i < filteredCities.length; i++) {
  const delCityBtn = filteredCities[i].querySelector('.citySearchMenu_delBtn');
  delCityBtn.addEventListener('click', function () {
    filteredCities[i].remove();
  });
}
