import BoolValueSave from './bool-value-save';

export default class DarkMode extends BoolValueSave{
    constructor() {
        super('#dark-mode-check');
    }

    onChange() {
        if (this.input.is(':checked')) {
            $('html').addClass('dark');
        } else {
            $('html').removeClass('dark');
        }
        super.onChange();
    }
}