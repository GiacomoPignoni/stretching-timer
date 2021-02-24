export default class TimerEl {
    constructor(id, time, pauseTime, repeat) {
        this.ref = $(`#${id}`);
        this.time = time;
        this.pauseTime = pauseTime;
        this.repeat = repeat;

        this.currentTimeS = 0;
        this.setText(this.time._value);
    }

    play() {
        clearInterval(this.interval);
        this.currentTimeS = this.time._value;
        this.interval = setInterval(() => {
            this.currentTimeS--;
            this.setText(this.currentTimeS);
        }, 1000);
    }

    tick() {

    }

    setText(timeS) {
        const seconds = timeS % 60;
        const minutes = Math.floor(timeS / 60);
        this.ref.find('#seconds').text(seconds < 10 ? `0${seconds}` : seconds);
        this.ref.find('#minutes').text(minutes < 10 ? `0${minutes}` : minutes);
    }
}