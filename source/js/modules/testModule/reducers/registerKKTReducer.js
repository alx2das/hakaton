import {Map, fromJS} from 'immutable'
import * as actEnums from '../actions/registerKKTActions'


const initialState = Map({
	loading: false,
	success: null,
	failure: null,

	retailPointID: '',
	registrationRequestStatus: null,
	kktStatus: null,
	kkmInfo: Map({
		platform: 'ANDROID',
		modelId: 32,
		modelName: 'ПТК "MSPOS-K"',
		vendorId: 9,
		vendorName: 'Общество с ограниченной ответственностью НТЦ "Альфа-Проект"',
		serialNo: '1234567890',
		fnNo: '8710000100878327'
	}),
});

const actionHandlers = {
	[actEnums.UPDATE_STATUS.REQUEST]: (state, {type, retailPointID, registrationRequestStatus, kktStatus, kktInfo}) => {
		return state.merge({
			loading: true,
			retailPointID,
			registrationRequestStatus,
			kktStatus,
			kkmInfo: fromJS(kktInfo)
		})
	},
	[actEnums.UPDATE_STATUS.SUCCESS]: (state, {type, retailPointID, registrationRequestStatus, kktStatus, kkmInfo}) => {
		return state.merge({
			loading: false,
			retailPointID,
			registrationRequestStatus,
			kktStatus,
			kkmInfo: fromJS(kkmInfo)
		})
	},
	[actEnums.UPDATE_STATUS.FAILURE]: (state) => {
		return state.setIn(['loading'], false)
	}
};


export default (createReducer) => createReducer(initialState, actionHandlers)