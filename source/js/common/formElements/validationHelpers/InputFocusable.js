import IFocusableElement from './IFocusableElement';

/**
 * Сервис для фокусировки обычных инпутов
 */
export default class InputFocusable extends IFocusableElement {
	init(el) {
		this.focusableInput = el;
	}

	setFocus() {
		if (!this.focusableInput)
			throw 'focusableInput not init';
		if (!this.focusableInput.focus)
			throw 'focusableInput does not have method @focus';
		this.focusableInput.focus();
	}
}