$(document).ready(function () {

    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $(".info-bar").addClass("hide");
        } else {
            $('.info-bar').removeClass("hide");
        }
    });

});