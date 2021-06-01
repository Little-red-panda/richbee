"use strict";
// Табы (код без библиотеки)
// $(".tabs__wrapper .tabs__tab").click(function() {
//   $(".tabs__wrapper .tabs__tab").removeClass("active").eq($(this).index()).addClass("active");
//   $(".tabs__item").hide().eq($(this).index()).fadeIn();
// }).eq(0).addClass("active");

// Табы (библиотека jQuery Ui)
$(function(){
  $('#tabs').tabs();
});

// Модальное окно
const header = document.querySelector('header');
const main = document.querySelector('main');
const footer = document.querySelector('footer');
const modalLogin = document.querySelector('.modal-login');
const modalShim = document.querySelector('.modal-shim');
const modalLoginOpenButton = document.querySelector('.login__button');
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

modalLoginOpenButton.addEventListener('click', () => {
  toggleClass();
  changeVisibilityModal('block');
  document.addEventListener('keydown', handleModalKeyDown)
});
modalShim.addEventListener('click', closeModal);
modalLoginCloseButton.addEventListener('click', closeModal);


// Слайдер
const slider = document.querySelector('.slider');
const slides = slider.querySelectorAll(".slider__slide");
const controllers = slider.querySelectorAll(".slider__controller");
const btnPrev = document.querySelector('.slider__button-prev');
const btnNext = document.querySelector('.slider__button-next');
let slideIndex = 1;

const showSlides = (n) => {
  if (n > slides.length - 1) {
    slideIndex = 0;
  }
  if (n < 0) {
    slideIndex = slides.length - 1;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (let i = 0; i < controllers.length; i++) {
    controllers[i].className = controllers[i].className.replace(" active-slide", "");
  }
  slides[slideIndex].style.display = "block";
  controllers[slideIndex].className += " active-slide";
};

showSlides(slideIndex);
btnPrev.addEventListener('click', () => showSlides(slideIndex -= 1));
btnNext.addEventListener('click', () => showSlides(slideIndex += 1));
for (let i = 0; i < controllers.length; i++) {
  controllers[i].addEventListener('click', () => showSlides(slideIndex = i));
};

// Слайдер для аналогов
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

// Кнопки меню 
const menuBtn = document.querySelector('.page-header__toggle');
const catalogBtn = document.querySelector('.main-menu__display-catalogs-toggle');
const catalog = document.querySelector('.mein-menu__link--catalog');

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
