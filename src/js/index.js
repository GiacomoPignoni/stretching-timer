import '../style/main.scss';
import InputEl from './input';
import TimerEl from './timer';

function main() {
    const timeInput = new InputEl('time-input');
    const pauseTimeInput = new InputEl('pause-time-input');
    const repeatInput = new InputEl('repeat-input');
    const timer = new TimerEl('timer', timeInput, pauseTimeInput, repeatInput);
    timer.play();
}

$(() => {
    main();
});

