import {call, put, select, fork, take, takeEvery, all} from 'redux-saga/effects'

import * as dataContext from '../dataProvider/dataContext'
import * as actEnums from '../actions/statisticActions'


function* getRetalPointSaga({type, ...req}) {
    try {
        const res = yield call(dataContext.getStories, req);
        yield put(actEnums.getStatistics.request(res[0].accountId));
        yield put(actEnums.getRetailPoints.success({res}));
    } catch (err) {
        console.log(err);
    }
}

function* getStatisticsSaga({uid}) {
    try {
        const res = yield call(dataContext.getStatistics, uid);

        const storeUuid = res.challange[0].storeUuid;
        const challange = res.statisticItems
            .filter(i => i.storeUuid === storeUuid)
            .reduce((max, curr) => ({
                maxCheck: parseFloat(curr.avrCheck || 0) + parseFloat(max.maxCheck || 0),
                maxAmount: parseFloat(curr.totalAmount || 0) + parseFloat(max.maxAmount || 0),
                maxCount: parseFloat(curr.saleCount || 0) + parseFloat(max.maxCount || 0),
                ctn: (max.ctn || 0) + 1
            }), {});
        res.challange[0] = {...challange, ...res.challange[0]};

        yield put(actEnums.getStatistics.success({
            uid,
            ...res
        }));

    } catch (err) {
        console.log(err);
    }
}


export default function* () {
    yield all([
        takeEvery(actEnums.GET_RETAIL_POINTS.REQUEST, getRetalPointSaga),
        takeEvery(actEnums.GET_STATISTICS.REQUEST, getStatisticsSaga)
    ])
}