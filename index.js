document.addEventListener("DOMContentLoaded", () => {
  // Declaring my variables
  const map = document.querySelector(".map");
  const jumper = document.createElement("div");
  let isGameOver = false;
  let speed = 8;
  let velocity = 0;
  let tileCount = 5;
  let tiles = [];
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

  class Tile {
    constructor(newTileBottom) {
      this.left = Math.random() * 315;
      this.bottom = newTileBottom;
      this.visual = document.createElement("div");

      const visual = this.visual;
      visual.classList.add("tile");
      visual.style.left = this.left + "px";
      visual.style.bottom = this.bottom + "px";
      map.appendChild(visual);
    }
  }

  //Creating New Tiles
  function createTiles() {
    for (let i = 0; i < tileCount; i++) {
      let tileGap = 600 / tileCount;
      let newTileBottom = 100 + i * tileGap;
      let newTile = new Tile(newTileBottom);
      tiles.push(newTile);
      console.log(tiles);
    }
  }

  function moveTiles() {
    if (jumperBottomSpace > 200) {
      tiles.forEach((tile) => {
        tile.bottom -= 4;
        let visual = tile.visual;
        visual.style.bottom = tile.bottom + "px";

        if (tile.bottom < 10) {
          let firstTile = tiles[0].visual;
          firstTile.classList.remove("tile");
          tiles.shift();
          console.log(tiles);
          score++;
          var newTile = new Tile(600);
          tiles.push(newTile);
        }
      });
    }
  }

  //Creating the Jumper Character
  function createJumper() {
    map.appendChild(jumper);
    jumper.classList.add("jumper");
    jumperLeftSpace = tiles[0].left;
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
      tiles.forEach((tile) => {
        if (
          jumperBottomSpace >= tile.bottom &&
          jumperBottomSpace <= tile.bottom + 15 &&
          jumperLeftSpace + 60 >= tile.left &&
          jumperLeftSpace <= tile.left + 85 &&
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

  //Allowing jumper to jump off each tile
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
      createTiles();
      createJumper();
      setInterval(moveTiles, 30);
      jump(startingPoint);
      document.addEventListener("keyup", control);
    }
  }
  start();
});
