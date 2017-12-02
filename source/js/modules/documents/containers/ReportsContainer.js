import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import toJS from 'components/HOC/toJs'
import retailPointHOC from 'components/HOC/retailPointRequiredHOC'
import TitlePanel from '../components/TitlePanel'
import ReportForm from '../components/ReportFormComponent'
import * as accountSelector from 'modules/account/selectors/accountSelectors'
import * as selectors from '../selectors/reportSelectors'
import * as actions from '../actions/reportActions'
import {formValueSelector, reset} from 'redux-form/immutable'
import dateHelper from 'common/helpers/dateHelper'
import {getRetailPointList} from 'modules/retailPoints/selectors/retailPointSelectors'

@retailPointHOC
@connect(mapStateToProps, mapDispatchToProps)
@toJS
class ReportsContainer extends React.Component {

	componentDidMount() {
		this.props.resetForm();
	}

	getCurrentPointName() {
		const {points, selectedPoint}=this.props;
		if (selectedPoint && points) {
			const point = points.filter(point => point.id === selectedPoint)[0];
			return point ? point.name : '';
		}
		return '';
	}

	onSubmitForm(props) {
		const {salesReportAction, sending, selectedPoint, resetForm, errorValidDate} = this.props;
		if (sending)
			return;
		const form = props.toJS();

		if (form.beginDate > form.endDate) {
			errorValidDate();
			return;
		}

		form.beginDate = dateHelper.setStartDate(form.beginDate);
		form.endDate = dateHelper.setEndDate(form.endDate);

		if (form.sendToEmail) {	// скачать отчет
			salesReportAction({
				beginDate: form.beginDate,
				endDate: form.endDate,
				email: form.email
			});
		} else {
			const downloadLink = document.createElement("a");
			const beginDateStr = dateHelper.dateFormat(form.beginDate, 'serverDateTime');
			const endDateStr = dateHelper.dateFormat(form.endDate, 'serverDateTime');

			const [protocol, _, host] = window.location.href.split("/").slice(0, 3);
			const today = new Date();
			const pointName = this.getCurrentPointName();

			downloadLink.href = `${protocol}//${host}/api/v1/retail-point/${selectedPoint}/downloadSalesReport?beginDate=${beginDateStr}&endDate=${endDateStr}`;
			downloadLink.download = `${pointName}_${dateHelper.dateFormat(today, 'yyyy-mm-dd')}.xls`;
			downloadLink.target = "_blank";
			document.body.appendChild(downloadLink);
			downloadLink.click();
			document.body.removeChild(downloadLink);

			console.log(downloadLink.href);

			resetForm();
		}
	}

	render() {
		const {sendToEmail, sending, formErrors} = this.props;

		return (
			<div>
				<TitlePanel/>
				<ReportForm sendToEmail={sendToEmail}
							sending={sending}
							formErrors={formErrors}
							className="widget_block  report_request_form"
							onSubmitForm={::this.onSubmitForm}/>
			</div>
		);
	}

}

const reportFormSelector = formValueSelector('report_form');

function mapStateToProps(state, ownProps) {
	const report = selectors.getSection(state);
	const sendToEmail = reportFormSelector(state, 'sendToEmail');
	const points = getRetailPointList(state);
	return {
		sending: report.get('sending'),
		sent: report.get('sent'),
		formErrors: report.get('error'),
		sendToEmail,
		points
	};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			salesReportAction: actions.salesReport.request,
			resetForm: actions.resetForm,
			errorValidDate: actions.errorValidDate,
			reset: reset
		}, dispatch)
	};
}


export default ReportsContainer;