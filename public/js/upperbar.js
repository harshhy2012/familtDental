document.ready(function () {

    window.scroll(function () {
        if (this.scrollTop() > 0) {
            document.getElementByClassName("upper-nav").classList.add("hide");
        } else {
            document.getElementByClassName("upper-nav").classList.remove("hide");
        }
    });

});