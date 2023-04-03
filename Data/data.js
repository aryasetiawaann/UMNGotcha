const characters = ["Sources/Cat.png", "Sources/Goat.png", "Sources/Dog.png"];
const back = ["Sources/mapSiang.png", "Sources/mapMalam.png"];
let petName = localStorage.getItem("petName");
let pets = localStorage.getItem("pet");
let time,
  feeding = false,
  playing = false,
  sleeping = false;
window.addEventListener("storage", function (event) {
  if (event.key === "time") {
    time = localStorage.getItem("time");
  }
  if (event.key === "feed") {
    feeding = localStorage.getItem("feed");
  }
  if (event.key === "play") {
    playing = this.localStorage.getItem("play");
  }
  if (event.key === "sleep") {
    sleeping = this.localStorage.getItem("sleep");
  }
});
