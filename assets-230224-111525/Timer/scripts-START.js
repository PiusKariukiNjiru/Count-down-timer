let countdown; // to store the timer interval
const timerDisplay = document.querySelector('.display__time-left');
const endTimeDisplay = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('.timer__button');
const customForm = document.querySelector('#custom');

function timer(seconds) {
  // clear any existing timers
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop the timer
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    // display the time left
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  timerDisplay.textContent = display;
  document.title = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hours = end.getHours();
  const adjustedHours = hours > 12 ? hours - 12 : hours;
  const minutes = end.getMinutes();
  endTimeDisplay.textContent = `Be back at ${adjustedHours}:${minutes < 10 ? '0' : ''}${minutes} ${hours > 12 ? 'PM' : 'AM'}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const minutes = parseInt(this.minutes.value);
  if (isNaN(minutes)) return;
  timer(minutes * 60);
  this.reset();
});