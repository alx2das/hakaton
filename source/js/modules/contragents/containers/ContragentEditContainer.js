import React from 'react'
import DefaultLayerLayout from 'components/DefaultLayerLayout'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import retailPointHOC from 'components/HOC/retailPointRequiredHOC'
import toJS from 'components/HOC/toJs'
import {bindActionCreators} from 'redux'
import {formValueSelector} from 'redux-form/immutable'
import LoaderBlock from 'common/uiElements/LoaderBlock'

import * as selectors from '../selectors/contragentSelectors'
import * as actions from '../actions/contragentActions'
import createEditComponent from '../components/ContragentEditComponent'
import {ConfirmPopupService} from 'common/uiElements'
import {ROLES} from '../enums/options'

const getFormName = code => `editContragent_${code}`;


@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@retailPointHOC
@toJS
class ContragentEditContainer extends DefaultLayerLayout {
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
		if (this.props.contragent.success)
			this.onCloseForm();
	}

	componentWillUnmount() {
		this.props.clearSateContragent(this.props.code);
	}

	// при отправке формы
	onSubmitForm(props) {
		const {editContragent, code} = this.props;

		const propsForm = {
			name: props.get('name'),
			password: props.get('password'),
			locked: props.get('locked'),
			roles: props.get('roles').toJS().reduce((prev, val) => val.selected ? [...prev, val.name] : prev, [])
		};

		editContragent({code, ...propsForm});
	}

	// при удалении контрагента
	onDeleteContragent() {
		const {deleteContragent, code} = this.props;
		this.deletePopup.open()
			.then(() => deleteContragent(code));
	}

	// закрытие слоя
	onCloseForm() {
		this.closeLayer();
	}

	render() {
		const {isNew, contragent, showPassword, isLoading} = this.props;
		const title = isNew ? 'Создание контрагента' : 'Редактирование контрагента';

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
					contragent={contragent}
					initialValues={contragent}
					showPassword={showPassword}
					isNew={isNew}
					onSubmitForm={::this.onSubmitForm}
					onCloseForm={::this.onCloseForm}
					onDeleteContragent={::this.onDeleteContragent}/>}

				<ConfirmPopupService
					ref={p => this.deletePopup = p}
					title='Удаление контрагента'
					text='Контрагент будет удален из списка контрагентов всех точек'
					okName="Подтвердить"
					cancelName="Отмена"/>

				<LoaderBlock loading={isLoading} />
			</article>
		)
	}
}

function mapStateToProps(state, ownProps) {
	let {action, code} = ownProps.match.params;			// параметры URL
	const editState = selectors.getEditSection(state);	// state для всех форм
	const isNew = !(action === 'edit' && code);			// добавить/редактировать

	code = isNew ? 'newItem' : code;
	let contragent = editState.getIn([code]);
	const isLoading = !contragent;

	if (isLoading) {
		contragent = editState.getIn(['newItem']);
	}

	let showPassword = false;
	const roles = formValueSelector(getFormName(code))(state, 'roles');
	if (roles) {
		showPassword = roles.some(role => role.get('selected') && ROLES[role.get('name')].password);
	}

	return {isLoading, code, isNew, contragent, showPassword};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			editContragent: actions.editContragent.request,
			deleteContragent: actions.deleteContragent,
			clearSateContragent: actions.clearStateContragent,
			loadingDetail: actions.loadingDetail
		}, dispatch)
	};
}


export default ContragentEditContainer;