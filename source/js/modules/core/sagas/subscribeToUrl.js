import {call, put, take, fork, takeEvery, cancel, cancelled, select} from 'redux-saga/effects'
import {getCurrentLocation} from '../selectors'
import {LOCATION_CHANGE, POINT_READY} from '../actions'
import logger from 'infrastructure/utils/logger'

export default function* subscribeToUrl(url, initFunction) {
	let task;
	yield take(POINT_READY);
	const location = yield  select(getCurrentLocation);
	const isCurrentLocation = inLocation(location.toJS());
	if (isCurrentLocation) {
		task = yield fork(initFunction);
	}

	while (true) {
		const {payload}=yield take(LOCATION_CHANGE);
		if (payload) {
			const isCurrent = inLocation(payload.location);
			if (isCurrent && !task) {
				task = yield fork(initFunction);
			}
			// else {
			// 	if (task)
			// 		yield cancel(task);
			// }
		}
	}

	function inLocation(location) {
		const path = location ? location.pathname || '' : '';
		const urls = Array.isArray(url) ? url : [url];
		console.log(url, path);
		return urls.some(s => s.toLowerCase() === path.toLowerCase());
	}
}