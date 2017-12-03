import {call, put, select, fork, take, takeEvery, all} from 'redux-saga/effects'

import {push} from 'connected-react-router'
import {getStatisticSelector} from '../selectors/statisticSelector'
import * as dataContext from '../dataProvider/dataContext'
import * as actEnums from '../actions/optionsActions'


function* getOptionsSaga(req) {
    try {
        const statisticSatate = yield select(getStatisticSelector);
        const actRPointID = statisticSatate.get('actRPointID');
        const response = yield call(dataContext.getOptions, actRPointID);

        yield put(actEnums.getOptions.success(response));
    } catch (err) {
        console.log(err);
    }
}

function* saveOptionsSaga({type, ...props}) {
    try {

        // const statisticSatate = yield select(getStatisticSelector);
        // const actRPointID = statisticSatate.get('actRPointID');
        const response = yield call(dataContext.saveOptions, props);

        console.log('response', response);

    } catch (err) {
        console.log(err);
    }
}


export default function* () {
    yield all([
        takeEvery(actEnums.GET_OPTIONS.REQUEST, getOptionsSaga),
        takeEvery(actEnums.SAVE_OPTIONS.REQUEST, saveOptionsSaga)
    ])
}