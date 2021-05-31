"use strict";
// Табы
$(".tabs__wrapper .tabs__tab").click(function() {
  $(".tabs__wrapper .tabs__tab").removeClass("active").eq($(this).index()).addClass("active");
  $(".tabs__item").hide().eq($(this).index()).fadeIn();
}).eq(0).addClass("active");

// Модальное окно
const OPPENED_MODAL = 'modal-login-is-oppened';
const closeModal = () => {
  $('header, main, footer').removeClass(OPPENED_MODAL);
  $('.modal-login, .modal-shim').hide();
  $(document).off('keydown');
};

$('.login__button').click(() => {
  $('header, main, footer').addClass(OPPENED_MODAL);
  $('.modal-login, .modal-shim').show();
  $(document).on('keydown', (evt) => {
    if (evt.keyCode == 27)
    closeModal();
  });
});
$('.modal-login__close-button, .modal-shim').click(closeModal);

// Слайдер
const slider = document.querySelector('.slider');
const slides = slider.querySelectorAll(".slider__slide");
const controllers = slider.querySelectorAll(".slider__controller");
const btnPrev = $('.slider__button-prev');
const btnNext = $('.slider__button-next');
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
}

showSlides(slideIndex);
btnPrev.click(() => showSlides(slideIndex -= 1));
btnNext.click(() => showSlides(slideIndex += 1));
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
