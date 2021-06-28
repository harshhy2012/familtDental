$(document).ready(function () {

    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $(".upper-nav").addClass("hide");
        } else {
            $('.upper-nav').removeClass("hide");
        }
    });

});