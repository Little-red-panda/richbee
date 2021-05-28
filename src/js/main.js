$(".tabs__wrapper .tabs__tab").click(function() {
  $(".tabs__wrapper .tabs__tab").removeClass("active").eq($(this).index()).addClass("active");
  $(".tabs__item").hide().eq($(this).index()).fadeIn()
}).eq(0).addClass("active");