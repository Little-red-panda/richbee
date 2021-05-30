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
const btnPrev = slider.querySelector('.slider__button-prev');
const btnNext = slider.querySelector('.slider__button-next');

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
btnPrev.addEventListener('click', () => showSlides(slideIndex -= 1));
btnNext.addEventListener('click', () => showSlides(slideIndex += 1));
for (let i = 0; i < controllers.length; i++) {
  controllers[i].addEventListener('click', () => showSlides(slideIndex = i));
}
