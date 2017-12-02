import React from 'react'
import {Field} from 'redux-form/immutable'
import PropTypes from 'prop-types'
import {isEmpty} from 'common/validators'

//дополнить при необходимости
const datePickerOptions = ['value', 'lang', 'format', 'formatDate', 'formatTime', 'step',
	'closeOnDateSelect', 'timepicker', 'datepicker', 'weeks', 'minDate', 'maxDate', 'startDate',
	'defaultDate', 'defaultTime', 'todayButton', 'defaultSelect', 'yearStart', 'yearEnd', 'disabledDates',
	'allowDates', 'allowDateRe', 'disabledWeekDays', 'id', 'inline', 'scrollMonth', 'scrollInput',
	'scrollTime', 'dayOfWeekStart'];

class DatePicker extends React.Component {
	static defaultProps = {
		formatDate: 'd.m.Y',
		format: 'd.m.Y',
		yearStart: 2000,
		lang: 'ru',
		scrollMonth: false,
		scrollInput: false,
		scrollTime: false,
		datepicker: true,
		timepicker: false,
		dayOfWeekStart: 1,	// смещения начала недели (с понедельника)
		disabled: false,
		value: null,
		onChange: function (maskValue, value, event) {/*no-op*/
		}
	};

	constructor(props) {
		super(props);
		$.datetimepicker.setLocale('ru');
	}

	setFocus() {
		this.input && this.input.focus();
	}

	getValue() {
		return this.$input ? this.$input.datetimepicker('getValue') : null
	}

	handleChange(date) {
		this.props.onChange && this.props.onChange(date);
	}

	componentWillReceiveProps(props) {
		if (props) {
			if (!this.isEqualDates(props.value, this.getValue())) {
				if (this.$input) {
					if (props.value) {
						this.$input.datetimepicker({value: props.value});
					} else {
						this.$input.datetimepicker('reset');
					}
				}
			}
		}
	}

	componentDidMount() {
		const $input = $(this.input);
		$input.datetimepicker('destroy');

		const self = this;

		const options = this.getDatePickerOptions();

		options.onChangeDateTime = (dp, $input, event) => {
			if (!self.isEqualDates(dp, self.props.value))
				self.handleChange(dp);
		};
		this.$input = $input.datetimepicker(options);
	}

	isEqualDates(a, b) {
		return (a && b && a.getTime() === b.getTime()) || a === b || (isEmpty(a) && isEmpty(b));
	}

	getDatePickerOptions() {
		return datePickerOptions.reduce((options, key) => {
			if (this.props.hasOwnProperty(key)) {
				options[key] = this.props[key];
			}
			return options;
		}, {});
	}

	excludePickerProps(props) {
		return Object.keys(props).reduce((all, key) => {
			if (datePickerOptions.indexOf(key) == -1 || key == 'id') {
				all[key] = props[key];
			}
			return all;
		}, {});
	}

	render() {
		const {className, name = 'no', ...props}=this.props;
		const classNames = ['datetimepicker', className || ''].join(' ');

		const notPickerProps = this.excludePickerProps(props);
		delete notPickerProps.onChange;

		return (
			<input type="text"
				   name={name}
				   {...notPickerProps}
				   id={this.props.id}
				   ref={input => this.input = input}
				   className={classNames}/>
		);
	}
}

DatePicker.propTypes = {
	name: PropTypes.string,
	onChange: PropTypes.func,
	value: PropTypes.any,
	lang: PropTypes.string,
	format: PropTypes.string.isRequired,
	formatDate: PropTypes.string,
	formatTime: PropTypes.string,
	step: PropTypes.number,
	closeOnDateSelect: PropTypes.func,
	timepicker: PropTypes.bool,
	datepicker: PropTypes.bool,
	weeks: PropTypes.string,
	minDate: PropTypes.any,
	maxDate: PropTypes.any,
	startDate: PropTypes.any,
	defaultDate: PropTypes.any,
	defaultTime: PropTypes.any,
	todayButton: PropTypes.bool,
	defaultSelect: PropTypes.bool,
	yearStart: PropTypes.number,
	yearEnd: PropTypes.number,
	disabledDates: PropTypes.array,
	allowDates: PropTypes.array,
	allowDateRe: PropTypes.string,
	disabledWeekDays: PropTypes.bool,
	id: PropTypes.string,
	inline: PropTypes.bool
};


export default DatePicker;