//BAGIAN MENU CHARACTER
const cat = document.getElementById("canvas1");
const goat = document.getElementById("canvas2");
const dog = document.getElementById("canvas3");
const arrowL = document.getElementById("left-arrow");
const arrowR = document.getElementById("right-arrow");

const ctx1 = cat.getContext("2d");
const ctx2 = goat.getContext("2d");
const ctx3 = dog.getContext("2d");

const CatImg = new Image();
CatImg.src = characters[0];
const GoatImg = new Image();
GoatImg.src = characters[1];
const DogImg = new Image();
DogImg.src = characters[2];

const CAT_WIDTH = (cat.width = 150);
const CAT_HEIGHT = (cat.height = 150);
const GOAT_WIDTH = (goat.width = 150);
const GOAT_HEIGHT = (goat.height = 150);
const DOG_WIDTH = (dog.width = 120);
const DOG_HEIGHT = (dog.height = 120);

const goatwidth = 96;
const goatheight = 96;
const dogwidth = 96;
const dogheight = 96;
const catwidth = 141;
const catheight = 141;
let cframeX = 0;
let cframeY = 5;
let gframeX = 0;
let gframeY = 4;
let dframeX = 0;
let dframeY = 4;
let gameFrame = 0;

function animateCat() {
  ctx1.clearRect(0, 0, CAT_WIDTH, CAT_HEIGHT);
  ctx1.drawImage(CatImg, cframeX * catwidth, cframeY * catheight, catwidth, catheight, 5, -5, catwidth, catheight);
  if (gameFrame % 25 == 0) {
    if (cframeX < 3) cframeX++;
    else cframeX = 0;
  }
  gameFrame++;
  requestAnimationFrame(animateCat);
}

function animateGoat() {
  ctx2.clearRect(0, 0, GOAT_WIDTH, GOAT_HEIGHT);
  ctx2.drawImage(GoatImg, gframeX * goatwidth, gframeY * goatheight, goatwidth, goatheight, 25, 40, goatwidth, goatheight);
  if (gameFrame % 25 == 0) {
    if (gframeX < 3) gframeX++;
    else gframeX = 0;
  }

  gameFrame++;
  requestAnimationFrame(animateGoat);
}

function animateDog() {
  ctx3.clearRect(0, 0, DOG_WIDTH, DOG_HEIGHT);
  ctx3.drawImage(DogImg, dframeX * dogwidth, dframeY * dogheight, dogwidth, dogheight, 10, 15, dogwidth, dogheight);
  if (gameFrame % 25 == 0) {
    if (dframeX < 3) dframeX++;
    else dframeX = 0;
  }

  gameFrame++;
  requestAnimationFrame(animateDog);
}

animateCat();
animateGoat();
animateDog();

const catCard = document.getElementById("catCard");
const goatCard = document.getElementById("goatCard");
const dogCard = document.getElementById("dogCard");
const catButton = document.getElementById("cat");
const goatButton = document.getElementById("goat");
const dogButton = document.getElementById("dog");
const start = document.getElementById("startMenu");
const charName = document.getElementById("characterName");
let input = -1;
let level = 1;

catButton.addEventListener("click", function () {
  input = 0;
  goatCard.style.backgroundColor = "#8e6151";
  catCard.style.backgroundColor = "#3C787E";
  dogCard.style.backgroundColor = "#8e6151";
});
goatButton.addEventListener("click", function () {
  input = 1;
  goatCard.style.backgroundColor = "#3C787E";
  catCard.style.backgroundColor = "#8e6151";
  dogCard.style.backgroundColor = "#8e6151";
});
dogButton.addEventListener("click", function () {
  input = 2;
  goatCard.style.backgroundColor = "#8e6151";
  catCard.style.backgroundColor = "#8e6151";
  dogCard.style.backgroundColor = "#3C787E";
});

function updateData(value, keyName) {
  const newData = value;
  localStorage.setItem(keyName, newData);

  const storageEvent = new StorageEvent("storage", { key: keyName, newValue: newData });
  window.dispatchEvent(storageEvent);
}

start.addEventListener("click", function () {
  if (input != -1 && charName.value != "") {
    updateData(charName.value, "petName");
    updateData(input, "pet");
    updateData(level, "levels");
    window.location = "start.html";
  } else if (input == -1 && charName.value != "") {
    alert("Please choose your pet");
  } else if (input != -1 && charName.value == "") {
    alert("Please enter your pet name");
  } else {
    alert("Please choose your pet and enter your pet name");
  }
});

// AKHIR BAGIAN MENU CHARACTER
