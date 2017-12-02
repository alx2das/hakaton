import React from 'react';
import DefaultLayerLayout from 'components/DefaultLayerLayout'
import * as productActions from '../actions/productActions'
import * as modifierActions from '../actions/modifierActions'
import * as layerActions from '../actions/layerActions'
import {bindActionCreators} from 'redux'
import * as productSelectors from '../selectors/productsSelectors'
import * as modifierSelectors from '../selectors/modifierSelectors'
import * as layerSelectors from '../selectors/layerSelectors'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import modifierForm from '../components/ProductCard/ModifierForm'
import toJS from 'components/HOC/toJs'
import {getFormValues} from 'redux-form/immutable'
import {ConfirmPopupService} from 'common/uiElements'
import {notify} from 'common/uiElements/Notify'
import GROUP_TYPE from '../enums/modifierGroupType'

import {uuid} from 'infrastructure/utils/uuidGenerator'

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@toJS
class ProductModifierContainer extends DefaultLayerLayout {

	constructor(props) {
		super(props);
		this.formKey = getFormKey(this.props.groupCode, this.props.modifierCode);
		this.modifierForm = modifierForm(this.formKey);
	}

	componentWillReceiveProps(props) {
		const {layer}=props;
		if (layer && layer.closed) {
			this.closeLayer();
		}
	}

	componentDidMount() {
		super.componentDidMount();
		const {setDefaultSearchProduct, modifier, group, initLayer}=this.props;

		if (!group) {
			this.onCancel();
			return;
		}

		initLayer({layerId: this.getLayerId()});

		if (modifier) {
			const formKey = getSearchFormKey(this.formKey);
			setDefaultSearchProduct({
				formKey,
				defaultsProduct: [{
					name: modifier.name,
					inventCode: modifier.barcode,
					price: modifier.price
				}]
			});
		} else {
			this.onSearchProducts('');
		}
	}

	onSearchProducts(val) {
		const searchText = val || '';
		if (searchText.length == 0 || searchText.length >= 2) {
			const formKey = getSearchFormKey(this.formKey);
			this.props.searchProducts({formKey, query: searchText});
		}
	}

	saveGroupChanges() {
		const {groupCode, modifier, updateGroup, point}=this.props;
		const meta = {
			success: modifier ? 'Модификатор обновлен' : 'Модификатор добавлен',
			error: modifier ? 'Не удалось обновить модификатор' : 'Не удалось добавить модификатор',
		};
		const layerId = this.getLayerId();
		updateGroup({groupCode, point, meta, layerId});
	}

	onSave(formProps) {
		const {saveModifier, groupCode, modifier}=this.props;
		const editModifier = {
			code: modifier ? modifier.code : uuid(),
			name: formProps.get('name'),
			goodsName: formProps.get('goodsName'),
			barcode: formProps.get('barcode'),
			qty: formProps.get('qty'),
			price: formProps.get('price'),
			selected: formProps.get('selected')
		};
		const group = this.props.getGroup(groupCode);
		const selectedCount = group.get('modifiers').filter((item) => item.get('selected')).size;
		if (group.get('modifierGroupType') == GROUP_TYPE.REQUIRED
			&& !formProps.get('selected')
			&& (selectedCount == 0 || (modifier ? (this.props.getModifier(groupCode, modifier.code).get('selected') && selectedCount == 1) : selectedCount == 0))
		) {
			this.props.dispatch(notify.error('Тип группы обязательный, необходимо указать модификатор по умолчанию'));
		} else {
			saveModifier({modifier: editModifier, groupCode});
			this.saveGroupChanges();
		}
	}

	onCancel() {
		this.closeLayer();
	}

	onRemove() {
		const {groupCode, modifier}=this.props;
		const group = this.props.getGroup(groupCode);
		if (group.get('modifierGroupType') == GROUP_TYPE.REQUIRED
			&& this.props.getModifier(groupCode, modifier.code).get('selected')
			&& group.get('modifiers').filter((item) => item.get('selected')).size == 1
			&& group.get('modifiers').size > 1
		) {
			this.props.dispatch(notify.error('Тип группы обязательный, нельзя удалить единственный модификатор по умолчанию'));
		} else {
			this.removePopup.open().then(() => {
				const {removeModifier, groupCode, modifier}=this.props;
				if (modifier) {
					removeModifier({groupCode, modifierCode: modifier.code});
					this.saveGroupChanges();
				}
			});
		}
	}

	render() {
		const {modifier, searchProductsView, layer}=this.props;
		const initialValues = modifier || {qty: 1, isNew: true};
		const ModifierForm = this.modifierForm;
		const title = modifier ? 'Редактирование модификатора' : 'Добавление модификатора';

		return (
			<article className="page" {...this.layerOptions}>
				<div className="page_header">
					{this.getCloseButton()}
					{this.getToggleButton()}
					<h1>{title}</h1>
				</div>
				<ModifierForm initialValues={initialValues}
							  saving={layer && layer.saving}
							  onSave={::this.onSave}
							  onRemove={::this.onRemove}
							  onCancel={::this.onCancel}
							  onSearchProducts={::this.onSearchProducts}
							  searchProductsView={searchProductsView}/>
				<ConfirmPopupService
					ref={p => this.removePopup = p}
					okName="Подтвердить"
					cancelName="Отмена"
					title="Удаление модификатора"/>
			</article>
		);
	}
}

export default ProductModifierContainer;

function mapStateToProps(state, ownProps) {
	const {location, layerId}=ownProps;
	const {groupCode, modifierCode, point} = location.state || {};

	const group = modifierSelectors.getGroupByCode(groupCode)(state);
	const modifier = modifierCode ? modifierSelectors.getModifierByCode(groupCode, modifierCode)(state) : null;

	const formKey = getFormKey(groupCode, modifierCode);
	const layer = layerSelectors.getLayer(layerId)(state);

	const searchFormKey = getSearchFormKey(formKey);
	let searchProductsView = productSelectors.getSearchProducts(searchFormKey)(state);

	const getGroup = (groupCode) => modifierSelectors.getGroupByCode(groupCode)(state);
	const getModifier = (groupCode, modifierCode) => modifierSelectors.getModifierByCode(groupCode, modifierCode)(state);

	return {groupCode, modifier, point, modifierCode, searchProductsView, group, layer, getGroup, getModifier};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			saveModifier: modifierActions.saveModifier,
			removeModifier: modifierActions.removeModifier,
			updateGroup: modifierActions.updateGroup,
			searchProducts: productActions.searchProducts.request,
			setDefaultSearchProduct: productActions.setDefaultSearchProduct,
			initLayer: layerActions.initLayer
		}, dispatch),
		dispatch
	}
}

function getFormKey(groupId, modifierId = null) {
	return `modifierForm_${groupId}_${modifierId}`;
}

function getSearchFormKey(formKey) {
	return `search_field_${formKey}`;
}