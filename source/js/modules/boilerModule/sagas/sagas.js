import {call, put, take, fork, takeEvery, all} from 'redux-saga/effects'

export function* watchRepeatTransaction() {

}

export default function*() {
	yield all([
		fork(watchRepeatTransaction)
	])
}