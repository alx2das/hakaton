import {createSelector} from 'reselect'
import {getPointId} from 'modules/core/selectors'


export const getRegisterKKTState = (state) => state.get('testRegisterKKT');