import {isRequired} from 'common/validators';

export const ifCondition = (condition, value, defaultVal = '') => {
	return condition ? value : defaultVal;
};

/**
 * Подсветка бордера инпута
 * @param error - есть ошибка
 * @param valid - валидное состояние
 * @param active - фокус в поле
 * @param visited - поле было под фокусом
 * @param submitFailed - не удачная отправка формы
 * @returns {*}
 */
export const showErrorBorder = ({valid, error, active, visited, submitFailed}) => {
	return (!valid || error) && (visited || submitFailed) && !active;
};

/**
 * Подсветка бордера инпута
 * @param error - есть ошибка
 * @param visited - поле было в фокусе
 * @param valid - валидное состояние
 * @param active - фокус в поле
 * @returns {*}
 */
export const showSuccessBorder = ({valid, visited, error, active}) => {
	return (valid || !error) && visited && !active;
};

/**
 * Показывать тултип с ошибкой
 */
export const getErrorMessage = ({error, touched, submitFailed}) => {
	return error && (submitFailed || touched) ? error : null;
};

export const getRandomKey = () => {
	return Math.floor(Math.random() * (999999999 - 100000000)) + 100000000;
};

export const getRequiredValidator = ({required = false, requiredDisable = false}) => {
	return required && !requiredDisable ? [isRequired(required)] : [];
};
