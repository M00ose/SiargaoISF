const btn = document.getElementById("menu-btn");
const links = document.querySelectorAll(".mobile-only");
const overlay = document.getElementById("overlay");
const menu = document.getElementById("mobile-menu");
const faders = document.querySelectorAll(".fade-in");
const sliders = document.querySelectorAll(".slide-in");
const images = document.querySelectorAll("[data-src]");

btn.addEventListener("click", navToggle);
links.forEach((link) => link.addEventListener("click", navToggle));

function test() {
  images.forEach((image) => console.log(image.getAttribute("class")));
}

function navToggle() {
  btn.classList.toggle("open");
  overlay.classList.toggle("overlay-show");
  document.body.classList.toggle("stop-scrolling");
  menu.classList.toggle("show-menu");
}

function preloadImage(img) {
  const src = img.getAttribute("data-src");
  if (!src) {
    return;
  }

  img.src = src;
}

function imageLoader(entry, imgObserver) {
  preloadImage(entry);
  imgObserver.unobserve(entry);
}

const appearOptions = {
  threshold: 0,
  rootMargin: "0px  0px -100px 0px",
};

const imgOptions = {};

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

const imgObserver = new IntersectionObserver((entries, imgObserver) => {
  entries.forEach((entry) => {
    !entry.isIntersection ? imageLoader(entry.target, imgObserver) : false;
  });
}, imgOptions);

sliders.forEach((slider) => {
  console.log(slider.getAttribute("class"));
  appearOnScroll.observe(slider);
});

images.forEach((image) => {
  imgObserver.observe(image);
});
