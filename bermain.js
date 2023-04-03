window.addEventListener("load", function () {
  const selected = document.getElementById("canvas4");
  const bUp = document.getElementById("up");
  const bLeft = document.getElementById("left");
  const bRight = document.getElementById("right");
  const bDown = document.getElementById("down");
  const feeds = document.getElementById("feed-button");
  const plays = document.getElementById("play-button");
  const sleeps = document.getElementById("sleep-button");
  const ctx4 = selected.getContext("2d");
  const CANVAS_WIDTH = (selected.width = 1920);
  const CANVAS_HEIGHT = (selected.height = 1080);
  const foods = ["Sources/dead-fish.png", "Sources/grass.png", "Sources/bone.png"];
  const foodImg = new Image();
  const ballImg = new Image();
  ballImg.src = "Sources/cricket.png";
  let scale,
    posX,
    posY,
    charwidth,
    charheight,
    x,
    y,
    count = 0,
    count2 = 0;

  const collisionsMap = [];
  for (let i = 0; i < collision.length; i += 60) {
    collisionsMap.push(collision.slice(i, 60 + i));
  }

  function updateData(value, keyName) {
    const newData = value;
    localStorage.setItem(keyName, newData);

    const storageEvent = new StorageEvent("storage", { key: keyName, newValue: newData });
    window.dispatchEvent(storageEvent);
  }

  const keys = {
    w: {
      pressed: false,
    },
    a: {
      pressed: false,
    },
    s: {
      pressed: false,
    },
    d: {
      pressed: false,
    },
    collided: false,
  };

  const buttons = {
    feed: {
      pressed: false,
    },
    play: {
      pressed: false,
    },
    sleep: {
      pressed: false,
    },
    health: {
      pressed: false,
    },
  };

  sleeps.addEventListener("click", () => {
    if (buttons.sleep.pressed) {
      buttons.sleep.pressed = false;
      sleeps.innerHTML = "sleep";
    } else {
      buttons.sleep.pressed = true;
      buttons.play.pressed = false;
      buttons.feed.pressed = false;
      sleeps.innerHTML = "unsleep";
      plays.innerHTML = "play";
      feeds.innerHTML = "feed";
    }
  });
  plays.addEventListener("click", () => {
    if (buttons.play.pressed) {
      buttons.play.pressed = false;
      plays.innerHTML = "play";
    } else {
      buttons.play.pressed = true;
      buttons.feed.pressed = false;
      buttons.sleep.pressed = false;
      plays.innerHTML = "unplay";
      feeds.innerHTML = "feed";
      sleeps.innerHTML = "sleep";
    }
  });
  feeds.addEventListener("click", () => {
    if (buttons.feed.pressed) {
      buttons.feed.pressed = false;
      feeds.innerHTML = "feed";
    } else {
      buttons.feed.pressed = true;
      buttons.play.pressed = false;
      buttons.sleep.pressed = false;
      feeds.innerHTML = "unfeed";
      plays.innerHTML = "play";
      sleeps.innerHTML = "sleep";
    }
  });

  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "w":
        keys.w.pressed = true;
        break;
      case "a":
        keys.a.pressed = true;
        break;
      case "s":
        keys.s.pressed = true;
        break;
      case "d":
        keys.d.pressed = true;
        break;
    }
  });

  window.addEventListener("keyup", (e) => {
    switch (e.key) {
      case "w":
        keys.w.pressed = false;
        break;
      case "a":
        keys.a.pressed = false;
        break;
      case "s":
        keys.s.pressed = false;
        break;
      case "d":
        keys.d.pressed = false;
        break;
    }
  });

  bUp.addEventListener("touchstart", () => {
    keys.w.pressed = true;
  });
  bUp.addEventListener("touchend", () => {
    keys.w.pressed = false;
  });
  bLeft.addEventListener("touchstart", () => {
    keys.a.pressed = true;
  });
  bLeft.addEventListener("touchend", () => {
    keys.a.pressed = false;
  });
  bRight.addEventListener("touchstart", () => {
    keys.d.pressed = true;
  });
  bRight.addEventListener("touchend", () => {
    keys.d.pressed = false;
  });
  bDown.addEventListener("touchstart", () => {
    keys.s.pressed = true;
  });
  bDown.addEventListener("touchend", () => {
    keys.s.pressed = false;
  });

  bUp.addEventListener("mousedown", () => {
    keys.w.pressed = true;
  });
  bUp.addEventListener("mouseup", () => {
    keys.w.pressed = false;
  });
  bLeft.addEventListener("mousedown", () => {
    keys.a.pressed = true;
  });
  bLeft.addEventListener("mouseup", () => {
    keys.a.pressed = false;
  });
  bRight.addEventListener("mousedown", () => {
    keys.d.pressed = true;
  });
  bRight.addEventListener("mouseup", () => {
    keys.d.pressed = false;
  });
  bDown.addEventListener("mousedown", () => {
    keys.s.pressed = true;
  });
  bDown.addEventListener("mouseup", () => {
    keys.s.pressed = false;
  });

  const attribute = {
    cat: {
      width: 141,
      height: 141,
      x: 820,
      y: 550,
      scale: -50, //-50 //-25 //0
      posX: 45,
      posY: 70,
    },
    goat: {
      width: 96,
      height: 96,
      x: 850,
      y: 550,
      scale: -30, //kecil -30 //-15 //0
      posX: 20,
      posY: 50,
    },
    dog: {
      width: 96,
      height: 96,
      x: 830,
      y: 550,
      scale: -10, // kecil -10 //5 //25
      posX: 33,
      posY: 70,
    },
  };

  const state = {
    idle: null,
    up: null,
    left: null,
    right: null,
    down: null,
    eat: null,
    sleep: null,
  };

  if (pets == "0") {
    state.idle = 5;
    state.up = 2;
    state.left = 3;
    state.right = 1;
    state.down = 0;
    state.sleep = 7;
    charwidth = attribute.cat.width;
    charheight = attribute.cat.height;
    x = attribute.cat.x;
    y = attribute.cat.y;
    scale = attribute.cat.scale;
    posX = attribute.cat.posX;
    posY = attribute.cat.posY;
    foodImg.src = foods[0];
  } else if (pets == "1") {
    state.idle = 4;
    state.up = 2;
    state.left = 1;
    state.right = 1;
    state.down = 0;
    state.sleep = 4;
    charwidth = attribute.goat.width;
    charheight = attribute.goat.height;
    x = attribute.goat.x;
    y = attribute.goat.y;
    scale = attribute.goat.scale;
    posX = attribute.goat.posX;
    posY = attribute.goat.posY;
    foodImg.src = foods[1];
  } else if (pets == "2") {
    state.idle = 4;
    state.up = 2;
    state.left = 3;
    state.right = 1;
    state.down = 0;
    state.sleep = 7;
    charwidth = attribute.dog.width;
    charheight = attribute.dog.height;
    x = attribute.dog.x;
    y = attribute.dog.y;
    scale = attribute.dog.scale;
    posX = attribute.dog.posX;
    posY = attribute.dog.posY;
    foodImg.src = foods[2];
  }

  class Pet {
    constructor(gamewidth, gameheight) {
      this.gamewidth = gamewidth;
      this.gameheight = gameheight;
      this.width = charwidth;
      this.height = charheight;
      this.widthS = 60;
      this.heightS = 60;
      this.x = x;
      this.y = y;
      this.rectX = this.x + posX;
      this.rectY = this.y + posY;
      this.image = new Image();
      this.image.src = characters[parseInt(pets)];
      this.frameX = 0;
      this.frameY = 0;
      this.maxFrame = 3;
      this.fps = 5;
      this.frameTimer = 0;
      this.frameInterval = 1000 / this.fps;
      this.frame = 0;
      this.level = 1;
      this.foodsEaten = 0;
      this.levelDisplay = document.getElementById("level");
      this.updateLevelDisplay();
    }
    updateLevelDisplay() {
      this.levelDisplay.textContent = "Level " + this.level;
    }
    draw(context) {
      context.fillStyle = "rgba(255, 0, 0, 0.0)";
      context.fillRect(this.rectX, this.rectY, this.widthS, this.heightS);
      if (keys.a.pressed && pets == "1") {
        context.save();
        context.translate(this.x + this.width, this.y);
        context.scale(-1, 1);
        context.drawImage(this.image, (this.frameX + 1) * this.width, this.frameY * this.height, -this.width, this.height, 0, 0, this.width + scale, this.height + scale);
        context.restore();
      } else {
        if (!keys.a.pressed && pets == "1") {
          context.setTransform(1, 0, 0, 1, 0, 0);
        }
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width + scale, this.height + scale);
      }
    }
    update(deltaTime) {
      //Animation
      if (this.frameTimer > this.frameInterval) {
        if (this.frameX >= this.maxFrame) this.frameX = 0;
        else this.frameX++;
        this.frameTimer = 0;
      } else {
        this.frameTimer += deltaTime;
      }

      //action
      if (keys.w.pressed && !buttons.sleep.pressed) {
        this.frameY = state.up;
        this.y -= 3;
        this.rectY -= 3;
      } else if (keys.a.pressed && !buttons.sleep.pressed) {
        this.frameY = state.left;
        this.x -= 3;
        this.rectX -= 3;
      } else if (keys.s.pressed && !buttons.sleep.pressed) {
        this.frameY = state.down;
        this.y += 3;
        this.rectY += 3;
      } else if (keys.d.pressed && !buttons.sleep.pressed) {
        this.frameY = state.right;
        this.x += 3;
        this.rectX += 3;
      } else {
        this.frameY = state.idle;
      }

      if (buttons.sleep.pressed) {
        this.frameY = state.sleep;
        if (count % 100 == 0) {
          updateData(true, "sleep");
          count++;
        } else {
          count++;
        }
        if (pets == "2" || pets == "0") {
          this.maxFrame = 1;
        } else {
          this.frameX = 2;
        }
      }
    }
    eatFood() {
      this.foodsEaten++;
      if (this.foodsEaten % 10 === 0) {
        this.level++;
        this.levelDisplay.textContent = this.level;
        this.updateLevelDisplay();
      }
      if (this.level == 2 && pets == "0" && count2 == 0) {
        scale += 25;
        count2++;
      } else if (this.level == 3 && pets == "0" && count2 == 1) {
        scale += 25;
        count2++;
      } else if (this.level == 2 && pets == "1" && count2 == 0) {
        scale += 15;
        count2++;
      } else if (this.level == 3 && pets == "1" && count2 == 1) {
        scale += 15;
        count2++;
      } else if (this.level == 2 && pets == "2" && count2 == 0) {
        scale += 15;
        count2++;
        console.log(scale);
      } else if (this.level == 3 && pets == "2" && count2 == 1) {
        scale += 20;
        console.log(scale);
        count2++;
      }
    }
  }

  class Food {
    constructor(gamewidth, gameheight) {
      this.gamewidth = gamewidth;
      this.gameheight = gameheight;
      this.width = 40;
      this.height = 40;
      this.image = new Image();
      this.image.src = foodImg.src;
      this.minX = Math.ceil(1000 / 5) * 5;
      this.maxX = Math.floor(1520 / 5) * 5;
      this.minY = Math.ceil(370 / 5) * 5;
      this.maxY = Math.floor(700 / 5) * 5;
      this.x = Math.floor(Math.random() * (this.maxX - this.minX + 1) + this.minX);
      this.y = Math.floor(Math.random() * (this.maxY - this.minY + 1) + this.minY);
    }
    draw(context) {
      if (buttons.feed.pressed) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
      }
      if (pet.x < this.x + 40 && pet.x + pet.width > this.x && pet.y < this.y + 40 && pet.y + pet.height > this.y) {
        this.x = Math.floor(Math.random() * (this.maxX - this.minX + 1) + this.minX);
        this.y = Math.floor(Math.random() * (this.maxY - this.minY + 1) + this.minY);
        updateData(true, "feed");
        pet.eatFood();
      }
    }
  }

  class Play {
    constructor(gamewidth, gameheight) {
      this.gamewidth = gamewidth;
      this.gameheight = gameheight;
      this.width = 30;
      this.height = 30;
      this.image = new Image();
      this.image.src = ballImg.src;
      this.minX = Math.ceil(1000 / 5) * 5;
      this.maxX = Math.floor(1520 / 5) * 5;
      this.minY = Math.ceil(370 / 5) * 5;
      this.maxY = Math.floor(700 / 5) * 5;
      this.x = Math.floor(Math.random() * (this.maxX - this.minX + 1) + this.minX);
      this.y = Math.floor(Math.random() * (this.maxY - this.minY + 1) + this.minY);
    }
    draw(context) {
      if (buttons.play.pressed) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
      }
      if (pet.x < this.x + 40 && pet.x + pet.width > this.x && pet.y < this.y + 40 && pet.y + pet.height > this.y) {
        this.x = Math.floor(Math.random() * (this.maxX - this.minX + 1) + this.minX);
        this.y = Math.floor(Math.random() * (this.maxY - this.minY + 1) + this.minY);
        updateData(true, "play");
      }
    }
  }

  class Boundary {
    static width = 32;
    static height = 28;
    constructor({ position }) {
      this.position = position;
      this.width = 12;
      this.height = 12;
    }
    draw(context) {
      context.fillStyle = "rgba(255, 0, 0, 0.0)";
      context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  }

  class Background {
    constructor(gamewidth, gameheight) {
      this.width = gamewidth;
      this.height = gameheight;
      this.image = new Image();
    }
    draw(context) {
      context.drawImage(this.image, 0, 0, this.width, this.height);
    }
    update(time) {
      if (time == "0") {
        this.image.src = back[0];
      } else if (time == "1") {
        this.image.src = back[1];
      }
    }
  }

  const boundaries = [];
  const background = new Background(CANVAS_WIDTH, CANVAS_HEIGHT);
  const pet = new Pet(CANVAS_WIDTH, CANVAS_HEIGHT);
  const food = new Food(CANVAS_WIDTH, CANVAS_HEIGHT);
  const playing = new Play(CANVAS_WIDTH, CANVAS_HEIGHT);
  let lastTime = 0;

  collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
      if (symbol === 1061 || symbol === 1108 || symbol === 521 || symbol === 1112 || symbol === 1077) {
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height,
            },
          })
        );
      }
    });
  });

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx4.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    background.update(time);
    background.draw(ctx4);
    boundaries.forEach((boundary) => {
      boundary.draw(ctx4);
    });

    pet.draw(ctx4);

    if (keys.w.pressed) {
      for (let i = 0; i < boundaries.length; i++) {
        if (
          pet.rectX + pet.widthS >= boundaries[i].position.x &&
          pet.rectX <= boundaries[i].position.x + boundaries[i].width &&
          pet.rectY <= boundaries[i].position.y + 5 + boundaries[i].height &&
          pet.rectY + pet.heightS >= boundaries[i].position.y + 5
        ) {
          pet.y += 5;
          pet.rectY += 5;
          break;
        }
      }
    }
    if (keys.a.pressed) {
      for (let i = 0; i < boundaries.length; i++) {
        if (
          pet.rectX + pet.widthS >= boundaries[i].position.x + 5 &&
          pet.rectX <= boundaries[i].position.x + 5 + boundaries[i].width &&
          pet.rectY <= boundaries[i].position.y + boundaries[i].height &&
          pet.rectY + pet.heightS >= boundaries[i].position.y
        ) {
          pet.x += 5;
          pet.rectX += 5;
          break;
        }
      }
    }
    if (keys.s.pressed) {
      for (let i = 0; i < boundaries.length; i++) {
        if (
          pet.rectX + pet.widthS >= boundaries[i].position.x &&
          pet.rectX <= boundaries[i].position.x + boundaries[i].width &&
          pet.rectY <= boundaries[i].position.y - 5 + boundaries[i].height &&
          pet.rectY + pet.heightS >= boundaries[i].position.y - 5
        ) {
          pet.y -= 5;
          pet.rectY -= 5;
          break;
        }
      }
    }
    if (keys.d.pressed) {
      for (let i = 0; i < boundaries.length; i++) {
        if (
          pet.rectX + pet.widthS >= boundaries[i].position.x - 5 &&
          pet.rectX <= boundaries[i].position.x - 5 + boundaries[i].width &&
          pet.rectY <= boundaries[i].position.y + boundaries[i].height &&
          pet.rectY + pet.heightS >= boundaries[i].position.y
        ) {
          pet.x -= 5;
          pet.rectX -= 5;
          break;
        }
      }
    }
    food.draw(ctx4);
    playing.draw(ctx4);
    pet.update(deltaTime);
    requestAnimationFrame(animate);
  }
  animate(0);
});
