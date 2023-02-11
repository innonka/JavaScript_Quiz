document.addEventListener("DOMContentLoaded", function() {
  const highscoresList = document.getElementById("highscores");
  const clearBtn = document.getElementById("clear");

  const keys = Object.keys(localStorage);
  for (let i = keys.length - 1; i >= 0; i--) {
    const key = keys[i];
    const score = localStorage.getItem(key);

    const li = document.createElement("li");
    li.innerText = `${key} - ${score}`;
    highscoresList.appendChild(li);
  }

  clearBtn.addEventListener("click", () => {
    localStorage.clear();
    while (highscoresList.firstChild) {
      highscoresList.removeChild(highscoresList.firstChild);
    }
  });
});
