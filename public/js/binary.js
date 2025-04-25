document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".binary-background");

  function updateBinaryHeight() {
    const fullHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );

    container.style.height = `${fullHeight}px`;

    const totalNeeded =
      Math.floor(window.innerWidth / 20) * Math.floor(fullHeight / 20);

    const currentBits = container.children.length;

    // Only add new bits if needed
    for (let i = currentBits; i < totalNeeded; i++) {
      const bit = document.createElement("span");
      const isOne = Math.random() > 0.5;

      bit.textContent = isOne ? "1" : "0";
      bit.classList.add(isOne ? "one" : "zero");

      bit.addEventListener("mouseenter", () => {
        if (bit.textContent === "0") {
          bit.textContent = "1";
          bit.classList.remove("zero");
          bit.classList.add("one");
        } else {
          bit.textContent = "0";
          bit.classList.remove("one");
          bit.classList.add("zero");
        }

        // Spark effect
        const spark = document.createElement("div");
        spark.classList.add("spark");

        const sparkColors = ["#FFA500", "#FF3C00", "#FFD700"];
        const randomColor =
          sparkColors[Math.floor(Math.random() * sparkColors.length)];
        spark.style.background = randomColor;

        const rect = bit.getBoundingClientRect();
        const scrollX = window.scrollX || window.pageXOffset;
        const scrollY = window.scrollY || window.pageYOffset;

        const centerX = rect.left + rect.width / 2 + scrollX;
        const centerY = rect.top + rect.height / 2 + scrollY;

        spark.style.left = `${centerX}px`;
        spark.style.top = `${centerY}px`;

        document.body.appendChild(spark);

        setTimeout(() => {
          document.body.removeChild(spark);
        }, 300);
      });

      container.appendChild(bit);
    }
  }

  updateBinaryHeight();

  window.addEventListener("resize", updateBinaryHeight);
  window.addEventListener("scroll", updateBinaryHeight);
});
