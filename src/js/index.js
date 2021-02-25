import '../style/main.scss';
import InputEl from './input';
import TimerEl from './timer';
import DarkMode from './dark-mode';

var timeInput, pauseTimeInput, repeatInput, timer, darkMode;

function main() {
    timeInput = new InputEl('time-input');
    pauseTimeInput = new InputEl('pause-time-input');
    repeatInput = new InputEl('repeat-input');
    darkMode = new DarkMode('dark-mode-check');
    timer = new TimerEl('timer', timeInput, pauseTimeInput, repeatInput);
    subToButtonsEvents();
}

function subToButtonsEvents() {
    $('#stop-btn').on('click', () => {
        timer.stop();
    });

    $('#play-btn').on('click', () => {
        timer.playPause();
    });
}

$(() => {
    main();
});

