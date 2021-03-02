let countdown; //set a global interval
const timeLeft = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('.timer__button');

function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now(); //get the time now (in milliseconds)
  const then = now + seconds * 1000; //get the end time by adding seconds to now, multiply by 1000 to get seconds

  displayTimeLeft(seconds);
  displayEndTime(then);
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000); //round up to the nearest second
    //stop if @ 0 seconds!
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000); //run a setInterval to run every seconds to countdown
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const display = `${minutes}:${
    remainingSeconds < 10 ? 0 : ''
  }${remainingSeconds}`; //display time left in the display
  timeLeft.textContent = display;
  document.title = display;
}

function displayEndTime(time) {
  const end = new Date(time);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Be back at ${hour > 12 ? hour - 12 : hour}:${
    minutes < 10 ? 0 : ''
  }${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}
//event listeners
buttons.forEach((button) => {
  button.addEventListener('click', startTimer);
});
//you can use . operator if an element has a name attribute
document.customForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});
