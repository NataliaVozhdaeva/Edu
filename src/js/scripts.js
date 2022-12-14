/* прокрутка меню в шапке */

const menuArrowNext = document.querySelector('.header_btn__next');
const menuArrowPrev = document.querySelector('.header_btn__prev');
const headerNav = document.querySelector('.header_navigation');
const header = document.querySelector('.header');
let translateSize = headerNav.offsetWidth - header.offsetWidth + 48;
const navFirstChild = document.querySelector('.forEffectWithStart');
const navLastChild = document.querySelector('.forEffectWithEnd');

const toggleMenuItemsClass = (el1, el2, className) => {
  el1.classList.toggle(className);
  el2.classList.toggle(className);
};

const changeMenuPositionToEnd = () => {
  headerNav.style.transform = 'translateX(' + -translateSize + 'px) ';
  toggleMenuItemsClass(menuArrowNext, menuArrowPrev, 'notDisplay');
  toggleMenuItemsClass(navFirstChild, navLastChild, 'active');
};

const changeMenuPositionToStart = () => {
  headerNav.style.transform = 'translateX(0)';
  toggleMenuItemsClass(menuArrowNext, menuArrowPrev, 'notDisplay');
  toggleMenuItemsClass(navFirstChild, navLastChild, 'active');
};

menuArrowNext.addEventListener('click', changeMenuPositionToEnd);
menuArrowPrev.addEventListener('click', changeMenuPositionToStart);

/* получение данных с сервера и отрисовка меню городов */

const locationLink = document.querySelector('.header_location.link');
const citiesList = document.querySelector('.city_container');
const citySearchMenu = document.querySelector('.citySearchMenu');

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
  loaderBox.classList.add('loader');
  citiesList.appendChild(loaderBox);
}; //создаем лоадер

const closeDropMenu = (e) => {
  const key = e.key;
  if (e.keyCode == 27 && key === 'Escape') {
    citySearchMenu.classList.add('notDisplay');
  }
}; //closeMemu

openMenu = async () => {
  citySearchMenu.classList.toggle('notDisplay');
  document.querySelector('.citySearch').value = '';
  citiesList.textContent = '';
  setLoader();
  await getData();
  if (result) {
    createCityLi(result);
  } else {
    document.querySelector('.loader').remove();
    const errorMessage = document.createElement('li');
    errorMessage.classList.add('city_item');
    errorMessage.textContent =
      'Список городов сейчас недоступен, но мы вот-вот все починим:)';
    citiesList.appendChild(errorMessage);
  }
  document.addEventListener('keydown', closeDropMenu);
}; //openMenu

createCityLi = (data) => {
  if (document.querySelector('.loader')) {
    document.querySelector('.loader').remove();
  }

  for (let key in data) {
    if (data[key] === data[key].value) {
      const cityItem = document.createElement('li');
      cityItem.classList.add('city_item');
      citiesList.appendChild(cityItem);

      const cityItemName = document.createElement('a');
      cityItemName.classList.add('link');
      cityItemName.classList.add('city_name');
      cityItemName.textContent = result[key];
      cityItem.appendChild(cityItemName);
    } else {
      for (let oneCity of data[key]) {
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

/* фильтр по клику пользователя */

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

/* динамический поиск (нужно набрать ДВЕ первых буквы) */

document.querySelector('.citySearch').onkeyup = function () {
  let res = {};
  let searchText = this.value.toLowerCase();
  let stringLength = searchText.length;
  if (stringLength > 1) {
    for (let key in result)
      for (let i = 0; i < result[key].length; i++) {
        let cityName = result[key][i]
          .split('')
          .slice(0, stringLength)
          .join('')
          .toLowerCase();

        let cityState = key
          .split('')
          .slice(0, stringLength)
          .join('')
          .toLowerCase();

        if (cityName == searchText) {
          citiesList.textContent = '';
          let myValue = [result[key][i]];
          res[key] = myValue;
          createCityLi(res);
        } else if (cityState == searchText) {
          citiesList.textContent = '';
          res[key] = result[key];
          createCityLi(res);
        }
      }
  } else if (stringLength === 0) {
    citiesList.textContent = '';
    createCityLi(result);
  } //обрабатываем совпадения с поисковым запросом пользователя
};
