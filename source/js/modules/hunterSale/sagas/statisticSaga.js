import {call, put, select, fork, take, takeEvery, all} from 'redux-saga/effects'

import * as dataContext from '../dataProvider/dataContext'
import * as actEnums from '../actions/statisticActions'


function* checkConnectSaga(req) {
    try {
        console.log('checkConnectSaga', req);

        const responce = yield call(dataContext.checkConnect);

        console.log('responce', responce);

        yield put(actEnums.checkConnect.success());
    } catch (err) {
        console.error(err);
    }
}


export default function* () {
    yield all([
        takeEvery(actEnums.CHECK_CONNECT.REQUEST, checkConnectSaga)
    ])
}