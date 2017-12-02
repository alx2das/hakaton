/**
 * Created by RobertSabiryanov on 24.05.17.
 */
import uuidv4 from 'uuid/v4'

export const uuid = () => {
	return uuidv4();
}

export const generateNumber = () => {
	if (window.crypto && window.crypto.getRandomValues) {
		var array = new Uint32Array(1);
		window.crypto.getRandomValues(array);
		return array[0];
	}
	return Math.round(Math.random() * 1e10);
}

export const generateNumbers = () => {
	const max = 99999999;
	const min = 10000000;
	return Math.floor(Math.random() * (max - min) + min);
}