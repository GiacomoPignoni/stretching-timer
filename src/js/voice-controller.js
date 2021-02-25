export default class VoiceController {

    constructor() {
        this.utterance = new SpeechSynthesisUtterance('');
        this.utterance.lang = 'en-US';
        this.muted = false;
    }

    speak(text) {
        if (this.muted === false) {
            this.utterance.text = text;
            window.speechSynthesis.speak(this.utterance);
        }
    }
}