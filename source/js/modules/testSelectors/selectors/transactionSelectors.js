import {createSelector} from 'reselect'


export const getLayer = (state, {key}) => {
	return state.get('transactions').getIn(['layers', key]);
};

// export const createSelectors = () => {
// 	const queryFilter = (state, props) => {
// 		return state.get('transactions').getIn(['transactionList', props.listId, 'filter']);
// 	};
// 	const queryTransactions = (state, props) => {
// 		return state.get('transactions').getIn(['transactionList', props.listId, 'list'])
// 	};
//
// 	const getVisibleTransactions = createSelector(
// 		[queryFilter, queryTransactions],
// 		(visibilityFilter, transactions) => {
// 			switch (visibilityFilter) {
// 				case 'SHOW_COMPLETED':
// 					return transactions.filter(todo => todo.completed);
// 				case 'SHOW_ACTIVE':
// 					return transactions.filter(todo => !todo.completed);
// 				case 'SHOW_ALL':
// 				default:
// 					return transactions
// 			}
// 		}
// 	);
//
//
// 	const getVisibleValues = createSelector([getVisibleTransactions],
// 		(transactions) => transactions.map(s => s.id)
// 	);
//
//
// 	const getTotalSum = createSelector([getVisibleValues],
// 		(visibleValues) => {
// 			return visibleValues.reduce((prev, cur) => {
// 				return prev + cur;
// 			}, 0)
// 		});
//
// 	return {
// 		getVisibleTransactions, getTotalSum
// 	}
// };


