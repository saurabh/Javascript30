const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.full__screen');

// Player functions
function togglePlay() {
  video.paused ? video.play() : video.pause();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚❚';
  toggle.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  handleProgress();
}

function toggleSize() {
  if (video.requestFullscreen) {
    video.requestFullscreen()
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) { 
    video.msRequestFullscreen();
  }
}

// pause/play
document.addEventListener('keyup', e => { if (e.keyCode === 32) togglePlay() });
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
// update button
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
// skip buttons
skipButtons.forEach(button => button.addEventListener('click', skip));
document.addEventListener('keyup', e => { 
  if (e.keyCode === 37) {
    video.currentTime += -10
  } else if (e.keyCode === 39) {
    video.currentTime += 25
  }
});
// volume & speed sliders
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
document.addEventListener('keyup', e => { // Code does not move the slider 
  console.log(video.volume)
  if (e.keyCode === 38) {
    video.volume += .05
  } else if (e.keyCode === 40) {
    video.volume += -.05
  }
});
// player progress bar
video.addEventListener('timeupdate', handleProgress);
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
// full screen
fullscreen.addEventListener('click', toggleSize);
