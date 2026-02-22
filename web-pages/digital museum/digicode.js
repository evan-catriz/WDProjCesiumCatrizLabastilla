let slideIndex = 0;
const slides = document.querySelectorAll(".mySlides");
const dots = document.querySelectorAll(".dot");

function updateSlides() {
  slides.forEach(slide => {
    slide.classList.remove("active", "prevSlide", "nextSlide");
  });

  dots.forEach(dot => dot.classList.remove("active"));

  slides[slideIndex].classList.add("active");
  dots[slideIndex].classList.add("active");

  let prevIndex = (slideIndex - 1 + slides.length) % slides.length;
  let nextIndex = (slideIndex + 1) % slides.length;

  slides[prevIndex].classList.add("prevSlide");
  slides[nextIndex].classList.add("nextSlide");
}

function plusSlides(n) {
  slideIndex = (slideIndex + n + slides.length) % slides.length;
  updateSlides();
}

function currentSlide(n) {
  slideIndex = n - 1;   // because dots are 1-based
  updateSlides();
}

updateSlides();