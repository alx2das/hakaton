import React from 'react'
import DefaultLayerLayout from 'components/DefaultLayerLayout'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import retailPointHOC from 'components/HOC/retailPointRequiredHOC'
import toJS from 'components/HOC/toJs'
import {bindActionCreators} from 'redux'
import LoaderBlock from 'common/uiElements/LoaderBlock'

import * as selectors from '../selectors/discountSelectors'
import * as actions from '../actions/discountActions'
import createEditComponent from '../components/DiscountEditComponent'
import {ConfirmPopupService} from 'common/uiElements'

const getFormName = code => `editDiscount_${code}`;


@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@retailPointHOC
@toJS
class DiscountEditContainer extends DefaultLayerLayout {
	constructor(props) {
		super(props);
		this.EditComponent = createEditComponent(getFormName(props.code))
	}

	componentWillMount() {
		const {isLoading, code, loadingDetail} = this.props;
		if (isLoading)
			loadingDetail({code});
	}

	componentDidUpdate() {
		if (this.props.discount.success)
			this.onCloseForm();
	}

	// при отправке формы
	onSubmitForm(props) {
		const {editDiscount, code} = this.props;

		const propsForm = {
			name: props.get('name'),
			value: props.get('value')
		};

		editDiscount({code, ...propsForm});
	}

	// при удалении скидки
	onDeleteDiscount() {
		const {deleteDiscount, code} = this.props;
		this.deletePopup.open()
			.then(() => deleteDiscount(code));
	}

	// закрытие слоя
	onCloseForm() {
		this.closeLayer();
	}

	render() {
		const {isNew, discount, isLoading} = this.props;
		const title = isNew ? 'Создание скидки' : 'Редактирование скидки';

		const EditComponent = this.EditComponent;

		return (
			<article className="page" {...this.layerOptions}>
				<div className="page_header">
					{this.getCloseButton()}
					{this.getToggleButton()}
					<h1>{title}</h1>
				</div>

				{!isLoading &&
				<EditComponent
					discount={discount}
					initialValues={discount}
					isNew={isNew}
					onSubmitForm={::this.onSubmitForm}
					onCloseForm={::this.onCloseForm}
					onDeleteDiscount={::this.onDeleteDiscount} />}

				<ConfirmPopupService
					ref={p => this.deletePopup = p}
					title='Удалить скидку'
					text='Скидка будет удалена из списков скидок всех точек'
					okName="Подтвердить"
					cancelName="Отмена"/>

				<LoaderBlock loading={isLoading} />
			</article>
		);
	}
}

function mapStateToProps(state, ownProps) {
	let {action, code} = ownProps.match.params;			// параметры URL
	const editState = selectors.getEditState(state);	// state для всех форм
	const isNew = !(action === 'edit' && code);

	code = isNew ? 'newItem' : code;
	let discount = editState.getIn([code]);
	const isLoading = !discount;

	if (isLoading) {
		discount = editState.getIn(['newItem']);
	}

	return {isLoading, code, isNew, discount};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			editDiscount: actions.editDiscount.request,
			deleteDiscount: actions.deleteDiscount,
			loadingDetail: actions.loadingDetail
		}, dispatch)
	};
}


export default DiscountEditContainer;