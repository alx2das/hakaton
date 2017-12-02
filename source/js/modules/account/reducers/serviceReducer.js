import {Map, fromJS} from 'immutable';
import * as actEnums from '../actions/serviceActions'


const initialState = Map({
	loading: true,				// загрузка
	success: null,				// успешное изменение
	checked: null,				// проверка логина/пароля

	getStateErrors: null,		// ошибка при проверке состояния
	connectErrors: null,		// ошибка при проверке логина/пароля
	disableErrors: null,		// ошибка при отключении интеграции

	actionIntegration: false,	// состояние интеграции на сервере
	stateIntegration: false,	// положение переключателя
	msLogin: '',				// логин
	msPassword: ''				// пароль
});

const actionHandlers = {
	// проверка состояние интеграции
	[actEnums.GET_STATE.REQUEST]: () => {
		return initialState;
	},
	[actEnums.GET_STATE.SUCCESS]: (state, {response}) => {
		return state.merge({
			loading: false,
			actionIntegration: response.msIntegrationEnabled,
			stateIntegration: response.msIntegrationEnabled,
			msLogin: response.msLogin || state.get('msLogin'),
			success: null
		});
	},
	[actEnums.GET_STATE.FAILURE]: (state, {error}) => {
		return state.merge({
			loading: false,
			getStateErrors: error,
			connectErrors: null,
			disableErrors: null
		});
	},

	// сохранение настроек интеграциии
	[actEnums.CHECK_SAVE_INTEGRATION.REQUEST]: (state, {msLogin, msPassword}) => {
		return state.merge({
			msLogin,
			msPassword
		});
	},
	[actEnums.CHECK_SAVE_INTEGRATION.SUCCESS]: (state, {checked}) => {
		return state.merge({
			checked: !checked ? null : true,
			success: !checked ? true : state.get('success'),
			actionIntegration: !checked ? true : state.get('actionIntegration'),
			msPassword: !checked ? '' : state.get('msPassword'),

			getStateErrors: null,
			connectErrors: null,
			disableErrors: null
		});
	},
	[actEnums.CHECK_SAVE_INTEGRATION.FAILURE]: (state, {error}) => {
		return state.merge({
			loading: false,
			checked: null,
			success: null,

			getStateErrors: null,
			connectErrors: error,
			disableErrors: null
		});
	},

	// удаления настроек интеграции
	[actEnums.DISABLE_INTEGRATION.REQUEST]: (state) => {
		return state.merge({loading: true});
	},
	[actEnums.DISABLE_INTEGRATION.SUCCESS]: (state) => {
		return state.merge({
			loading: false,
			actionIntegration: false,
			stateIntegration: false,
			msLogin: '',

			getStateErrors: null,
			connectErrors: null,
			disableErrors: null
		});
	},
	[actEnums.DISABLE_INTEGRATION.FAILURE]: (state, {error}) => {
		return state.merge({
			loading: false,
			getStateErrors: null,
			connectErrors: null,
			disableErrors: error
		});
	},

	// переключатель состояния
	[actEnums.UPDATE_STATE]: (state, {action}) => {
		return state.merge({
			stateIntegration: action,
			success: null,
			getStateErrors: null,
			connectErrors: null,
			disableErrors: null
		})
	},

	// очистка стейта
	[actEnums.CLEAR_FORM]: () => {
		return initialState.merge({
			loading: false
		});
	}
};

export default (createReducer) => createReducer(initialState, actionHandlers);