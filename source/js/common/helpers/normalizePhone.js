/**
 * Created by RobertSabiryanov on 24.05.17.
 */
const normalizePhone = (value, name) => {
	if (!value) {
		return value == null ? '' : value;
	}
	const onlyNums = value.replace(/[^\d]/g, '')
	// if (!previousValue || value.length > previousValue.length) {
	// 	// typing forward
	// 	if (onlyNums.length === 3) {
	// 		return onlyNums + '-'
	// 	}
	// 	if (onlyNums.length === 6) {
	// 		return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3) + '-'
	// 	}
	// }
	if (onlyNums.length <= 3) {
		return onlyNums
	}
	if (onlyNums.length <= 6) {
		return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3)
	}
	if (onlyNums.length <= 8) {
		return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3, 6) + '-' + onlyNums.slice(6, 8)
	}
	return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3, 6) + '-' + onlyNums.slice(6, 8) + '-' + onlyNums.slice(8, 10)
}

export default normalizePhone