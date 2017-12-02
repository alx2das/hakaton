import {createReducer} from 'redux-immutablejs'
import {reducer as formReducer} from 'redux-form/immutable';
import {reducer as notifyReducer} from 'common/uiElements/Notify/immutable';

export default function getReducers(modules) {
	const reducers = {
		form: formReducer, //все формы будут хранится тут
		notifications: createReducer(notifyReducer.initialState, notifyReducer.actionHandlers)
	};
	return modules
		.filter((m) => isFunc(m.getReducers))
		.reduce((reducers, module) => {
			let r = module.getReducers(createReducer); //гоняем через редюсер из immutablejs, чтобы сразу выбрасывать ошибку если редюсер отдает не имутабельный стейт
			return {...reducers, ...r}
		}, reducers);
}

function isFunc(f) {
	return typeof f === 'function';
}

function defaultHandler(state, action) {
	return state;
}

function _createReducer(initialState, actionHandlers) {
	return function reducer(state = initialState, action) {
		const handler = actionHandlers[action.type] || actionHandlers['default'] || defaultHandler;
		return handler(state, action);
	}
}

