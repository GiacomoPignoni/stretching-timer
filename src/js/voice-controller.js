import BoolValueSave from './bool-value-save';

export default class VoiceController extends BoolValueSave {
    constructor() {
        super('#mute-toggle');
        this.utterance = new SpeechSynthesisUtterance('');
        this.utterance.lang = 'en-US';
    }

    speak(text) {
        if (this.input.is(':checked') === false) {
            this.utterance.text = text;
            window.speechSynthesis.speak(this.utterance);
        }
    }
}