import React from 'react'
import PropTypes from 'prop-types'
import DefaultLayerLayout from 'components/DefaultLayerLayout'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {LoaderBlock} from 'common/uiElements'
import toJS from 'components/HOC/toJs'
import {ConfirmPopupService} from 'common/uiElements'
import {notify} from 'common/uiElements/Notify'
import {push} from 'connected-react-router'
import createProductCard from '../components/ProductCard/ProductCard'
import * as productActions from '../actions/productActions'
import * as modifierActions from '../actions/modifierActions'
import * as productsSelectors from '../selectors/productsSelectors'
import * as modifierSelectors from '../selectors/modifierSelectors'
import GROUP_TYPE from '../enums/modifierGroupType'

export class EditProductContainer extends DefaultLayerLayout {

	constructor(props) {
		super(props);
		this.productCard = createProductCard('productCard_' + this.props.inventCode);
		this.state = {activeTab: 'info'};
	}

	componentWillReceiveProps(props) {
		const {productView}=props;
		if (productView && (productView.saved || productView.removed))
			this.closeLayer();
	}

	componentDidMount() {
		super.componentDidMount();
		const {point, inventCode, getDetails, setNewProduct, urlAction, productView}=this.props;
		if (urlAction == 'view')
			getDetails({inventCode, point});
		if (urlAction == 'add' && productView == null)
			setNewProduct({inventCode});
	}

	onSaveProduct(productProps) {
		const {productView:{product}, saveProduct, inventCode} = this.props;
		let editProduct = Object.assign({}, product);

		editProduct.name = productProps.get('name');
		editProduct.barcode = productProps.get('barcode');
		editProduct.inventCode = productProps.get('inventCode');
		editProduct.price = productProps.get('price');
		editProduct.minPrice = productProps.get('minPrice');
		editProduct.measure = productProps.get('measure');
		editProduct.alcoholType = productProps.get('alcoholType');
		editProduct.vatTag = productProps.get('vatTag');
		editProduct.taxMode = productProps.get('taxMode');
		editProduct.requiredModifiers = product.modifiers;

		saveProduct({point: this.props.point, product: editProduct, inventCode});
	}

	onRemoveProduct() {
		const {inventCode, point, removeProduct} = this.props;
		removeProduct({point, inventCode});
	}

	onAddGroup() {
		const {point, openGroup, inventCode}=this.props;
		openGroup({point, inventCode});
	}

	onOpenGroup(groupCode) {
		const {point, openGroup, inventCode}=this.props;
		openGroup({groupCode, point, inventCode});
	}

	onAddModifier({groupCode}) {
		const {point, push}=this.props;
		push('/product/modifier', {groupCode, point});
	}

	onOpenModifier({modifierCode, groupCode}) {
		const {point, push}=this.props;
		push('/product/modifier', {modifierCode, groupCode, point});
	}

	onRemoveModifier({modifierCode, groupCode}) {
		const group = this.props.getGroup(groupCode);
		if (group.get('modifierGroupType') == GROUP_TYPE.REQUIRED
			&& this.props.getModifier(groupCode, modifierCode).get('selected')
			&& group.get('modifiers').filter((item) => item.get('selected')).size == 1
			&& group.get('modifiers').size > 1
		) {
			this.props.dispatch(notify.error('Тип группы обязательный, нельзя удалить единственный модификатор по умолчанию'));
		} else {
			this.removePopup.open()
				.then(() => {
					this.props.removeModifier({groupCode, modifierCode});
					this.saveGroupChanges(groupCode, {error: 'Не удалось удалить модификатор'});
				});
		}
	}

	onToggleModifier({modifierCode, groupCode}) {
		const group = this.props.getGroup(groupCode);
		if (group.get('modifierGroupType') == GROUP_TYPE.REQUIRED
			&& this.props.getModifier(groupCode, modifierCode).get('selected')
			&& group.get('modifiers').filter((item) => item.get('selected')).size == 1
		) {
			// если убираем галочку по-умолчанию, то смотрим на другие, есть ли среди них по-умолчанию.
			// нашли только 1, значит пользователь пытается убрать галочку по-умолчанию у 1 единственного оставшегося, выведим ошибку и не меняем
			this.props.dispatch(notify.error('Тип группы обязательный, необходимо выбрать как минимум один товар по умолчанию'));
		} else {
			this.props.toggleModifier({groupCode, modifierCode});
			this.saveGroupChanges(groupCode);
		}
	}

	saveGroupChanges(groupCode, meta = {success: '', error: ''}) {
		const {updateGroup, point}=this.props;
		updateGroup({groupCode, point, meta});
	}

	handleSubmitFail() {
		const {activeTab}=this.state;
		if (activeTab != 'info')
			this.handleChangeTab('info');
	}

	handleChangeTab(tab) {
		if (this.props.productView.product.isNew)
			return;
		this.setState({activeTab: tab});
	}

	getErrorMessage() {
		const {error, product, loading} = this.props.productView || {loading: true, error: null};
		if (!error) {
			if (!product && !loading) {
				return {message: 'Товар не найден', title: 'Товар не найден'};
			}
			return null;
		}

		if (error.status == 404)
			return {title: 'Товар не найден', message: 'Не удалось получить данные по товару'};

		if (error.status == 409) {
			return null;
		}

		return {message: 'Произошла неизвестная ошибка'};
	}

	render() {

		const {productView, modifierGroups} = this.props;
		const {loading, error, saving, removing, product}= productView || {loading: true};
		const ProductCard = this.productCard;
		const {activeTab}=this.state;
		let title = product && !product.isNew ? product.name : 'Добавление товара';
		const errorModel = this.getErrorMessage();
		if (errorModel && errorModel.title) {
			title = errorModel.title;
		}

		return (
			<article className="page" {...this.layerOptions}>
				<div className="page_header">
					{this.getCloseButton()}
					{this.getToggleButton()}
					<h1 className="cutted">{!loading && title}</h1>
				</div>
				{product &&
				<ProductCard onSave={::this.onSaveProduct}
							 onCancel={::this.closeLayer}
							 onAddGroup={::this.onAddGroup}
							 onAddModifier={::this.onAddModifier}
							 onOpenGroup={::this.onOpenGroup}
							 onOpenModifier={::this.onOpenModifier}
							 onRemoveModifier={::this.onRemoveModifier}
							 onToggleModifier={::this.onToggleModifier}
							 onRemove={::this.onRemoveProduct}
							 saving={saving}
							 product={product}
							 removing={removing}
							 error={error}
							 modifierGroups={modifierGroups}
							 initialValues={product}
							 onChangeTab={::this.handleChangeTab}
							 onSubmitFail={::this.handleSubmitFail}
							 activeTab={activeTab}/>}

				<ConfirmPopupService
					ref={p => this.removePopup = p}
					okName="Подтвердить"
					cancelName="Отмена"
					title="Удаление модификатора"/>

				<LoaderBlock loading={loading}/>
				{errorModel &&
				<div class="page_content">
					<div class="center_xy  page_center_info"><h1 class="c_error">{errorModel.message}</h1></div>
				</div>}
			</article>
		);
	}
}

EditProductContainer.propTypes = {
	inventCode: PropTypes.string,
	point: PropTypes.string,
	productView: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
	const {inventCode, point, action:urlAction}=ownProps.match.params;
	const productView = productsSelectors.getProductView(inventCode)(state);
	const modifierGroups = modifierSelectors.getGroups(inventCode)(state);
	const getGroup = (groupCode) => modifierSelectors.getGroupByCode(groupCode)(state);
	const getModifier = (groupCode, modifierCode) => modifierSelectors.getModifierByCode(groupCode, modifierCode)(state);
	return {inventCode, point, productView, urlAction, modifierGroups, getGroup, getModifier};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			getDetails: productActions.getProductDetails.request,
			saveProduct: productActions.saveProductDetails.request,
			setNewProduct: productActions.setNewProduct,
			removeProduct: productActions.removeProduct.request,
			removeModifier: modifierActions.removeModifier,
			toggleModifier: modifierActions.toggleModifier,
			updateGroup: modifierActions.updateGroupDebounce,
			openGroup: modifierActions.openGroup,
			push: push
		}, dispatch),
		dispatch
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(toJS(EditProductContainer)));