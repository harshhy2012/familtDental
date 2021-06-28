$(document).ready(function () {

    $(window).scroll(function () {
        if ($(this).scrollTop() > 700) {
            $(".back-to-top-btn").removeClass("hide");
            $('.back-to-top-btn').fadeIn("fast");
        } else {
            $('.back-to-top-btn').fadeOut("fast");
        }
    });

    $('.back-to-top-btn').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 100);
        return false;
    });

});