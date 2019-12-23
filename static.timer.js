module.exports = class Timer {
    static isRunning = false;
    static isPaused = false;
    static alarm = new Audio('./alarm.mp3');
    static minutes = 0;
    static seconds = 0;
    static timestamp = new Date();
    static intervalFnc = null;

    static setTime(minutes, seconds) {
        if (isNaN(minutes) || isNaN(seconds))
            return false;
        
        this.minutes = parseInt(minutes);
        this.seconds = parseInt(seconds);

        this.timestamp.setMinutes(minutes);
        this.timestamp.setSeconds(seconds);
    }

    static start(cb) {
        if (this.intervalFnc)
            return;
        
        this.isRunning = true;
        this.isPaused = false;

        const time = new Date(this.timestamp);
        this.intervalFnc = setInterval(() => {
            if (this.isPaused)
                return;
                
            time.setSeconds(time.getSeconds() - 1);
            cb(time.getMinutes(), time.getSeconds());
            
            if (time.getMinutes() === 0 && time.getSeconds() === 0) {
                clearInterval(this.intervalFnc);
                
                this.alarm.play();
                this.intervalFnc = null;
                this.isRunning = false;
            }
        }, 1000);
    }

    static stop(cb) {
        this.alarm.pause();
        this.alarm.currentTime = 0;

        if (!this.intervalFnc)
            return;

        clearInterval(this.intervalFnc);
        this.intervalFnc = null;
        this.isRunning = false;

        cb(this.timestamp.getMinutes(), this.timestamp.getSeconds());
    }

    static pause() {
        this.isPaused = !this.isPaused;
    }
};