import React from 'react'
import DefaultLayerLayout from 'components/DefaultLayerLayout'
import {withRouter} from 'react-router'
import retailPointRequiredHOC from 'components/HOC/retailPointRequiredHOC'
import {connect} from 'react-redux'
import toJS from 'components/HOC/toJs'
import {bindActionCreators} from 'redux'
import {LoaderPanel, DateFormat} from 'common/uiElements'

import OrderProductTable from '../components/order/OrderProductTable'
import * as selector from '../selectors/chequeSelectors'
import * as actions from '../actions/chequeActions'


function mapStateToProps(state, ownProps) {
	const {chequeId, shiftId} = ownProps.match.params;			// параметры URL
	const chequeViews = selector.getViewState(state);
	const viewState = (chequeId && shiftId) && chequeViews.get(chequeId);

	return {viewState, chequeId, shiftId}
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			getDetailCheque: actions.getDetailCheque.request
		}, dispatch)
	}
}

@withRouter
@retailPointRequiredHOC
@connect(mapStateToProps, mapDispatchToProps)
@toJS
export default class extends DefaultLayerLayout {

	componentWillMount() {
		const {chequeId, shiftId, getDetailCheque} = this.props;
		getDetailCheque({chequeId, shiftId});
	}

	render() {
		const {viewState} = this.props;
		const isLoading = !viewState || viewState.loading;

		return (
			<article className="page page__kassa_w900" {...this.layerOptions}>
				<div className="page_header">
					{this.getCloseButton()}
					{this.getToggleButton()}
					{!isLoading &&
					<h1>№{viewState.docNum} от <DateFormat value={viewState.beginDateTime}
														   format="dd.mm.yyyy HH:MM:ss"/></h1>}
				</div>

				<div className="page_content with_bottom_panel">
					<LoaderPanel loading={isLoading}>
						{!isLoading && <OrderProductTable
							canEdit={false}
							totalSum={viewState.actualSum}
							products={viewState.inventPositions}/>}
					</LoaderPanel>
				</div>
			</article>
		)
	}
}