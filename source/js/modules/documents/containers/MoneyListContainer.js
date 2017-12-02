import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toJS from 'components/HOC/toJs';
import retailPointHOC from 'components/HOC/retailPointRequiredHOC';
import TitlePanel from '../components/TitlePanel'
import TitleActions from '../components/TitleActions'

import MoneyList from '../components/MoneyList'
import * as selectors from '../selectors/moneySelectors'
import * as actions from '../actions/moneyActions'
import ListFilter from "../components/ListFilter"
import ChequeMoneyFilter from "../components/ChequeMoneyFilter"
import LoaderPanel from "../../../common/uiElements/LoaderPanel"


@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@toJS
@retailPointHOC
class MoneyListContainer extends React.Component {
	componentDidMount() {
		this.props.getListMoney({isFirst: true});
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.selectedPoint !== nextProps.selectedPoint) {
			this.props.getListMoney({isFirst: true});
		}
	}

	// открытие фильтра
	handleOpenFilter() {
		this.filter && this.filter.open();
	}

	// сортировка по столбцам
	onSortList(sortField, sortDirection) {
		this.props.getListMoney({sortField, sortDirection});
	}

	// поиск по названию
	onFilterChanged(e) {
		this.props.setFilterParams({q: e.target.value});
		this.props.getListMoney();
	}

	// бесконечный скроллинг
	onInfinateScroll() {
		const {getListMoney, listState: {pos, countStep, total_count}} = this.props;
		if ((pos + countStep) < total_count) {
			getListMoney({step: true});
		}
	}

	// region Filter options
	isClosableFilter() {
		if (!this.chequeFilter)
			return true;
		return this.chequeFilter.isClosable();
	}

	handleChangeFilterDocType(event, type) {
		const {getListMoney, setFilterParams} = this.props;
		setFilterParams({docType: event.target.checked ? type : null});
		getListMoney();
	}

	handleChangeDate(date) {
		const {getListMoney, setFilterParams} = this.props;
		setFilterParams({
			dateFrom: date.dateFrom,
			dateTo: date.dateTo
		});
		getListMoney();
	}

	onClearFilter() {
		const {getListMoney, setFilterParams} = this.props;

		setFilterParams({
			dateFrom: null,
			dateTo: null,
			docType: null
		});
		getListMoney();
	}

	// endregion

	render() {
		const {listState, isFilter, searchText} = this.props;
		const {noItems, filter} = listState;
		const globalLoading = noItems === null;

		return (
			<div className="h100per">
				<TitlePanel>
					{!globalLoading && !noItems &&
					<TitleActions
						isFiltered={isFilter}
						onShowFilter={::this.handleOpenFilter}
						showButtons={true}/>}
				</TitlePanel>

				<ListFilter
					setInstance={f => this.filter = f}
					isClosable={::this.isClosableFilter}
					ignoreCloseSelect="no-close-date-selector">
					<ChequeMoneyFilter
						ref={f => this.chequeFilter = f}
						fromType="money"
						onChangeDocType={::this.handleChangeFilterDocType}
						onChangeDate={::this.handleChangeDate}
						onClearFilter={::this.onClearFilter}
						dateFrom={filter.dateFrom}
						dateTo={filter.dateTo}
						docType={filter.docType}/>
				</ListFilter>

				{!globalLoading && !noItems &&
				<MoneyList
					listState={listState}
					searchText={searchText}
					onHeadSortClick={::this.onSortList}
					onFilterChanged={::this.onFilterChanged}
					onInfinateScroll={::this.onInfinateScroll}/>}

				{!globalLoading && noItems &&
				<div className={`center_xy page_center_info page_center_info__orders0 ${listState.loading ? 'loading_block' : ''}`}>
					<i className="icon icon_orders"/>
					<div className="title">Чеки отсутствуют</div>
				</div>}

				<LoaderPanel loading={globalLoading}/>
			</div>
		)
	}
}

function mapStateToProps(state) {
	const listState = selectors.getMoneySection(state);
	const filter = selectors.getFilter(state);
	const isFilter = selectors.isFilteredList(state);
	const searchText = filter.get('q');

	return {listState, isFilter, filter, searchText};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			getListMoney: actions.getListMoney.request,
			setFilterParams: actions.setFilterParams
		}, dispatch)
	};
}


export default MoneyListContainer;