// Табы
$(".tabs__wrapper .tabs__tab").click(function() {
  $(".tabs__wrapper .tabs__tab").removeClass("active").eq($(this).index()).addClass("active");
  $(".tabs__item").hide().eq($(this).index()).fadeIn()
}).eq(0).addClass("active");


// Модальное окно
const OPPENED_MODAL = 'modal-login-is-oppened';
const closeModal = () => {
  $('header, main, footer').removeClass(OPPENED_MODAL);
  $('.modal-login, .modal-shim').hide();
  $(document).off('keydown')
}

$('.login__button').click(() => {
  $('header, main, footer').addClass(OPPENED_MODAL);
  $('.modal-login, .modal-shim').show();
  $(document).on('keydown', (evt) => {
    if (evt.keyCode == 27)
    closeModal()
  });
})
$('.modal-login__close-button, .modal-shim').click(closeModal)

