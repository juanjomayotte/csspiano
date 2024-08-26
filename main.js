const keys = document.querySelectorAll('.key');
const octaveIndicator = document.getElementById('octave-indicator');

let currentOctave = 4;

const baseKeyToNoteMap = {
    'a' : 'C',
    'w' : 'Db',
    's' : 'D',
    'e' : 'Eb',
    'd' : 'E',
    'f' : 'F',
    't' : 'Gb',
    'g' : 'G',
    'y' : 'Ab',
    'h' : 'A',
    'u' : 'Bb',
    'j' : 'B'
}

function playSound(note) {
  
  const audio = new Audio(`./sounds/${note}.mp3`);
  audio.currentTime = 0; 
  audio.play();
}

function getNoteFromKey(key) {
    const baseNote = baseKeyToNoteMap[key.toLowerCase()];
    if (baseNote) {
        return `${baseNote}${currentOctave}`;
    }
    return null;
}

function updateOctaveIndicator() {
    octaveIndicator.textContent = `Current Octave: C${currentOctave}`;
}

keys.forEach(key => {
    key.addEventListener('click', (e) => {
        let note = e.target.dataset.key;
        if (note) playSound(note);
    });
});

window.addEventListener('keydown', (e) => {
    if (e.key==='z') {
        currentOctave = Math.max(3, currentOctave-1);
        updateOctaveIndicator();
    } else if (e.key === 'x') {
        currentOctave = Math.min(5,currentOctave + 1);
        updateOctaveIndicator();
    } else {
        const note = getNoteFromKey(e.key);
        if (note) {
            const keyElement = document.querySelector(`.key[data-key=${note}]`);
            if (keyElement) {
                keyElement.classList.add('active');
                playSound(note);
            }
        }
    }
});

window.addEventListener('keyup', (e) => {
    const note = getNoteFromKey(e.key);
    if (note) {
        const keyElement = document.querySelector(`.key[data-key="${note}"]`);
        if (keyElement) {
            keyElement.classList.remove('active');
        }
    }
});