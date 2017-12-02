/**
 * Created by RobertSabiryanov on 24.05.17.
 */
const normalizeInn = (value, previousValue) => {
	if (!value) {
		return value;
	}
	return value.slice(0, 12).replace(/[^\d]/g, '');
}

export default normalizeInn