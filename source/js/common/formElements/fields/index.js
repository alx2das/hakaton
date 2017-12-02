import PhoneField from './PhoneField'
import AmountField from './AmountField'
import NumberField from './NumberField'
import SelectField from './SelectField'
import TextAreaField from './TextAreaField'
import InputField from './InputField'
import SwitchField from './SwitchField'
import DatePickerField from './DatePickerField'
import normalizeKpp from './normalizeKpp'
import normalizeInn from './normalizeInn'
import SearchField from './SearchField'
import {Field, FieldArray} from 'redux-form/immutable' //чтобы не импортить каждый раз филды из разныз мест

export {
	PhoneField,
	AmountField,
	NumberField,
	SelectField,
	InputField,
	SwitchField,
	Field,
	FieldArray,
	TextAreaField,
	DatePickerField,
	SearchField,

	normalizeKpp,
	normalizeInn
};