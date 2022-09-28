const btn = document.getElementById("menu-btn");
const links = document.querySelectorAll(".mobile-only");
const overlay = document.getElementById("overlay");
const menu = document.getElementById("mobile-menu");
const faders = document.querySelectorAll(".fade-in");

btn.addEventListener("click", navToggle);
links.forEach((link) => link.addEventListener("click", navToggle));

function navToggle() {
  btn.classList.toggle("open");
  overlay.classList.toggle("overlay-show");
  document.body.classList.toggle("stop-scrolling");
  menu.classList.toggle("show-menu");
}

const appearOptions = {
  threshold: 1,
  rootMargin: "0px 0px -50px 0px",
};
const appearOnScroll = new IntersectionObserver(function (
  entries,
  appearOnScroll
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("appear");
      appearOnScroll.unobserve(entry.target);
    }
  });
},
appearOptions);

faders.forEach((fader) => {
  appearOnScroll.observe(fader);
});
