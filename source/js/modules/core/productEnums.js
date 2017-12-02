export const MEASURE_TYPE = {
	PCS: 'pcs',
	KG: 'kg',
	LTR: 'ltr'
};

export const MEASURE_OPTIONS = [
	{label: 'Штука', value: MEASURE_TYPE.PCS, short: 'шт'},
	{label: 'Килограмм', value: MEASURE_TYPE.KG, short: 'кг'},
	{label: 'Литр', value: MEASURE_TYPE.LTR, short: 'л'}];

export const ALCOHOL_OPTIONS = [
	{label: 'Обычный', value: 'NO_ALCOHOL'},
	{label: 'Слабоалкогольный', value: 'LIGHT_ALCOHOL'},
	{label: 'Алкоголь', value: 'ALCOHOL'}];

export const VAT_TAG_OPTIONS = [
	{value: "0", label: 'по умолчанию (из настроек)', short: 'из настроек'},
	{value: 1104, label: 'НДС 0%', short: '0%'},
	{value: 1103, label: 'НДС 10%', short: '10%'},
	{value: 1102, label: 'НДС 18%', short: '18%'},
	{value: 1105, label: 'НДС не облагается', short: 'не облагается'},
	{value: 1107, label: 'НДС с рассч. ставкой 10%', short: 'с рассч. ставкой 10%'},
	{value: 1106, label: 'НДС с рассч. ставкой 18%', short: 'с рассч. ставкой 18%'}
];

export const TAX_MODE_OPTIONS = [
	{value: '0', label: 'по умолчанию (из настроек)'},
	{value: 'COMMON', label: 'ОСН'},
	{value: 'SIMPLIFIED', label: 'УСН Доходы'},
	{value: 'SIMPLIFIED_WITH_EXPENSE', label: 'УСН Доход минус расход'},
	{value: 'ENVD', label: 'ЕНВД'},
	{value: 'PATENT', label: 'ПСН'},
	{value: 'COMMON_AGRICULTURAL', label: 'ЕСХН'}
];

export const getLabelByValue = (options, value, def = {label: '', short: ''}) => {
	const val = options.filter(option => option.value == value);
	return val.length ? val[0] : def;
};