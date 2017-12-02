import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import toJS from 'components/HOC/toJs'
import DefaultLayerLayout from 'components/DefaultLayerLayout'
import {withRouter} from 'react-router'
import {LoaderPanel, DateFormat, ConfirmPopupService} from 'common/uiElements'
import ShopDocView from  '../components/ishop/ShopDocView'
import * as selectors from '../selectors/shopDocsSelectors'
import * as actions from '../actions/shopDocsActions'
import {getDocStatusName, getDocTypeName, DOCUMENT_STATUS} from '../enums'

const statusCssClass = {
	[DOCUMENT_STATUS.QUEUED]: 'info_label__vozvrat_queue',
	[DOCUMENT_STATUS.PENDING]: 'info_label__vozvrat_processing',
	[DOCUMENT_STATUS.FAILED]: 'info_label__vozvrat_error',
	[DOCUMENT_STATUS.PRINTED]: 'info_label__vozvrat_done',
	[DOCUMENT_STATUS.WAIT_FOR_CALLBACK]: 'info_label__vozvrat_done',
	[DOCUMENT_STATUS.COMPLETED]: 'info_label__vozvrat_done'
};

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@toJS
class ShopDocViewContainer extends DefaultLayerLayout {

	componentDidMount() {
		super.componentDidMount();
		const {point, id, getDocumentDetails}=this.props;
		getDocumentDetails({point, id});
	}

	handleResend() {
		const {id, point, resend}=this.props;
		this.resendPopup.open().then(() => resend({id, point}));
	}

	renderStatus(status, creationDateTime) {
		const className = ['info_label   middle', statusCssClass[status] || ''].join(' ');
		return (<div class={className}>{getDocStatusName(status)}, <DateFormat value={creationDateTime}
																			   format="dd.mm.yyyy HH:MM"/></div>)
	}

	render() {
		const {loading, error, document} = this.props;

		return (
			<article className="page page__kassa_w900" {...this.layerOptions}>
				<div className="page_header">
					{this.getCloseButton()}
					{this.getToggleButton()}
					{document &&
					<h1>Документ №{document.docNum}
					</h1>}
					{document && this.renderStatus(document.status, document.creationDateTime)}
				</div>
				<div className='page_content  with_bottom_panel'>
					<LoaderPanel loading={loading}>
						{document && <ShopDocView document={document}
												  onResend={::this.handleResend}/>}
						{error && <div className="info info_error">{error}</div>}
					</LoaderPanel>
				</div>

				<ConfirmPopupService ref={p => this.resendPopup = p}
									 cancelName="Отмена"
									 okName="Подтвердить"
									 text="Обратите внимание, перепроводить документ следует только в том случае, если он отсутствует в ОФД. Проверить наличие документа можно в личном кабинете ОФД"/>
			</article>
		);
	}
}

function mapStateToProps(state, props) {
	const {id, point}=props.match.params;
	const view = selectors.getDocumentView(id)(state);
	return {
		document: view ? view.get('document') : null,
		loading: view ? view.get('loading') : false,
		error: view ? view.get('error') : null,
		id, point
	};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			getDocumentDetails: actions.getDocumentDetails.request,
			resend: actions.reSendDocument.request
		}, dispatch)
	};
}


export default ShopDocViewContainer;