import {Map, fromJS} from 'immutable'
import * as actEnums from '../actions/registerKKTActions'


const initialState = Map({
	defRetailPoint: Map({
		runCheck: false,
		step: 1,
		isCheck: false,
		globalLoading: true,
		loading: false,
		loadingMessage: false,
		error: Map({}),
		showLayer: null,
		kassaStatus: '',
		serverStatus: '',
		requestData: Map({}),
	}),
	initPulling: false
});

const actionHandlers = {
	// проверка изменения статуса у всех торг.точек
	[actEnums.INIT_PULLING]: (state, {active}) => {
		return state.merge({initPulling: active});
	},

	// при закрытии слоя регистрации ККТ
	[actEnums.CLOSE_REGISTER_KKT]: (state, {retailPointID}) => {
		return state.mergeIn([retailPointID], {
			runCheck: false
		});
	},

	// изменит отображаемый слой
	[actEnums.UPDATE_LAYER]: (state, {retailPointID, newLayer, step, props}) => {
		return state.mergeIn([retailPointID], {
			showLayer: newLayer,
			step: step || state.get(retailPointID).get('step'),
			...props
		})
	},

	// нажали "Зарегистрировать/и т.д. ..."
	[actEnums.OPEN_REG_KKT.REQUEST]: (state, {retailPointID}) => {
		return state
			.mergeIn([retailPointID], initialState.get('defRetailPoint'))
			.mergeIn([retailPointID], {isCheck: true});
	},
	[actEnums.OPEN_REG_KKT.SUCCESS]: (state, {
		retailPointID, kktStatus, registrationRequestStatus,
		showLayer, requestData, step, ...props
	}) => {
		return state
			.mergeIn([retailPointID], {
				step: step || 1,
				globalLoading: false,

				kassaStatus: kktStatus,
				serverStatus: registrationRequestStatus,

				showLayer: showLayer,
				requestData: fromJS(requestData || {}),

				...props
			});
	},
	[actEnums.OPEN_REG_KKT.FAILURE]: (state, {retailPointID, error}) => {
		return state.mergeIn([retailPointID], {
			step: 1,
			globalLoading: false,
			error: fromJS(error)
		});
	},

	// Отправка формы в ФНС
	[actEnums.SEND_FORM_FNS.REQUEST]: (state, {retailPointID, form}) => {
		return state.mergeIn([retailPointID], {
			showLayer: 'loadingLayer',
			loadingMessage: 'Формируем заявление на регистрацию',
			requestData: fromJS(form)
		});
	},
	[actEnums.SEND_FORM_FNS.FAILURE]: (state, {retailPointID}) => {
		return state.mergeIn([retailPointID], {
			showLayer: 'registerFormOFD'
		});
	},

	// Отправляем отет в ФНС
	[actEnums.SEND_REPORT_REQUEST]: (state, {retailPointID}) => {
		return state
			.mergeIn([retailPointID], {
				runCheck: true,
				showLayer: 'loadingLayer',
				loadingMessage: 'Формируем отчет о регистрации'
			});
	},

	// запросить смс-код для подписи
	[actEnums.CODE_SIGNATURE_DOC.REQUEST]: (state, {retailPointID}) => {
		return state
			.mergeIn([retailPointID], {
				showLayer: 'signatureDoc',
				loading: true
			});
	},
	[actEnums.CODE_SIGNATURE_DOC.SUCCESS]: (state, {retailPointID}) => {
		return state
			.mergeIn([retailPointID], {
				showLayer: 'signatureDoc',
				loading: false
			});
	},
	[actEnums.CODE_SIGNATURE_DOC.FAILURE]: (state, {retailPointID}) => {
		return state
			.mergeIn([retailPointID], {
				showLayer: 'signatureDoc',
				loading: false
			});
	},

	// отправить смс-код
	[actEnums.SIGNATURE_DOC.REQUEST]: (state, {retailPointID}) => {
		return state
			.mergeIn([retailPointID], {
				showLayer: 'signatureDoc',
				submitLoading: true
			});
	},
	[actEnums.SIGNATURE_DOC.SUCCESS]: (state, {retailPointID, loadingMessage = false}) => {
		return state
			.mergeIn([retailPointID], {
				runCheck: true,
				showLayer: 'loadingLayer',
				submitLoading: false,
				loadingMessage
			});
	},
	[actEnums.SIGNATURE_DOC.FAILURE]: (state, {retailPointID}) => {
		return state
			.mergeIn([retailPointID], {
				showLayer: 'signatureDoc',
				submitLoading: false
			});
	},
};

export {initialState, actionHandlers};
export default (createReducer) => createReducer(initialState, actionHandlers);