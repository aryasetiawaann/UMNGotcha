const currentTimeElement = document.getElementById("clock");
const greeting = document.getElementById("greeting");
const wallpaper = document.getElementById("background");
function updateData(value, keyName) {
  const newData = value;
  localStorage.setItem(keyName, newData);

  const storageEvent = new StorageEvent("storage", { key: keyName, newValue: newData });
  window.dispatchEvent(storageEvent);
}

const updateTime = () => {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  const millis = currentTime.getMilliseconds();

  const totalMillis = ((hours * 60 + minutes) * 60 + seconds) * 1000 + millis;
  const fasterMillis = totalMillis * 300;
  const fasterTime = new Date(fasterMillis);

  const formattedTime =
    (fasterTime.getHours() < 10 ? "0" + fasterTime.getHours() : fasterTime.getHours()) + ":" + (fasterTime.getMinutes() < 10 ? "0" + fasterTime.getMinutes() : fasterTime.getMinutes());

  currentTimeElement.innerHTML = formattedTime;

  if (fasterTime.getHours() >= 6 && fasterTime.getHours() < 18) {
    updateData(0, "time");
    wallpaper.style.backgroundImage = "url('Sources/mapSiang.png')";
  } else if (fasterTime.getHours() >= 18 || fasterTime.getHours() < 5) {
    updateData(1, "time");
    wallpaper.style.backgroundImage = "url('Sources/mapMalam.png')";
  }

  if (fasterTime.getHours() >= 0 && fasterTime.getHours() <= 11) {
    greeting.firstChild.innerHTML = "Good Morning, " + petName;
  } else if (fasterTime.getHours() >= 12 && fasterTime.getHours() <= 16) {
    greeting.firstChild.innerHTML = "Good Afternoon, " + petName;
  } else if (fasterTime.getHours() >= 17 && fasterTime.getHours() <= 19) {
    greeting.firstChild.innerHTML = "Good Evening, " + petName;
  } else if (fasterTime.getHours() >= 20 && fasterTime.getHours() <= 24) {
    greeting.firstChild.innerHTML = "Good Night, " + petName;
  }

  if (feeding) {
    feed();
    updateData(false, "feed");
    feeding = false;
  }
  if (playing) {
    plays();
    updateData(false, "play");
    playing = false;
  }
  if (sleeping) {
    sleeps();
    updateData(false, "sleep");
    sleeping = false;
  }
};

setInterval(updateTime, 100);

var health = 100;
var hunger = 100;
var play = 100;
var sleep = 100;

var hungerProgress = document.getElementsByClassName("hunger-progress");
var playProgress = document.getElementsByClassName("play-progress");
var sleepProgress = document.getElementsByClassName("sleep-progress");
var healthProgress = document.getElementsByClassName("health-progress");

const healButton = document.getElementById("heal-button");
const sleepButton = document.getElementById("sleep-button");
const playButton = document.getElementById("play-button");
const feedButton = document.getElementById("feed-button");

let alertShown = false;
setInterval(function () {
  if (health <= 50 && !alertShown) {
    alert("Your Health is less than 50%!, HEALL!!");
    alertShown = true;
  }
  if (hunger < 40 || sleep < 40 || play < 40) {
    health -= 5;
  }
  hunger -= 0.05;
  sleep -= 0.05;
  play -= 0.05;

  for (var i = 0; i < healthProgress.length; i++) {
    healthProgress[i].style.width = health + "%";
  }
  for (var i = 0; i < hungerProgress.length; i++) {
    hungerProgress[i].style.width = hunger + "%";
  }
  for (var i = 0; i < sleepProgress.length; i++) {
    sleepProgress[i].style.width = sleep + "%";
  }
  for (var i = 0; i < playProgress.length; i++) {
    playProgress[i].style.width = play + "%";
  }
  if (health <= 0) {
    window.location.href = "gameOver.html";
  }
}, 1000);

setInterval(function () {
  hunger -= 0.5;
  for (var i = 0; i < hungerProgress.length; i++) {
    hungerProgress[i].style.width = hunger + "%";
  }
}, 3000); // decrease hunger every second

setInterval(function () {
  sleep -= 0.3;
  for (var i = 0; i < sleepProgress.length; i++) {
    sleepProgress[i].style.width = sleep + "%";
  }
}, 3000); // decrease sleep every 0.75 seconds

setInterval(function () {
  play -= 0.7;
  for (var i = 0; i < playProgress.length; i++) {
    playProgress[i].style.width = play + "%";
  }
}, 3000); // decrease play every 1.25 seconds

function heal() {
  health += 20;
  if (health > 100) {
    health = 100;
  }
}

function feed() {
  hunger += 10;
  if (hunger > 100) {
    hunger = 100;
  }
}

function sleeps() {
  sleep += 5;
  if (sleep > 100) {
    sleep = 100;
  }
}

function plays() {
  play += 10;
  if (play > 100) {
    play = 100;
  }
}

healButton.addEventListener("click", heal);

// INI BUAT SISTEM NGESAVE NILAI BARNYA
function saveGame() {
  var gameSave = {
    health: health,
    hunger: hunger,
    play: play,
    sleep: sleep,
  };
  localStorage.setItem("gameSave", JSON.stringify(gameSave));
}

window.onload = function () {
  loadGame();
  updateMoneyPerSec();
  document.getElementById("heath").innerHTML = health;
  document.getElementById("sleep").innerHTML = sleep;
  document.getElementById("play").innerHTML = play;
  document.getElementById("hunger").innerHTML = hunger;
};

var savedGame;

function loadGame() {
  savedGame = JSON.parse(localStorage.getItem("gameSave"));
  if (typeof savedGame.health !== "undefined") health = savedGame.health;
  if (typeof savedGame.hunger !== "undefined") hunger = savedGame.hunger;
  if (typeof savedGame.play !== "undefined") play = savedGame.play;
  if (typeof savedGame.sleep !== "undefined") sleep = savedGame.sleep;
}

document.addEventListener("keydown", function (event) {
  if (event.ctrlKey && event.which == 83) {
    event.preventDefault();
    saveGame();
  }
});
