//capture elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

//functions

//play/pause video
function togglePlay() {
  video.paused ? video.play() : video.pause();
}

//toggle buttons from play to pause
function handleToggle() {
  const button = this.paused ? '►' : '❚ ❚';
  toggle.textContent = button;
}

//skip buttons
function handleSkip() {
  console.log(video.currentTime);
  video.currentTime += parseFloat(this.dataset.skip);
}

//change volume and speed
function handleRange() {
  video[this.name] = this.value;
}

//fill the progress bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

//scrub the video to where you click
function handleScrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  console.log(mouseDown);
}

let mouseDown = false;
//toggle mouseDown variable
function toggleMouse() {
  mouseDown != mouseDown;
}

//hook up event listeners
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

video.addEventListener('play', handleToggle);
video.addEventListener('pause', handleToggle);

video.addEventListener('timeupdate', handleProgress);

skipButtons.forEach((skip) => {
  skip.addEventListener('click', handleSkip);
});

progress.addEventListener('click', handleScrub);
progress.addEventListener('mousemove', (e) => mouseDown && handleScrub(e));
progress.addEventListener('mousedown', () => {
  mouseDown = true;
});
progress.addEventListener('mouseup', () => {
  mouseDown = false;
});

ranges.forEach((range) => {
  range.addEventListener('change', handleRange);
});

ranges.forEach((range) => {
  range.addEventListener('mousemove', handleRange);
});
