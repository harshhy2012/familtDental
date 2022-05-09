/* jshint esversion: 8 */


console.log(window.scrollY);
const goToTopBtn = document.querySelector(".back-to-top-btn");
window.addEventListener("scroll", () => {
    console.log(window.scrollY);
    if (window.scrollY > 700) {
        goToTopBtn.classList.remove("hide");
    } else {
        goToTopBtn.classList.add("hide");
    }
});
goToTopBtn.addEventListener('click',() => {
    window.scrollTo({   
    top: 0,
    behavior: "smooth"
  });
});