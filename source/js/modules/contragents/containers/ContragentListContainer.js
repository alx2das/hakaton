import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import retailPointHOC from 'components/HOC/retailPointRequiredHOC';
import toJS from 'components/HOC/toJs';
import {push} from 'connected-react-router';
import LoaderBlock from 'common/uiElements/LoaderBlock';
import { destroy } from 'redux-form';

import * as selectors from '../selectors/contragentSelectors'
import * as actions from '../actions/contragentActions'
import ContragentListComponent from '../components/ContragentListComponent'


@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@retailPointHOC
@toJS
class ContragentListContainer extends React.Component {
	componentWillMount() {
		this.props.getListContragent({isFirst: true});
	}

	componentWillReceiveProps(nextProps) {
		const {getListContragent, selectedPoint} = this.props;
		if (selectedPoint !== nextProps.selectedPoint)
			getListContragent({isFirst: true});
	}

	// добавить контрагента
	onAddFormLayer() {
		this.props.push({pathname: `/contragents/add`});
	}

	// детальный просмотр контрагента
	onOpenDetailLayout(item) {
		const {openContragent, push} = this.props;
		openContragent(item);
		push({pathname: `/contragents/edit/${item.code}`});
	}

	// сортировка по столбцам
	onSortList(sortField, sortDirection) {
		this.props.getListContragent({sortField, sortDirection});
	}

	// поиск по названию
	onSearchByName(e) {
		let val = e.target.value;
		this.props.getListContragent({q: val});
	}

	// бесконечный скроллинг
	onInfinateScroll() {
		const {getListContragent, listState: {pos, countStep, total_count}} = this.props;
		if ((pos + countStep) < total_count) {
			getListContragent({step: true});
		}
	}

	// переключатель: Только кассиры
	onCheckedCashier() {
		const {getListContragent, listState: {isCashier}} = this.props;
		getListContragent({
			isCashier: !isCashier
		});
	}

	render() {
		const {listState} = this.props;

		const noItems = listState.noItems;
		const globalLoading = noItems === null;

		return (
			<div className="h100per">
				{!globalLoading &&
				<div className="title_panel">
					<h1>Контрагенты</h1>
					{!noItems &&
					<div className="title_actions">
						<button className="button small icon-plus"
								onClick={() => this.onAddFormLayer()}>Добавить контрагента
						</button>
					</div>}
				</div>}

				{!globalLoading && !noItems &&
				<ContragentListComponent
					listState={listState}
					onOpenDetailLayout={::this.onOpenDetailLayout}
					onSortList={::this.onSortList}
					onFilterChanged={::this.onSearchByName}
					onInfinateScroll={::this.onInfinateScroll}
					onCheckedCashier={::this.onCheckedCashier}/>}

				{!globalLoading && noItems &&
				<div className="center_xy page_center_info page_center_info__contragents0">
					<div className="title">Контрагенты не заданы</div>
					<div className="form_buttons row">
						<button className="button small icon-plus"
								onClick={() => this.onAddFormLayer()}>Добавить контрагента
						</button>
					</div>
				</div>}

				<LoaderBlock loading={globalLoading}/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const listState = selectors.getListSection(state);
	return {listState};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			push,
			getListContragent: actions.getListContragents.request,
			openContragent: actions.openContragent
		}, dispatch)
	};
}


export default ContragentListContainer;