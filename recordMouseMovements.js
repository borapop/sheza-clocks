const win = document.querySelector(".window");
const startBtn = document.getElementById("start");
const logBtn = document.getElementById("log");

let frames = [];
let recording = false;
let startY = 0;
let startTime = 0;

startBtn.onclick = () => {
  recording = true;
  frames = [];
  startTime = Date.now();
  startY = null;
  let lastRecord = Date.now();

  function move(e) {
    if (!recording) return;
    if (startY === null) startY = e.clientY;

    const deltaY = startY - e.clientY;
    const angle = Math.min(Math.max(-deltaY, 0), 90);

    const time = Date.now() - startTime;

    if (Date.now() - lastRecord > 100) {
      lastRecord = Date.now();
      frames.push({ time, angle });
    }

    const clock = document.querySelector(".clock");
    clock.style.transform = `perspective(750px)  rotateX(${angle}deg)`;
  }

  function up() {
    recording = false;
    logFrames();
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
  }

  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
};

const logFrames = () => {
  if (!frames.length) return;
  const duration = frames[frames.length - 1].time;
  const normalized = frames.map((f) => ({
    percentTime: ((f.time / duration) * 100).toFixed(2),
    percentOpen: f.angle.toFixed(2),
  }));
  console.log(normalized);
};
