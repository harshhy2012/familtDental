/* jshint esversion: 8 */
let lastScroll = 0;
window.addEventListener("scroll", () => {
  if (window.scrollY <= 0) {
    document.querySelector(".info-bar").classList.remove("hide");
    return;
  }
 
  if (window.scrollY > 0 ) {
    // down
    document.querySelector(".info-bar").classList.add("hide");
  } else  {
    // up
    document.querySelector(".info-bar").classList.remove("hide");
  }
});

// document.addEventListener("scroll", function(event) { 
//     if (document.body.scrollTop > 0) {
       
//     } else {
//         document.getElementByClassName("info-bar").classList.remove("hide");
//     }
// });
