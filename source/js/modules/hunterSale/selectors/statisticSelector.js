import {createSelector} from 'reselect'

export const getStatisticSelector = (state) => {
    return state.get('statistic')
};