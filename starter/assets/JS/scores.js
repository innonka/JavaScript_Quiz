var highscores = document.getElementById("highscores");
var clearBtn = document.getElementById("clear");

var keys = Object.keys(localStorage);
var li;
var length = keys.length;

keys.forEach(() => {
  li = document.createElement("li");
  console.log(keys[1]);
  li.innerText = `${keys[length - 1]} - ${localStorage.getItem(
    keys[length - 1]
  )}`;
  highscores.appendChild(li);
  length--;
});

clearBtn.addEventListener("click", () => {
  localStorage.clear();
  var child = highscores.lastElementChild;
  if (child) {
    highscores.removeChild(child);
    child = highscores.lastElementChild;
  }
});
