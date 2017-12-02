/**
 * Created by RobertSabiryanov on 24.05.17.
 */
const normalizeKpp = (value, previousValue) => {
	if (!value) {
		return value;
	}
	return value.slice(0, 9).replace(/[^\d]/g, '');
}

export default normalizeKpp