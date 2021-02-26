export default class BoolValueSave {

    constructor(selector) {
        this.input = $(selector);
        this.input.on('change', () => {
            this.onChange();
        });
        this.checkSavedStatus();
    }

    saveStatus() {
        localStorage.setItem(this.input.attr('id'), this.input.is(':checked'));
    }

    checkSavedStatus() {
        var status = localStorage.getItem(this.input.attr('id'));
        if (status) {
            if (status === 'true') {
                this.input.prop('checked', true);
            } else {
                this.input.prop('checked', false);
            }
            this.onChange();
        }
    }

    onChange() {
        this.saveStatus();
    }
}