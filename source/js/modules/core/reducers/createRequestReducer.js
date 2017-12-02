import {fromJS, Map} from 'immutable';

const getStorePlace = (...props) => {
	return props.reduce((p, v) => v ? [...p, v] : p, []);
};

const createRequestReducer = (ACTION, storeKeys) => {
	let reducer = null;

	const chain = {
		setRequest: (updateFunc) => setAction(ACTION.REQUEST, createReducer(storeKeys, updateFunc)),
		setSuccess: (updateFunc) => setAction(ACTION.SUCCESS, createReducer(storeKeys, updateFunc)),
		setFailure: (updateFunc) => setAction(ACTION.FAILURE, createReducer(storeKeys, updateFunc)),
		get: () => {
			if (!reducer)
				throw 'Редюсер не имеет ни одного экшна';
			return reducer;
		}
	};

	function setAction(actionName, actionReducer) {
		if (!reducer) {
			reducer = {
				[ACTION.REQUEST]: () => {
					throw 'Метод REQUEST не сконфигурирован'
				},
				[ACTION.SUCCESS]: () => {
					throw 'Метод SUCCESS не сконфигурирован'
				},
				[ACTION.FAILURE]: () => {
					throw 'Метод  FAILURE не сконфигурирован'
				}
			};
		}
		reducer[actionName] = actionReducer;
		return chain;
	}

	return chain;
};


const createReducer = (storeKeys, updateFunc) => {
	return (state, {formKey = null, ...props}={}) => {
		const storePlace = getStorePlace(...storeKeys, formKey);
		return state.updateIn(storePlace, Map({}), store => updateFunc(store, {...props, formKey}));
	}
};

export default createRequestReducer;