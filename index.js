document.addEventListener("DOMContentLoaded", () => {
  const map = document.querySelector(".map");
  const jumper = document.createElement("div");
  let jumperLeftSpace = 50;
  let jumperBottomSpace = 150;
  let isGameOver = false;
  let platformCount = 5;

  function createJumper() {
    map.appendChild(jumper);
    jumper.classList.add("jumper");
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

  function start() {
    if (isGameOver == false) {
      createJumper();
      createPlatforms();
    }
  }
  start();
});
