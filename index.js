document.addEventListener("DOMContentLoaded", () => {
  const map = document.querySelector(".map");
  const jumper = document.createElement("div");

  function createJumper() {
    map.appendChild(jumper);
    jumper.classList.add("jumper");
  }
  createJumper();
});
