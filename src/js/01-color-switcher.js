const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

stopBtn.disabled = true

let timerId = null;

startBtn.addEventListener("click", () => {
    startBtn.disabled = true;
    stopBtn.disabled = false;
  timerId = setInterval(() => {
    document.body.style.background = getRandomHexColor();
  }, 1000);
});

stopBtn.addEventListener("click", () => {
    clearInterval(timerId);
    
    startBtn.disabled = false;
    stopBtn.disabled = true;
});