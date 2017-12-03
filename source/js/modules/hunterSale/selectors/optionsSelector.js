import {createSelector} from 'reselect'

export const getOptionsSelector = (state) => {
    return state.get('options')
};