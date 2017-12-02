import PropTypes from 'prop-types';


export default {
	name: PropTypes.string.isRequired,
	format: PropTypes.func,
	normalize: PropTypes.func,
	onBlur: PropTypes.func,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	onDragStart: PropTypes.func,
	onDrop: PropTypes.func,
	parse: PropTypes.func,
	required: PropTypes.string, //текст ошибки при отсутствии значения
	requiredDisable: PropTypes.bool, //выключении валидации на обязательность значения
	validate: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.func)]),
	wrapperClassName: PropTypes.string //стили для дива в который будет завернуть компонент при натягивании валидации
};
