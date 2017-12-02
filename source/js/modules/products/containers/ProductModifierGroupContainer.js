import React from 'react'
import PropTypes from 'prop-types';
import DefaultLayerLayout from 'components/DefaultLayerLayout'
import {bindActionCreators} from 'redux'
import * as productActions from '../actions/productActions'
import * as modifierActions from '../actions/modifierActions'
import * as modifierSelectors from '../selectors/modifierSelectors'
import {connect} from 'react-redux';
import {withRouter} from 'react-router'
import modifierGroupForm from '../components/ProductCard/ModifierGroupForm'
import toJS from 'components/HOC/toJs'
import {change, formValueSelector} from 'redux-form/immutable'
import {ConfirmPopupService, LoaderBlock} from 'common/uiElements'
import {notify} from 'common/uiElements/Notify'

import GROUP_TYPE from '../enums/modifierGroupType'

const VIEW_MODE = {NEW: 'new', COPY: 'copy'}

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@toJS
class ProductModifierGroupContainer extends DefaultLayerLayout {

	constructor(props) {
		super(props);
		this.groupForm = modifierGroupForm(this.props.formKey);
		this.state = {viewMode: VIEW_MODE.NEW};
	}

	onSaveGroup(formProps) {
		const {saveGroup, group, point}=this.props;
		const editGroup = {
			code: group.code,
			inventCode: group.inventCode,
			isNew: group.isNew,
			name: formProps.get('name'),
			modifierGroupType: formProps.get('modifierGroupType'),
			modifiers: formProps.get('modifiers').toJS()
		};

		if (formProps.get('modifierGroupType') == GROUP_TYPE.REQUIRED
			&& formProps.get('modifiers').size > 0
			&& formProps.get('modifiers').filter((item) => item.get('selected')).size == 0
		) {
			this.props.dispatch(notify.error('Тип группы обязательный, необходимо выбрать товары по умолчанию'));
		} else {
			saveGroup({point, group: editGroup});
		}
	}

	componentWillReceiveProps(props) {
		const {group}=props;
		if (!group || group.saved) {
			this.onCancel();
		}
	}

	onCancel() {
		this.closeLayer();
	}

	handleRemoveGroup() {
		this.removePopup.open().then(() => {
			const {removeGroup, group, point}=this.props;
			removeGroup({point, groupCode: group.code});
		});
	}

	handleChangeViewMode(mode) {
		this.setState({viewMode: mode});
		if (mode === VIEW_MODE.COPY)
			this.handleSearchGroups('');
	}

	handleSearchGroups(val) {
		const query = val || '';
		if (query.length == 0 || query.length >= 2) {
			this.props.searchGroups({formKey: this.props.formKey, query});
		}
	}

	render() {
		const {group, isRequiredGroup, searchGroupsState, modifiers}=this.props;
		const ModifierGroupForm = this.groupForm;
		const {viewMode}=this.state || {};
		const title = group && group.isNew ? 'Добавление группы' : 'Редактирование группы';

		return (
			<article className="page page__add_mod_group" {...this.layerOptions}>
				<div className="page_header">
					{this.getCloseButton()}
					{this.getToggleButton()}
					<h1>{title}</h1>
				</div>
				{!group && <LoaderBlock loading={true}/>}
				{group && <ModifierGroupForm initialValues={group}
											 onSave={::this.onSaveGroup}
											 onRemove={::this.handleRemoveGroup}
											 onCancel={::this.onCancel}
											 onSearchGroups={::this.handleSearchGroups}
											 onChangeViewMode={::this.handleChangeViewMode}

											 isRequiredGroup={isRequiredGroup}
											 searchGroup={searchGroupsState}
											 modifiers={modifiers}
											 viewMode={viewMode}
											 group={group}
				/>}
				<ConfirmPopupService
					ref={p => this.removePopup = p}
					okName="Подтвердить"
					cancelName="Отмена"
					title="Удаление группы"/>
			</article>
		);
	}
}

export default ProductModifierGroupContainer;

function mapStateToProps(state, ownProps) {
	const {location}=ownProps;
	const {groupCode, point} = location.state || {};
	const group = modifierSelectors.getGroupByCode(groupCode)(state);
	const formKey = 'modifier_group_' + groupCode;
	const searchGroupsState = modifierSelectors.getSearchGroups(formKey)(state);
	const isRequiredGroup = formValueSelector(formKey)(state, 'modifierGroupType') == GROUP_TYPE.REQUIRED;
	const modifiers = formValueSelector(formKey)(state, 'modifiers');

	return {
		point,
		group,
		isRequiredGroup,
		searchGroupsState,
		formKey,
		modifiers
	};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			saveGroup: modifierActions.saveGroup.request,
			removeGroup: modifierActions.removeGroup.request,
			searchGroups: modifierActions.searchGroups.request
		}, dispatch),
		dispatch
	}
}