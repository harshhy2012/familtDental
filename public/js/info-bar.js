document.addEventListener("DOMContentLoaded", function(event) { 
    window.scroll(function () {
        if (this.scrollTop() > 0) {
            document.getElementByClassName("info-bar").classList.add("hide");
        } else {
            document.getElementByClassName("info-bar").classList.remove("hide");
        }
    });
});
