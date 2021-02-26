import '../style/main.scss';
import InputEl from './input';
import TimerEl from './timer';
import DarkMode from './dark-mode';

function main() {
    const timeInput = new InputEl('time-input');
    const pauseTimeInput = new InputEl('pause-time-input');
    const repeatInput = new InputEl('repeat-input');
    const darkMode = new DarkMode();
    const timer = new TimerEl(timeInput, pauseTimeInput, repeatInput);
}

$(() => {
    main();
});

