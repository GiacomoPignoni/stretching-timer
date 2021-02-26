import VoiceController from './voice-controller';

export default class TimerEl {
    constructor(time, pauseTime, repeat) {
        this.ref = $('#timer');
        this.time = time;
        this.pauseTime = pauseTime;
        this.repeat = repeat;
        this.playing = false;
        this.paused;
        this.voice = new VoiceController();

        this.time.onValueChange = () => {
            this.onTimeValueChange();
        }
        this.repeat.onValueChange = () => {
            this.onRepeatValueChange();
        }
        $('#stop-btn').on('click', () => {
            this.stop();
        });
        $('#play-btn').on('click', () => {
            this.playPause();
        });

        this.currentTimeS = this.time._value;
        this.setText();
        this.setCount(this.repeat._value);
        this.setLabel('');
    }

    playPause() {
        if (this.playing === true) {
            $('#play-btn #icon').removeClass('icon-pause').addClass('icon-play');
            if (this.paused === true) {
                // Resume from pause
                this.paused = false;
                this.voice.speak('Resumed');
            } else {
                // Put in pause
                this.paused = true;
                this.voice.speak('Timer paused');
            }
        } else {
            clearInterval(this.interval);
            this.voice.speak('Session start');
            this.playing = true;
            this.counter = this.repeat._value;
            $('#play-btn #icon').removeClass('icon-play').addClass('icon-pause');
            this.play();
        }
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
        $('#play-btn #icon').removeClass('icon-pause').addClass('icon-play');
    }

    tick() {
        if (this.paused === true)
            return;

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
        if (this.paused === true)
            return;

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

    onRepeatValueChange() {
        if (this.playing === false) {
            this.setCount(this.repeat._value);
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