document.addEventListener("DOMContentLoaded", () => {
  const nameElement = document.getElementById("name");
  const originalText = nameElement.textContent;
  const characters = "☟↡★⍒♝♧☂❄☯☢$!%*()&^";
  let interval = null;

  // Generate a random set of unique characters
  function getUniqueRandomChars(length) {
    const charArray = characters.split("");
    let shuffled = [];

    while (shuffled.length < length) {
      const randomChar =
        charArray[Math.floor(Math.random() * charArray.length)];
      if (!shuffled.includes(randomChar)) {
        shuffled.push(randomChar);
      }
    }
    return shuffled;
  }

  // Start with unique random characters
  let currentText = getUniqueRandomChars(originalText.length);
  nameElement.textContent = currentText.join("");

  // Progressive reveal on load
  function revealOriginal() {
    let iteration = 0;
    clearInterval(interval);

    interval = setInterval(() => {
      if (iteration >= originalText.length) {
        clearInterval(interval);
        nameElement.textContent = originalText;
        return;
      }

      currentText[iteration] = originalText[iteration];
      nameElement.textContent = currentText.join("");

      iteration++;
    }, 100); // Speed of reveal
  }

  revealOriginal();
});
