import VoiceController from './voice-controller';

export default class TimerEl {
    constructor(id, time, pauseTime, repeat) {
        this.ref = $(`#${id}`);
        this.time = time;
        this.pauseTime = pauseTime;
        this.repeat = repeat;
        this.playing = false;
        this.voice = new VoiceController();

        this.time.onValueChange = () => {
            this.onTimeValueChange();
        }

        this.currentTimeS = this.time._value;
        this.setText();
        this.setCount(this.repeat._value);
        this.setLabel('');
    }

    playPause() {
        clearInterval(this.interval);
        this.voice.speak('Session start');
        this.playing = true;
        this.counter = this.repeat._value;
        this.play();
    }

    play() {
        clearInterval(this.interval);
        this.voice.speak('Stretching');
        this.setCount(this.counter);
        this.setLabel('Stretching');
        this.currentTimeS = this.time._value;
        this.setText();
        this.interval = setInterval(() => {
            this.tick();
        }, 1000);
    }

    stop() {
        clearInterval(this.interval);
        this.voice.speak('Session stopped');
        this.playing = false;
        this.currentTimeS = this.time._value;
        this.setText();
        this.setCount(this.repeat._value);
        this.setLabel('');
    }

    tick() {
        if (this.currentTimeS <= 0) {
            this.pPlay();
        } else {
            this.currentTimeS--;
            this.setText();
        }
    }

    pPlay() {
        clearInterval(this.interval);
        this.voice.speak('Pause');
        this.setLabel('Pause');
        this.currentTimeS = this.pauseTime._value;
        this.setText();
        this.interval = setInterval(() => {
            this.pTick();
        }, 1000);
    }

    pTick() {
        if (this.currentTimeS <= 0) {
            if (this.counter <= 0) {
                this.finish();
            } else {
                this.counter--;
                this.play();
            }
        } else {
            this.currentTimeS--;
            this.setText();
        }
    }

    finish() {
        this.voice.speak('Session finished');
        clearInterval(this.interval);
        this.playing = false;
        this.currentTimeS = this.time._value;
        this.setText();
        this.setCount(this.repeat._value);
        this.setLabel('Finished!');
    }

    onTimeValueChange() {
        if (this.playing === false) {
            this.currentTimeS = this.time._value;
            this.setText();
        }
    }

    setText() {
        const seconds = this.currentTimeS % 60;
        const minutes = Math.floor(this.currentTimeS / 60);
        this.ref.find('#seconds').text(seconds < 10 ? `0${seconds}` : seconds);
        this.ref.find('#minutes').text(minutes < 10 ? `0${minutes}` : minutes);
    }

    setLabel(text) {
        $('#label').text(text);
    }

    setCount(value) {
        $('#count').text(value);
    }
}