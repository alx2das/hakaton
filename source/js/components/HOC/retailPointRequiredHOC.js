/**
 * Created by RobertSabiryanov on 16.05.17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {getCurrentRetailPointId, getRetailPointListLoading} from 'modules/retailPoints/selectors/retailPointSelectors'
import {bindActionCreators} from 'redux';
import * as retailPointActions from 'modules/retailPoints/actions/retailPointActions';
import NotFoundRetailPoint from 'modules/retailPoints/components/NotFoundRetailPoint';

export default (Component) => {
	class RetailPointRequiredHOC extends React.Component {
		render() {
			const {selectedPoint, pointLoading, createRetailPoint} = this.props;
			if (selectedPoint) {
				return (<Component {...this.props}/>);
			}
			else if (pointLoading) {
				return (<div className='loading_block' style={{minHeight: '100%'}}></div>);
			}
			else {
				return <NotFoundRetailPoint onCreateRetailPoint={createRetailPoint}/>
			}
		}
	}

	function mapStateToProps(state) {
		return {
			selectedPoint: getCurrentRetailPointId(state),
			pointLoading: getRetailPointListLoading(state)
		}
	}

	function mapActions(dispatch) {
		return {
			createRetailPoint: bindActionCreators(retailPointActions.createRetailPoint, dispatch),
		}
	}

	return connect(mapStateToProps, mapActions)(RetailPointRequiredHOC);
}