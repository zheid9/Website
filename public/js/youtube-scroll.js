document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".video-slide");
  const track = document.querySelector(".video-track");
  const carousel = document.querySelector(".video-carousel");

  let currentIndex = 0;

  function updateCarousel(newIndex) {
    if (newIndex === currentIndex && track.style.transform !== "") return;

    const previousSlide = slides[currentIndex];
    const previousIframe = previousSlide.querySelector("iframe");

    // Stop previous video
    // previousIframe.contentWindow.postMessage(
    //   '{"event":"command","func":"stopVideo","args":""}',
    //   "*"
    // );

    // Remove active class
    previousSlide.classList.remove("active");

    slides[newIndex].classList.add("active");
    currentIndex = newIndex;

    // Use bounding boxes for precise centering
    const activeSlide = slides[currentIndex];
    const trackRect = track.getBoundingClientRect();
    const carouselRect = carousel.getBoundingClientRect();
    const activeRect = activeSlide.getBoundingClientRect();

    const activeCenterInTrack = activeRect.left + activeRect.width / 2;
    const carouselCenter = carouselRect.left + carouselRect.width / 2;

    const offset = carouselCenter - activeCenterInTrack;
    const currentTransform = getTranslateX(track);

    track.style.transform = `translateX(${currentTransform + offset}px)`;

    // Play the new video
    const newIframe = slides[currentIndex].querySelector("iframe");
    newIframe.contentWindow.postMessage(
      '{"event":"command","func":"playVideo","args":""}',
      "*"
    );
  }

  function getTranslateX(element) {
    const style = window.getComputedStyle(element);
    const matrix = new DOMMatrixReadOnly(style.transform);
    return matrix.m41; // Current translateX value
  }

  slides.forEach((slide, index) => {
    slide.addEventListener("mouseenter", () => {
      updateCarousel(index);
    });
  });

  // ✅ Center first video properly on load
  window.addEventListener("load", () => {
    setTimeout(() => {
      updateCarousel(0);
    }, 0);
  });
});
