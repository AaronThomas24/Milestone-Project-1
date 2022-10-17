document.addEventListener("DOMContentLoaded", () => {
  const map = document.querySelector(".map");
  const jumper = document.createElement("div");
  let jumperLeftSpace = 50;
  let jumperBottomSpace = 250;
  let isGameOver = false;
  let platformCount = 5;
  let platforms = [];
  let upTimerId;
  let downTimerId;
  let isJumping = true;

  function createJumper() {
    map.appendChild(jumper);
    jumper.classList.add("jumper");
    jumperLeftSpace = platforms[0].left;
    jumper.style.left = jumperLeftSpace + "px";
    jumper.style.bottom = jumperBottomSpace + "px";
  }

  class Platform {
    constructor(newPlatformBottom) {
      this.left = Math.random() * 315;
      this.bottom = newPlatformBottom;
      this.visual = document.createElement("div");

      const visual = this.visual;
      visual.classList.add("platform");
      visual.style.left = this.left + "px";
      visual.style.bottom = this.bottom + "px";
      map.appendChild(visual);
    }
  }
  function createPlatforms() {
    for (let i = 0; i < platformCount; i++) {
      let platformSpace = 600 / platformCount;
      let newPlatformBottom = 100 + i * platformSpace;
      let newPlatform = new Platform(newPlatformBottom);
      platforms.push(newPlatform);
      console.log(platforms);
    }
  }

  function movePlatforms() {
    if (jumperBottomSpace > 200) {
      platforms.forEach((platform) => {
        platform.bottom -= 4;
        let visual = platform.visual;
        visual.style.bottom = platform.bottom + "px";
      });
    }
  }

  function jump() {
    clearInterval(downTimerId);
    isJumping = true;
    upTimerId = setInterval(function () {
      jumperBottomSpace += 20;
      jumper.style.bottom = jumperBottomSpace + "px";
      if (jumperBottomSpace > 350) {
        fall();
      }
    }, 30);
  }

  function fall() {
    clearInterval(upTimerId);
    isJumping = false;
    downTimerId = setInterval(function () {
      jumperBottomSpace -= 5;
      jumper.style.bottom = jumperBottomSpace + "px";
      if (jumperBottomSpace <= 0) {
        gameOver();
      }
      platforms.forEach((platform) => {
        if (
          jumperBottomSpace >= platform.bottom &&
          jumperBottomSpace <= platform.bottom + 15 &&
          jumperLeftSpace + 60 >= platform.left &&
          jumperLeftSpace <= platform.left + 85 &&
          !isJumping
        ) {
          console.log("landed");
          jump();
        }
      });
    }, 30);
  }

  function gameOver() {
    console.log("game over");
    isGameOver = true;
    clearInterval(upTimerId);
    clearInterval(downTimerId);
  }

  function control(e) {
    if (e.key === "ArrowLeft") {
      // Move Jumper Left
    } else if (e.key === "ArrowRight") {
      //Move Jumper Right
    } else if (e.key === "ArrowUp") {
      //moveStraight
    }
  }

  function start() {
    if (isGameOver == false) {
      createPlatforms();
      createJumper();
      setInterval(movePlatforms, 30);
      jump();
    }
  }
  start();
});
