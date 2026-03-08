const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const closeBtn = document.querySelector(".menu-close");

hamburger.addEventListener("click", () => {
  navMenu.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  navMenu.classList.remove("active");
});