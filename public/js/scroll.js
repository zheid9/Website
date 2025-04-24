// public/js/scroll.js

document.addEventListener("DOMContentLoaded", () => {
  const toObserve = [
    ...document.querySelectorAll(".section-container"),
    ...document.querySelectorAll(".project-card"),
  ];

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  toObserve.forEach((el) => observer.observe(el));
});
