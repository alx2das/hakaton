import React from 'react'
import PropTypes from 'prop-types'
import {reduxForm} from 'common/formElements';
import {InputField, NumberField, Field} from 'common/formElements/fields';
import {ConfirmPopupService} from 'common/uiElements';
import {NumberCounterRender} from 'common/formElements'
import {initialize} from 'redux-form/immutable'

class CashBoxToolbar extends React.Component {
	handleRemove() {
		this.removePopup.open()
			.then(() => this.props.onDeleteTab())
	}

	componentWillReceiveProps({tab}) {
		const {tab:oldTab, dispatch}=this.props;
		if (oldTab && tab && oldTab.code != tab.code) {
			dispatch(initialize(this.props.form, tab, false));
		}
	}

	render() {
		const {handleSubmit, onSaveTab}=this.props;
		return (
			<form onSubmit={handleSubmit(onSaveTab)}>
				<div class="gk_panel_controls">
					<div class="control">
						Название вкладки:
						<InputField tipPlace="bottom" name="name" required="Укажите название вкладки"
									class="small  tab_name"/>
					</div>

					<div class="control">
						Порядок:
						<NumberField tipPlace="bottom" component={NumberCounterRender} name="order"
									 required="Укажите порядок" minValue={0}/>
					</div>

					{/*<div class="control">*/}
						{/*<Field component="input" id="showStatsId" type="checkbox" name="showStats"/>*/}
						{/*<label for="showStatsId" class="label_check  switcher"><i*/}
							{/*class="icon"></i><span>Показывать статистику</span></label>*/}
					{/*</div>*/}

					<div class="control">
						<button type="button" class="button  clean  small" onClick={::this.handleRemove}>Удалить вкладку
						</button>
						<button type="submit"></button>
					</div>
				</div>
				<ConfirmPopupService
					ref={p => this.removePopup = p}
					okName="Подтвердить"
					cancelName="Отмена"
					title="Удаление вкладки"/>
			</form>)
	}
}

CashBoxToolbar.propTypes = {
	onDeleteTab: PropTypes.func.isRequired,
	onSaveTab: PropTypes.func.isRequired
};

export default reduxForm({form: 'cashBoxToolbarForm'})(CashBoxToolbar);


