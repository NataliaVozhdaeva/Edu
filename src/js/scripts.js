let menuArrowNext = document.querySelector('.header_btn__next');
let menuArrowPrev = document.querySelector('.header_btn__prev');
let headerNav = document.querySelector('.header_navigation');
let navLastChild = document.querySelector('.navigation_item:last-child');
let navFirstChild = document.querySelector('.navigation_item:first-child');
let nav2ndChild = document.querySelector('.navigation_item:nth-child(2)');
/* Можно было бы применить эффект угасания текста только к первому и последнему элементам как в макете 
и укоротить код, но при небольшой ширине первого красивее накладывать эффект на второй */

let toggleClass = (el1, el2, className) => {
  el1.classList.toggle(className);
  el2.classList.toggle(className);
};

let changeMenuPosition = () => {
  headerNav.classList.toggle('translateToLeft');
  navFirstChild.classList.toggle('hidden');
  toggleClass(navLastChild, nav2ndChild, 'active');
  toggleClass(menuArrowNext, menuArrowPrev, 'notDisplay');
};

menuArrowNext.addEventListener('click', changeMenuPosition);
menuArrowPrev.addEventListener('click', changeMenuPosition);
