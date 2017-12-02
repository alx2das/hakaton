import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toJS from 'components/HOC/toJs';
import retailPointRequiredHOC from 'components/HOC/retailPointRequiredHOC'
import {push} from 'connected-react-router'

import TitlePanel from '../components/TitlePanel'
import TitleActions from '../components/TitleActions'
import ListFilter from '../components/ListFilter'
import NoShopDocs from '../components/ishop/NoShopDocs'
import ShopDocs from '../components/ishop/ShopDocs'
import * as shopDocsSelectors from '../selectors/shopDocsSelectors'
import * as actions from '../actions/shopDocsActions'
import {LoaderPanel} from 'common/uiElements'
import DocumentsFilter from '../components/ishop/DocumentsFilter'

@retailPointRequiredHOC
@connect(mapStateToProps, mapDispatchToProps)
@toJS
class ShopDocsContainer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {pageSize: 50};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.selectedPoint != this.props.selectedPoint) {
			this.setFilter({restart: true});
			this.props.getDocuments();
		}
	}

	setFilter(filter) {
		this.props.setFilter({filter});
	}

	componentDidMount() {
		this.setFilter({
			restart: true,
			filter: {
				query: ''
			},
			count: this.state.pageSize,
			sortField: 'checkoutDateTime',
			sortDirection: 'desc'
		});
		this.props.getDocuments();
	}

	handleLoadMore() {
		this.props.getDocuments();
	}

	handleOpenFilter() {
		this.filter && this.filter.open();
	}

	handleChangeFilter(event) {
		let value = event.target.value;
		if (value && value.length >= 1) {
			this.setFilter({restart: true, filter: {query: value}});
			this.props.searchDocuments();
		} else if (!value) {
			this.setFilter({restart: true, filter: {query: ''}});
			this.props.searchDocuments();
		}
	}

	handleChangeFilterDocType(event, type) {
		this.setFilter({
			restart: true,
			filter: {
				docType: event.target.checked ? type : null
			}
		});
		this.props.searchDocuments();
	}

	handleChangeFilterStatus(event, status) {
		let selectedStates = this.props.selectedStates || [];
		const isSelected = selectedStates.indexOf(status) >= 0;
		if (isSelected && event.target.checked)
			return;

		if (event.target.checked) {
			selectedStates.push(status);
		} else {
			selectedStates = selectedStates.filter(s => s != status);
		}

		this.setFilter({
			restart: true,
			filter: {
				selectedStates: selectedStates
			}
		});
		this.props.searchDocuments();
	}

	handleChangeDate(range) {
		this.setFilter({
			restart: true,
			filter: {
				dateFrom: range.dateFrom,
				dateTo: range.dateTo
			}
		});
		this.props.searchDocuments();
	}

	handleSortList(sortField = 'beginDateTime', sortDirection = 'desc') {
		this.setFilter({sortField, sortDirection, restart: true});
		this.props.getDocuments();
	}

	handleOpenDocument(id) {
		const {push, selectedPoint} = this.props;
		push(`/documents/ishop/view/${selectedPoint}/${id}`);
	}

	handleClearFilter() {
		this.setFilter({
			restart: true,
			filter: {
				docType: null,
				selectedStates: null,
				dateFrom: null,
				dateTo: null
			}
		});
		this.props.getDocuments();
	}


	isClosableFilter() {
		if (!this.docFilter)
			return true;
		return this.docFilter.isClosable();
	}

	render() {
		const {
			documents, loading, totalCount, sortField, sortDirection,
			docType, selectedStates, dateFrom, dateTo, start, query
		} = this.props;

		const filterIsSet = docType != null || (selectedStates && selectedStates.length > 0) || !!dateFrom || !!dateTo;
		const noItems = !filterIsSet && totalCount == 0 && !query;

		return (
			<div className="h100per">
				<TitlePanel>
					<TitleActions showButtons={true}
								  isFiltered={filterIsSet}
								  onShowFilter={::this.handleOpenFilter}>
					</TitleActions>
				</TitlePanel>
				<ListFilter setInstance={f => this.filter = f}
							isClosable={::this.isClosableFilter}
							ignoreCloseSelect="date-select">
					<DocumentsFilter ref={f => this.docFilter = f}
									 onChangeDocType={::this.handleChangeFilterDocType}
									 onChangeStatus={::this.handleChangeFilterStatus}
									 onChangeDate={::this.handleChangeDate}
									 onClearFilter={::this.handleClearFilter}
									 dateFrom={dateFrom}
									 dateTo={dateTo}
									 docType={docType}
									 selectedState={selectedStates}/>
				</ListFilter>

				{noItems && !loading && <NoShopDocs />}
				{noItems && loading && <LoaderPanel loading={loading}/>}
				{!noItems && <ShopDocs documents={documents}
									   loading={loading}
									   totalCount={totalCount}
									   sortField={sortField}
									   sortDirection={sortDirection}
									   start={start}
									   onChangeFilter={::this.handleChangeFilter}
									   onLoadNext={::this.handleLoadMore}
									   onSort={::this.handleSortList}
									   onOpenDocument={::this.handleOpenDocument}/>}

			</div>
		);
	}

}


function mapStateToProps(state) {
	const filter = shopDocsSelectors.getFilter(state);
	return {
		documents: shopDocsSelectors.getDocuments(state),
		loading: shopDocsSelectors.getLoader(state),
		totalCount: shopDocsSelectors.getTotalCount(state),
		start: filter.get('start'),
		sortField: filter.get('sortField'),
		sortDirection: filter.get('sortDirection'),
		docType: filter.getIn(['filter', 'docType']),
		selectedStates: filter.getIn(['filter', 'selectedStates']),
		dateFrom: filter.getIn(['filter', 'dateFrom']),
		dateTo: filter.getIn(['filter', 'dateTo']),
		query: filter.getIn(['filter', 'query'])
	};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			setFilter: actions.setFilter,
			getDocuments: actions.getDocuments.request,
			searchDocuments: actions.searchDocuments,
			resendDocument: actions.reSendDocument.request,
			push: push
		}, dispatch)
	};
}


export default ShopDocsContainer;