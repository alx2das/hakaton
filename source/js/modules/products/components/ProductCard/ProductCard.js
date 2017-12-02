import React from 'react';
import {reduxForm} from 'common/formElements';
import PropTypes from 'prop-types';
import {PrimaryButton, LoaderPanel} from 'common/uiElements';
import ModifiersTab from './ModifiersTab';
import ProductTab from './ProductTab';
import {ConfirmPopupService} from 'common/uiElements';

class ProductCard extends React.Component {

	handleRemove() {
		this.removePopup.open()
			.then(() => this.props.onRemove());
	}

	render() {
		const {
			handleSubmit, onChangeTab, onSave, onCancel,
			saving, product, error, removing, activeTab, modifierGroups
		} = this.props;

		const isActiveInfo = activeTab == 'info';
		const isEdit = product && !product.isNew;
		const tabInfoClasses = ['tab', isActiveInfo ? 'tab__active' : ''].join(' ');
		const tabModClasses = ['tab', (isEdit ? '' : 'disabled'), !isActiveInfo ? 'tab__active' : ''].join(' ');
		return (
			<LoaderPanel loading={removing}>
				<form onSubmit={handleSubmit(onSave)} className="poss">
					<div class="page_content with_bottom_panel  content_padding">
						<div class="tabs_flat">
							<a onClick={() => onChangeTab('info')} className={tabInfoClasses}>Информация</a>
							<a onClick={() => onChangeTab('mod')} className={tabModClasses}>Модификаторы</a>
						</div>
						<ProductTab isEdit={isEdit}
									className={!isActiveInfo ? 'hidden' : ''}/>
						<ModifiersTab
							modifiers={modifierGroups}
							onAddGroup={this.props.onAddGroup}
							onOpenGroup={this.props.onOpenGroup}
							onAddModifier={this.props.onAddModifier}
							onOpenModifier={this.props.onOpenModifier}
							onRemoveModifier={this.props.onRemoveModifier}
							onToggleModifier={this.props.onToggleModifier}
							className={isActiveInfo ? 'hidden' : ''}/>
					</div>
					<div class="page_bottom_panel">
						<PrimaryButton type="submit" loading={saving}>Сохранить</PrimaryButton>
						<a class="button middle wide clean" onClick={onCancel}>Отмена</a>
						{isEdit &&
						<a class="button middle wide clean mr44 f_right" onClick={::this.handleRemove}>Удалить</a>}
					</div>
					<ConfirmPopupService
						ref={p => this.removePopup = p}
						okName="Подтвердить"
						cancelName="Отмена"
						title="Удаление товара"/>
				</form>
			</LoaderPanel>
		)
	}
}

ProductCard.propTypes = {
	initialValues: PropTypes.object.isRequired, //todo shape
	product: PropTypes.object.isRequired,
	saving: PropTypes.bool,
	removing: PropTypes.bool,
	error: PropTypes.object,
	activeTab: PropTypes.oneOf(['info', 'mod']),
	modifierGroups: PropTypes.array,

	onSave: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired,
	onAddGroup: PropTypes.func.isRequired,
	onOpenGroup: PropTypes.func.isRequired,
	onAddModifier: PropTypes.func.isRequired,
	onOpenModifier: PropTypes.func.isRequired,
	onToggleModifier: PropTypes.func.isRequired,
	onRemoveModifier: PropTypes.func.isRequired,
	onChangeTab: PropTypes.func.isRequired,
};

export default (formKey) => reduxForm({form: formKey})(ProductCard);

