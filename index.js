document.addEventListener("DOMContentLoaded", () => {
  // Declaring my variables
  const map = document.querySelector(".map");
  const jumper = document.createElement("div");
  let isGameOver = false;
  let speed = 8;
  let velocity = 0;
  let platformCount = 5;
  let platforms = [];
  let score = 0;
  let jumperLeftSpace = 50;
  let startingPoint = 150;
  let jumperBottomSpace = startingPoint;
  const gravity = 0.9;
  let upTimerId;
  let downTimerId;
  let isJumping = true;
  let isGoingLeft = false;
  let isGoingRight = false;
  let leftTimerId;
  let rightTimerId;

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

  //Creating New Platforms
  function createPlatforms() {
    for (let i = 0; i < platformCount; i++) {
      let platGap = 600 / platformCount;
      let newPlatBottom = 100 + i * platGap;
      let newPlatform = new Platform(newPlatBottom);
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

        if (platform.bottom < 10) {
          let firstPlatform = platforms[0].visual;
          firstPlatform.classList.remove("platform");
          platforms.shift();
          console.log(platforms);
          score++;
          var newPlatform = new Platform(600);
          platforms.push(newPlatform);
        }
      });
    }
  }

  //Creating the Jumper Character
  function createJumper() {
    map.appendChild(jumper);
    jumper.classList.add("jumper");
    jumperLeftSpace = platforms[0].left;
    jumper.style.left = jumperLeftSpace + "px";
    jumper.style.bottom = jumperBottomSpace + "px";
  }

  function fall() {
    isJumping = false;
    clearInterval(upTimerId);
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
          startingPoint = jumperBottomSpace;
          jump();
          console.log("start", startingPoint);
          isJumping = true;
        }
      });
    }, 20);
  }

  //Allowing jumper to jump off each platform
  function jump() {
    clearInterval(downTimerId);
    isJumping = true;
    upTimerId = setInterval(function () {
      console.log(startingPoint);
      console.log("1", jumperBottomSpace);
      jumperBottomSpace += 20;
      jumper.style.bottom = jumperBottomSpace + "px";
      console.log("2", jumperBottomSpace);
      console.log("s", startingPoint);
      if (jumperBottomSpace > startingPoint + 200) {
        fall();
        isJumping = false;
      }
    }, 30);
  }

  //Assigning movement for Jumper
  function moveLeft() {
    if (isGoingRight) {
      clearInterval(rightTimerId);
      isGoingRight = false;
    }
    isGoingLeft = true;
    leftTimerId = setInterval(function () {
      if (jumperLeftSpace >= 0) {
        console.log("going left");
        jumperLeftSpace -= 5;
        jumper.style.left = jumperLeftSpace + "px";
      } else moveRight();
    }, 20);
  }

  function moveRight() {
    if (isGoingLeft) {
      clearInterval(leftTimerId);
      isGoingLeft = false;
    }
    isGoingRight = true;
    rightTimerId = setInterval(function () {
      if (jumperLeftSpace <= 625) {
        console.log("going right");
        jumperLeftSpace += 5;
        jumper.style.left = jumperLeftSpace + "px";
      } else moveLeft();
    }, 20);
  }

  function moveStraight() {
    isGoingLeft = false;
    isGoingRight = false;
    clearInterval(leftTimerId);
    clearInterval(rightTimerId);
  }

  //Assigning movement of the jumper to the key codes
  function control(e) {
    jumper.style.bottom = jumperBottomSpace + "px";
    if (e.key === "ArrowLeft") {
      moveLeft();
    } else if (e.key === "ArrowRight") {
      moveRight();
    } else if (e.key === "ArrowUp") {
      moveStraight();
    }
  }

  //Gameover function, showing final score
  function gameOver() {
    isGameOver = true;
    while (map.firstChild) {
      console.log("remove");
      map.removeChild(map.firstChild);
    }
    map.innerHTML = score;
    clearInterval(upTimerId);
    clearInterval(downTimerId);
    clearInterval(leftTimerId);
    clearInterval(rightTimerId);
  }

  //Restarting game
  function start() {
    if (isGameOver == false) {
      createPlatforms();
      createJumper();
      setInterval(movePlatforms, 30);
      jump(startingPoint);
      document.addEventListener("keyup", control);
    }
  }
  start();
});
