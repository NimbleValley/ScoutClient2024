let touchstartX = 0;
let touchendX = 0;

let swipeThresh = 0.33;
    
function checkDirection() {
  if (onSection < 4 && window.innerWidth < window.innerHeight && touchendX < touchstartX && Math.abs(Math.abs(touchendX-touchstartX) / window.innerWidth) > swipeThresh) {
    // Swipe left
    switchSection(onSection, onSection+1);
  }
  if (onSection < 5 && window.innerWidth < window.innerHeight && touchendX > touchstartX && Math.abs(Math.abs(touchendX-touchstartX) / window.innerWidth) > swipeThresh) {
    // Swipe right
    switchSection(onSection, onSection-1);
  }
}

document.addEventListener('touchstart', e => {
  touchstartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
  touchendX = e.changedTouches[0].screenX;
  checkDirection();
});