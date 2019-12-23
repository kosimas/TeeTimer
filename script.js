const remote = require('electron').remote;
const TeeTimer = require('./static.timer');

const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const stopBtn = document.getElementById('stop');

const tickCallback = (minutes, seconds) => {
    minutesInput.value = minutes;
    secondsInput.value = seconds;
};

const fillFormAndStartTimer = (minutes, seconds) => {
    minutesInput.value = minutes;
    secondsInput.value = seconds;

    startBtn.click();
}

const shrt2 = remote.globalShortcut.register('CommandOrControl+Alt+2', () => {
    fillFormAndStartTimer(0, 5);
});

const shrt3 = remote.globalShortcut.register('CommandOrControl+Alt+3', () => {
    fillFormAndStartTimer(3, 0);
});

const shrt4 = remote.globalShortcut.register('CommandOrControl+Alt+4', () => {
    fillFormAndStartTimer(4, 0);
});

const shrt5 = remote.globalShortcut.register('CommandOrControl+Alt+5', () => {
    fillFormAndStartTimer(5, 0);
});

const shrt6 = remote.globalShortcut.register('CommandOrControl+Alt+6', () => {
    fillFormAndStartTimer(6, 0);
});

const shrtStop = remote.globalShortcut.register('CommandOrControl+Alt+p', () => {
    stopBtn.click();
});


startBtn.addEventListener('click', (e) => {
    let minutes = minutesInput.value;
    let seconds = secondsInput.value;

    minutes = parseInt(minutes);
    seconds = parseInt(seconds);

    if (isNaN(minutes) || isNaN(seconds))
        return;

    if (!TeeTimer.isRunning) {
        TeeTimer.setTime(minutes, seconds);
        TeeTimer.start(tickCallback);
    } else {
        TeeTimer.pause();
    }
});

pauseBtn.addEventListener('click', (e) => {
    TeeTimer.pause();
});

stopBtn.addEventListener('click', (e) => {
    TeeTimer.stop(tickCallback);
});

minutesInput.addEventListener('focusin', (e) => {
    e.srcElement.select();
});

secondsInput.addEventListener('focusin', (e) => {
    e.srcElement.select();
});

minutesInput.addEventListener('keyup', (e) => {
    e.srcElement.value = e.srcElement.value.replace(/[^0-9]/g, '');
});

secondsInput.addEventListener('keyup', (e) => {
    e.srcElement.value = e.srcElement.value.replace(/[^0-9]/g, '');
    let nm = parseInt(e.srcElement.value);
    if (nm > 59)
        e.srcElement.value = 59;
});