import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import retailPointHOC from 'components/HOC/retailPointRequiredHOC';
import toJS from 'components/HOC/toJs';
import {bindActionCreators} from 'redux';
import {push} from 'connected-react-router';
import LoaderBlock from 'common/uiElements/LoaderBlock'

import * as selectors from '../selectors/discountSelectors'
import * as actions from '../actions/discountActions'
import DiscountListComponent from '../components/DiscountListComponent'


@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@retailPointHOC
@toJS
class DiscountListContainer extends React.Component {
	componentWillMount() {
		this.props.getListDiscount({isFirst: true});
	}

	componentWillReceiveProps(nextProps) {
		const {getListDiscount, selectedPoint} = this.props;
		if (selectedPoint !== nextProps.selectedPoint)
			getListDiscount({isFirst: true});
	}

	// Добавить скидку
	onAddFormLayer() {
		this.props.push({pathname: `/discount/add`});
	}

	// детальный просмотр контрагента
	onOpenDetailLayout(item) {
		const {openDiscount, push} = this.props;

		openDiscount(item);
		push({pathname: `/discount/edit/${item.code}`});
	}

	// сортировка по столбцам
	onSortList(sortField, sortDirection) {
		this.props.getListDiscount({sortField, sortDirection});
	}

	// поиск по названию
	onSearchByName(e) {
		let val = e.target.value;
		this.props.getListDiscount({q: val});
	}

	// бесконечный скроллинг
	onInfinateScroll() {
		const {getListDiscount, listState: {pos, countStep, total_count}} = this.props;
		if ((pos + countStep) < total_count) {
			getListDiscount({step: true});
		}
	}

	render() {
		const {listState} = this.props;

		const noItems = listState.noItems;
		const globalLoading = noItems === null;

		return (
			<div className="h100per">
				{!globalLoading &&
				<div className="title_panel">
					<h1>Скидки</h1>
					{!noItems &&
					<div className="title_actions">
						<button className="button small icon-plus"
								onClick={() => this.onAddFormLayer()}>Добавить скидку
						</button>
					</div>}
				</div>}

				{!globalLoading && !noItems &&
				<DiscountListComponent
					listState={listState}
					onOpenDetailLayout={::this.onOpenDetailLayout}
					onSortList={::this.onSortList}
					onFilterChanged={::this.onSearchByName}
					onInfinateScroll={::this.onInfinateScroll}/>}

				{!globalLoading && noItems &&
				<div className="center_xy page_center_info page_center_info__discount0">
					<i className="icon icon_discount"/>
					<div className="title">Скидки не созданы</div>
					<p>Скидки можно применять ко всему чеку на кассе</p>
					<div className="form_buttons row">
						<button className="button small icon-plus"
								onClick={() => this.onAddFormLayer()}>Добавить скидку
						</button>
					</div>
				</div>}

				<LoaderBlock loading={globalLoading}/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const listState = selectors.getListState(state);
	return {listState};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			push,
			getListDiscount: actions.getListDiscount.request,
			openDiscount: actions.openDiscount
		}, dispatch)
	};
}


export default DiscountListContainer;