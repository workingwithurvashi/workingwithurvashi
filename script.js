const finalText = 'workingwithurvashi';

// Characters used during the "computing" scramble phase
const glyphs = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const typedEl   = document.getElementById('typed');
const subtitleEl = document.querySelector('.subtitle');

let revealed = '';   // characters locked in so far
let scrambleFrame = 0;
const SCRAMBLE_FRAMES = 6; // how many frames each new char scrambles before locking

function randomGlyph() {
  return glyphs[Math.floor(Math.random() * glyphs.length)];
}

function scrambleTail(lockedCount) {
  // Show locked chars + 1 scrambling char at the current position
  const scramble = randomGlyph();
  typedEl.textContent = revealed + scramble;
}

function typeNext() {
  const nextIndex = revealed.length;
  if (nextIndex >= finalText.length) {
    // Fully typed — lock final text, hide cursor after a beat
    typedEl.textContent = finalText;
    subtitleEl.classList.add('visible');
    return;
  }

  // Scramble phase: flicker a random char for SCRAMBLE_FRAMES frames
  if (scrambleFrame < SCRAMBLE_FRAMES) {
    scrambleTail(nextIndex);
    scrambleFrame++;
    requestAnimationFrame(typeNext);
  } else {
    // Lock this character
    revealed += finalText[nextIndex];
    typedEl.textContent = revealed;
    scrambleFrame = 0;
    // Delay before next character (gives a rhythmic typing feel)
    const delay = 60 + Math.random() * 60;
    setTimeout(typeNext, delay);
  }
}

// Small initial pause before starting
setTimeout(typeNext, 700);
