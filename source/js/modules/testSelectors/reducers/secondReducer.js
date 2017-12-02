import {Map, List, fromJS, Seq} from 'immutable';
import {SET_FILTER, SET_COMPLETED} from '../enums/actions'

export const initialState = Map({
	layers: Map({}),
	// transactionList: Map({
	// 	listHome: Map({
	// 		list: [
	// 			{
	// 				id: 1,
	// 				name: 'Test',
	// 				date: new Date(),
	// 				amount: 12,
	// 				status: 'Incompleted',
	// 				completed: false
	// 			},
	// 			{
	// 				id: 2,
	// 				name: 'Test 2',
	// 				date: new Date(),
	// 				amount: 100,
	// 				status: 'Completed',
	// 				completed: true
	// 			}],
	// 		filter: 'SHOW_ALL'
	// 	}),
	// 	listSecond: Map({
	// 		list: [
	// 			{
	// 				id: 1,
	// 				name: 'Test 3',
	// 				date: new Date(),
	// 				amount: 12,
	// 				status: 'Incompleted',
	// 				completed: false
	// 			},
	// 			{
	// 				id: 2,
	// 				name: 'Test 4',
	// 				date: new Date(),
	// 				amount: 100,
	// 				status: 'Completed',
	// 				completed: true
	// 			}],
	// 		filter: 'SHOW_ALL'
	// 	})
	//})
});

export const actionHandlers = {
	// [SET_FILTER]: (state, action) => {
	// 	return state.setIn(['transactionList', action.listId, 'filter'], action.filterState);
	// },
	// [SET_COMPLETED]: (state, action) => {
	// 	return state.setIn(['transactionList', action.payload.listId, 'test'], new Date().getTime());
	// },
	['SET_DATA']: (state, action) => {
		return state.setIn(['layers', action.key], fromJS(action.data))
	}
};

// function fromJSGreedy(js) {
// 	return typeof js !== 'object' || js === null ? js :
// 		Array.isArray(js) ?
// 			Seq(js).map(fromJSGreedy).toList() :
// 			Seq(js).map(fromJSGreedy).toMap();
// }

