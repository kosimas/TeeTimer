module.exports = class Timer {
    constructor() {
        this.isRunning = false;
        this.isPaused = false;
        
        this.alarm = new Audio('./alarm.mp3');

        this.minutes = 0;
        this.seconds = 0;
        this.timestamp = new Date();
        
        this.intervalFnc = null;
    }

    setTime(minutes, seconds) {
        if (isNaN(minutes) || isNaN(seconds))
            return false;
        
        this.minutes = parseInt(minutes);
        this.seconds = parseInt(seconds);

        this.timestamp.setMinutes(minutes);
        this.timestamp.setSeconds(seconds);
    }

    start(cb) {
        if (this.intervalFnc)
            return;
        
        this.isRunning = true;
        this.isPaused = false;

        const time = new Date(this.timestamp);
        this.intervalFnc = setInterval(() => {
            if (this.isPaused)
                return;
                
            time.setSeconds(time.getSeconds() - 1);
            console.log(time);
            cb(time.getMinutes(), time.getSeconds());
            if (time.getMinutes() === 0 && time.getSeconds() === 0) {
                console.log("Alarm");
                this.alarm.play();
                clearInterval(this.intervalFnc);
                this.intervalFnc = null;
                this.isRunning = false;
            }
        }, 1000);
    }

    stop(cb) {
        this.alarm.pause();
        this.alarm.currentTime = 0;

        if (!this.intervalFnc)
            return;

        clearInterval(this.intervalFnc);
        this.intervalFnc = null;
        this.isRunning = false;

        cb(this.timestamp.getMinutes(), this.timestamp.getSeconds());
    }

    pause() {
        this.isPaused = !this.isPaused;
    }
};