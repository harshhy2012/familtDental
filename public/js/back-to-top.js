/* eslint jsversion: 8*/
window.scroll(function () {
    if (this.scrollTop() > 700) {
        document.getElementByClassName("back-to-top-btn").classList.remove("hide");
        document.getElementByClassName("back-to-top-btn").fadeIn("fast");
    } else {
        document.getElementByClassName("back-to-top-btn").fadeOut("fast");
    }
});
const goToTopBtn = document.querySelector(".back-to-top-btn");

goToTopBtn.addEventListener('click',() => {
    window.scrollTo({   
    top: 0,
    behavior: "smooth"
  });
});