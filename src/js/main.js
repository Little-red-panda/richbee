"use strict";
// Табы (библиотека jQuery Ui)
$(function(){
  $('#tabs').tabs();
});

// Слайдер (библиотека Slick)
$('.single-item').slick({
  dots: true
});

// Слайдер для аналогов
if (window.innerWidth <= 768) {
  $('.lazy').slick({
    lazyLoad: 'ondemand',
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  });
} else if (window.innerWidth < 1440){
  $('.lazy').slick({
    lazyLoad: 'ondemand',
    slidesToShow: 3,
    slidesToScroll: 1
  });
} else {
  const list = document.querySelector('.analogs__list');
  let items = list.querySelectorAll('.analogs__item');
  const prev = document.querySelector('.analogs__button--prev');
  const next = document.querySelector('.analogs__button--next');
  
  const hideItems = (items) => {
    for (let i = items.length -1; i > 3; i--) {
      items[i].classList.add('analogs__item-hidden');
    }
  };
  const showItems = (items) => {
    for (let i = items.length -1; i > 3; i--) {
      items[i].classList.remove('analogs__item-hidden');
    }
  };
  const pressBtnNext = () => {
    showItems(items);
    list.appendChild(items[0]);
    items = document.querySelectorAll('.analogs__item');
    hideItems(items);
  };
  const pressBtnPrev = () => {
    showItems(items);
    list.insertBefore(items[items.length-1], items[0]);
    items = document.querySelectorAll('.analogs__item');
    hideItems(items);
  };
  
  hideItems(items);
  next.addEventListener('click', pressBtnNext);
  prev.addEventListener('click', pressBtnPrev);
}

// Кнопки меню 
const menuBtn = document.querySelector('.page-header__toggle');
const catalogBtn = document.querySelector('.main-menu__display-catalogs-toggle');
const catalog = document.querySelector('.mein-menu__link--catalog');
const header = document.querySelector('header');

const changeDisplayMenu = () => {
  menuBtn.classList.toggle('page-header__toggle--opened');
  header.classList.toggle('page-header--closed');
  header.classList.remove('catalog-opened');
}
const changeDisplayCatalog = () => {
  header.classList.toggle('catalog-opened');
}

header.classList.remove('no-js');
menuBtn.addEventListener('click', changeDisplayMenu);
catalogBtn.addEventListener('click', changeDisplayCatalog);
catalog.addEventListener('click', changeDisplayCatalog);

// Модальное окно
const main = document.querySelector('main');
const footer = document.querySelector('footer');
const modalLogin = document.querySelector('.modal-login');
const modalShim = document.querySelector('.modal-shim');
const modalLoginOpen = document.querySelector('.login__link');
const modalLoginCloseButton = document.querySelector('.modal-login__close-button');
const OPPENED_MODAL = 'modal-login-is-oppened';

const toggleClass = () => {
  header.classList.toggle(OPPENED_MODAL);
  main.classList.toggle(OPPENED_MODAL);
  footer.classList.toggle(OPPENED_MODAL);
};
const changeVisibilityModal = (display) => {
  modalLogin.style.display = display;
  modalShim.style.display = display;
};
const modalKeyDown = (evt) => {
  if (evt.keyCode === 27) {
    closeModal();
  }
};
const handleModalKeyDown = (evt) => modalKeyDown(evt)
const closeModal = () => {
  toggleClass();
  changeVisibilityModal('none');
  document.removeEventListener('keydown', handleModalKeyDown)
};

modalLoginOpen.addEventListener('click', () => {
  toggleClass();
  changeVisibilityModal('block');
  document.addEventListener('keydown', handleModalKeyDown)
});
modalShim.addEventListener('click', closeModal);
modalLoginCloseButton.addEventListener('click', closeModal);

// Обновление страницы при изменении ширины окна (для перерисовки слайдера аналогов)
const reloadPage = () => {
  window.location.reload();
};
const debounce = (func, wait) => {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;

    const later = function() {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
const debounceReloadPage = debounce(reloadPage, 100);
window.addEventListener('resize', debounceReloadPage);
