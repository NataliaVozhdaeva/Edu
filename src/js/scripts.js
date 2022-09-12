const locationLink = document.querySelector('.header_location.link');

openMenu = async () => {
  const requestURL = '../mock/data.json';

  try {
    const response = await fetch(requestURL);
    const result = await response.json();

    console.log(result);
  } catch (error) {
    console.log('something goes wrong' + ' - ' + error);
  }
};

locationLink.addEventListener('click', openMenu);

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
const filteredCitiesContainer = document.querySelector(
  '.citySearchMenu_doneContainer'
);
const cities = document.querySelectorAll('.city_item');
const citySearch = document.querySelector('.citySearch');

deleteCityFromFiltered = (e) => {
  if (e.target.classList.contains('btn')) {
    e.target.parentNode.remove();
    for (let city of cities) {
      if (
        city.firstElementChild.textContent === e.target.parentNode.textContent
      ) {
        city.classList.remove('activeCity');
      }
    }
  }
}; //deleteCityFromFiltered

addCityToFiltered = (e) => {
  if (!e.target.classList.contains('city_item')) {
    var choosenCity = e.target.parentNode.firstElementChild;
  } else {
    var choosenCity = e.target.firstElementChild;
  }

  if (choosenCity.parentNode.classList.contains('activeCity')) {
    choosenCity.parentNode.classList.remove('activeCity');

    let filteredCities = document.querySelectorAll('.citySearchMenu_done');
    for (let filteredCity of filteredCities) {
      if (filteredCity.textContent === choosenCity.textContent) {
        filteredCity.remove();
      }
    }
  } else {
    choosenCity.parentNode.classList.add('activeCity');
    const filteredCity = document.createElement('div');
    const delCityBtn = document.createElement('button');
    filteredCity.classList.add('citySearchMenu_done');
    delCityBtn.classList.add('citySearchMenu_delBtn');
    delCityBtn.classList.add('btn');
    filteredCity.textContent = choosenCity.textContent;
    filteredCitiesContainer.appendChild(filteredCity);
    filteredCity.appendChild(delCityBtn);
  }
  filteredCitiesContainer.addEventListener('click', deleteCityFromFiltered);
}; //addCityToFiltered

citiesList.addEventListener('click', addCityToFiltered);

/* cityOffer = (e) => {
  for (i = 0; i < cities.length; i++) {
    if (cities[i].firstElementChild.textContent) {
    }
  }

  console.log(e.target.value);
};

citySearch.addEventListener('input', cityOffer); */
