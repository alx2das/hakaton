import IFocusableElement from './IFocusableElement';

export default class CustomFocusable extends IFocusableElement {
	init(el) {
		this.focusableInput = el;
	}

	setFocus() {
		if (!this.focusableInput)
			throw 'focusableInput not init';
		if (!this.focusableInput.setFocus)
			throw 'focusableInput does not have method @setFocus';
		this.focusableInput.setFocus();
	}
}