export default class DarkMode {
    constructor(checkInputId) {
        this.input = $(`#${checkInputId}`);
        this.input.on('change', () => {
            this.onChange();
        });
        this.checkSavedStatus();
    }

    onChange() {
        if (this.input.is(':checked')) {
            $('html').addClass('dark');
        } else {
            $('html').removeClass('dark');
        }
        this.saveStatus();
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
}