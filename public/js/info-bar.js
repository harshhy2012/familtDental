/* jshint esversion: 8 */
document.addEventListener("scroll", function(event) { 
    if (document.body.scrollTop > 0) {
        document.getElementByClassName("info-bar").classList.add("hide");
    } else {
        document.getElementByClassName("info-bar").classList.remove("hide");
    }
});
