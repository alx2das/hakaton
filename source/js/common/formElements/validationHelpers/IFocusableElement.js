/**
 * Интерфейс для работы с фокусировкой объектов
 */
export default class IFocusableElement {
	init(el) {
		throw "IFocusableElement method @init not implemented";
	}

	setFocus() {
		throw "IFocusableElement method @setFocus not implemented";
	}

	inFocus() {
		//optional method
	}
}