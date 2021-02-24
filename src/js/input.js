export default class InputEl {

    set value(newValue) {
        this._value = newValue;
        this.textRef?.text(this._value);
    }

    constructor(inputId, autoSave = true) {
        this.inputRef = $(`#${inputId}`);
        this._value = this.inputRef.val();
        this.textRef = $(`#${inputId}-text`);
        this.autoSave = autoSave;
        this.checkSavedValue();

        // Events
        this.inputRef.on('input', (e) => {
            this.onInput(e);
        });
        if (this.autoSave) {
            this.inputRef.on('change', () => {
                this.saveValue();
            });
        }
    }

    onInput(event) {
        this.value = event.target.value;
    }

    saveValue() {
        if (this.autoSave === true) {
            localStorage.setItem(this.inputRef.attr('id'), this._value);
        }
    }

    checkSavedValue() {
        if (this.autoSave) {
            let value = localStorage.getItem(this.inputRef.attr('id'));
            value = Number.parseInt(value);
            if (value && Number.isInteger(value)) {
                this.inputRef.val(value);
                this.value = value;
            }
        }
    }
}