/**
 * Created by RobertSabiryanov on 24.05.17.
 */
const normalizeOnlyNums = (value, previousValue) => {
	if (!value) {
		return value
	}
	return value.replace(/[^\d]/g, '');
}

export default normalizeOnlyNums