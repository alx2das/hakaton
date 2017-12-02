import {Map, fromJS} from 'immutable'
import * as enums from '../actions/reportActions'


export const initialState = Map({
	sending: false,
	sent: false,
	error: null
});

export const actionHandlers = {
	[enums.SALES_REPORT.REQUEST]: (state, props) => {
		return state.merge({
			sending: true,
			sent: false,
			error: null
		});
	},
	[enums.SALES_REPORT.SUCCESS]: (state, props) => {
		return state.merge({
			sending: false,
			sent: true
		});
	},
	[enums.SALES_REPORT.FAILURE]: (state, {error}) => {
		return state.merge({
			sending: false,
			sent: true,
			error: fromJS(error)
		});
	},
	[enums.RESET]: () => initialState,
	[enums.ERROR_VALID_DATE]: (state) => {
		console.log(enums.ERROR_VALID_DATE);
		return state.merge({
			error: {
				validDate: true
			}
		})
	}
};


export default (createReducer) => createReducer(initialState, actionHandlers);