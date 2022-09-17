/* получение данных с сервера и отрисовка меню городов */

const locationLink = document.querySelector('.header_location.link');
let result;
const citiesList = document.querySelector('.city_container');

getData = async () => {
  const requestURL = '../mock/data.json';
  try {
    const response = await fetch(requestURL);
    result = await response.json();
  } catch (error) {
    console.log(error);
  }
  return result;
}; //получаем данные

setLoader = () => {
  const loaderBox = document.createElement('li');
  loaderBox.classList.add('box');
  citiesList.appendChild(loaderBox);
  loaderBox.classList.add('loader');
}; //создаем лоадер

openMenu = async () => {
  const citySearchMenu = document.querySelector('.citySearchMenu');
  citySearchMenu.classList.toggle('notDisplay');
  setLoader();
  await getData();
  if (result) {
    createCityLi();
  } else {
    document.querySelector('.loader').remove();
    const errorMessage = document.createElement('li');
    errorMessage.classList.add('city_item');
    errorMessage.textContent =
      'Список городов сейчас недоступен, но мы вот-вот все починим:)';
    citiesList.appendChild(errorMessage);
  }
};

createCityLi = () => {
  document.querySelector('.loader').remove();
  for (let key in result) {
    if (result[key].length < 2) {
      const cityItem = document.createElement('li');
      cityItem.classList.add('city_item');
      citiesList.appendChild(cityItem);

      const cityItemName = document.createElement('a');
      cityItemName.classList.add('link');
      cityItemName.classList.add('city_name');
      cityItemName.textContent = result[key];
      cityItem.appendChild(cityItemName);
    } else {
      for (let oneCity of result[key]) {
        const cityItem = document.createElement('li');
        cityItem.classList.add('city_item');
        citiesList.appendChild(cityItem);

        const cityItemName = document.createElement('a');
        cityItemName.classList.add('link');
        cityItemName.classList.add('city_name');
        cityItemName.textContent = oneCity;

        const cityItemState = document.createElement('a');
        cityItemState.classList.add('link');
        cityItemState.classList.add('city_state');
        cityItemState.textContent = key;

        cityItem.appendChild(cityItemName);
        cityItem.appendChild(cityItemState);
      }
    }
  }
}; //createCityLi

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

const filteredCitiesContainer = document.querySelector(
  '.citySearchMenu_doneContainer'
);
const citySearch = document.querySelector('.citySearch');
const saveCityBtn = document.querySelector('.citySearchMenu_saveBtn');

deleteCityFromFiltered = (e) => {
  const cities = document.querySelectorAll('.city_item');
  if (e.target.classList.contains('btn')) {
    for (let city of cities) {
      if (
        city.firstElementChild.textContent === e.target.parentNode.textContent
      ) {
        city.classList.remove('activeCity');
      }
    }
    e.target.parentNode.remove();
    if (filteredCitiesContainer.childNodes.length <= 1) {
      saveCityBtn.setAttribute('disabled', 'true');
    }
  }
}; //deleteCityFromFiltered

addCityToFiltered = (e) => {
  saveCityBtn.removeAttribute('disabled');
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
    if (filteredCitiesContainer.childNodes.length <= 1) {
      saveCityBtn.setAttribute('disabled', 'true');
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

saveCityBtn.addEventListener('click', function () {
  console.log('hi');
});

/* cityOffer = (e) => {
  for (i = 0; i < cities.length; i++) {
    if (cities[i].firstElementChild.textContent) {
    }
  }

  console.log(e.target.value);
};

citySearch.addEventListener('input', cityOffer); */
