import React from 'react';
import {Select} from 'common/uiElements';
import {Creatable} from 'react-select';
import {
	AmountField,
	InputField,
	PhoneField,
	NumberField,
	SelectField,
	SwitchField,
	TextAreaField
} from 'common/formElements/fields';
import {reduxForm} from 'common/formElements'
import {connect} from 'react-redux';
import {Field, focus, change, getFormValues} from 'redux-form/immutable';
import {isRequired} from 'common/validators'
import modifierForm from 'modules/products/components/ProductCard/ModifierForm'
import {withRouter} from 'react-router';
import {ConfirmPopupService} from 'common/uiElements';
import {notify} from 'common/uiElements/Notify';
import {schema, normalize} from 'normalizr';

class smallForm extends React.Component {
	handleSearch() {
		this.setState({
			groups: [{
				label: new Date().getTime(),
				value: '1'
			},
				{
					label: new Date().getTime(),
					value: '2'
				}]
		})
	}

	render() {
		const {handleSubmit}=this.props;
		const {groups} = this.state || {};
		return (<form onSubmit={handleSubmit(() => {
			console.log('submit small');
		})}>
			<div className="form_group form_horizontal">
				<InputField name="name" validate={[isRequired('Тест')]}/>

				<TextAreaField name="text" class="w100" required="Заполните поле"/>
			</div>
			<button type="submit" className="button middle wide light">отправить small</button>
		</form>)
	}
}

const SmallForm = reduxForm({form: 'smallForm'})(smallForm);

class testForm extends React.Component {
	handleSearch() {
		this.setState({
			groups: [{
				label: new Date().getTime(),
				value: '1'
			},
				{
					label: new Date().getTime(),
					value: '2'
				}]
		})
	}

	render() {
		const {handleSubmit}=this.props;
		const {groups} = this.state || {};
		return (<form onSubmit={handleSubmit(() => {
			console.log('submit testform');
		})}>

			<InputField name="name" validate={[isRequired('Тест')]}/>
			<PhoneField name="phone" validate={[isRequired('Тест')]}/>
			<AmountField name="price" type="text"
						 validate={[isRequired('Укажите цену')]}/>
			<NumberField name="number" validate={[isRequired('Тест')]}/>
			<SelectField name="select" options={groups}
						 searchable={true}
						 placeholder="TEST"
						 creatable={false}
						 validate={[isRequired('Укажите')]}
						 onInputChange={::this.handleSearch}/>
			<SelectField name="select1" options={groups}
						 searchable={true}
						 creatable={true}
						 placeholder="FORM SELECT"
						 validate={[isRequired('Укажите')]}
						 onInputChange={::this.handleSearch}/>

			<SwitchField
				name="requiredField" switchItems={[
				{id: 'groupTypeRequired', label: 'Обязательный', value: "on"},
				{id: 'groupTypeNonRequired', label: 'Не обязательный', value: "off"}
			]}/>

			<br/>

			Форма в форме
			<br/>

			<button type="submit" className="button middle wide">отправить</button>
		</form>)
	}
}

const onSubmitFail = formName => (errors, dispatch) => {
	if (errors) {
		const firstField = Object.keys(errors)[0];
		firstField && dispatch(focus(formName, firstField));
		// setTimeout(() => {
		// 	document.querySelector(`[name=${firstField}]`).focus();
		// }, 0);

	}
};

function getParent() {
	return document.querySelector('#root');
}


const TestForm = reduxForm({
	form: 'testForm',
	onSubmitFail: onSubmitFail('testForm')
})(testForm);


@withRouter
@connect(mapStateProps, mapDispatchToProps)
class TestSelector extends React.Component {
	constructor(props) {
		super(props);
		this.state = {selected: ""};
		this.modifierForm = modifierForm(1, 2);
	}

	onSave(formProps) {

	}

	onCancel() {
		this.setState({
			id: 1
		})
	}

	onSendNotify() {
		this.props.dispatch(notify.success('Now you can see how easy it is to use notifications in React!'));
	}

	onSendNotify2() {
		this.props.dispatch(notify.error('Now you can see how easy it is to use notifications in React!', 'Error'));
	}

	onSendNotify3() {
		this.props.dispatch(notify.warning('Now you can see how easy it is to use notifications in React!', 'Warn'));
	}

	onSendNotify4() {
		this.props.dispatch(notify.info('Now you can see how easy it is to use notifications in React!', 'Info'));
	}

	onRemove(elem) {
		this.removePopup.open({title: 'Удалить элемент ' + elem.id})
			.then(() => {
				console.log('removing element ', elem);
			})
			.catch(({close}) => {
				if (close)
					console.log('closing for element ', elem);
				else
					console.log('canceling for element ', elem);
			});
	};

	logChange(val) {
		//console.log("Selected: ", val);
		this.setState({selected: val ? val.value : null})
	}

	logChange2(val) {
		//console.log("Selected: ", val);
		this.setState({val: val})
	}


	render() {
		var options = [
			{value: 'one', label: 'One'},
			{value: 'two', label: 'Two'}
		];

		let tabs = testNormilizer();

		console.log(tabs);

		//let modifier = null;
		//const ModifierForm = this.modifierForm;
		const amount = this.props.formData ? this.props.formData.get('price') : 'null';

		return (
			<div style={{minHeight: '500px'}}>
				<Select name="form-field-name"
						placeholder=""
						searchable={true}
						value={this.state.selected}
						onChange={::this.logChange} options={options}/>

				<br/>

				<Creatable name="form-field-name11"
						   placeholder=""
						   searchable={true}
						   creatable={true}

						   value={this.state.val}
						   onChange={::this.logChange2} options={options}/>


				<div className="poss" style={{maxWidth: '400px'}}>
					<TestForm />
					<SmallForm />
				</div>

				<br/>

				<button className="button small" onClick={() => this.onRemove({id: 1})}>Удалить что-то 1</button>
				<button className="button small" onClick={() => this.onRemove({id: 2})}>Удалить что-то 2</button>
				<br/>
				<br/>

				<button className="button small" onClick={::this.onSendNotify}>Нотифай</button>
				<button className="button small" onClick={::this.onSendNotify2}>Нотифай2</button>
				<button className="button small" onClick={::this.onSendNotify3}>Нотифай3</button>
				<button className="button small" onClick={::this.onSendNotify4}>Нотифай4</button>

				<br/>
				{JSON.stringify(tabs)}

				<ConfirmPopupService
					ref={p => this.removePopup = p}
					okName="Подтвердить"
					cancelName="Отмена"
					title="Удаление тестовое"
					text="Вы действительно хотите что-то удалить?"/>
			</div>
		);
	}
}


function mapStateProps(state) {
	const formData = getFormValues('testForm')(state);
	return {formData};
}

function mapDispatchToProps(dispatch) {
	return {dispatch};
}

function testNormilizer() {
	// const myData = {
	// 	users: [
	// 		{id: 1},
	// 		{id: 2}
	// 	]
	// };
	// const user = new schema.Entity('users');
	// const mySchema = {users: [user]}
	// var result = normalize(myData, mySchema);
	// const data = [{id: '123', name: 'Jim'}, {id: '456', name: 'Jane'}];
	// const userSchema = new schema.Entity('users');
	// const userListSchema = [userSchema];
	// const normalizedData = normalize(data, userListSchema);

	const tabs = {
		"data": [{
			"code": "4f160fac-1556-44b6-8d74-031630dbcd53",
			"name": "Товары",
			"order": 4,
			"hotKeys": [{
				"name": "Доставка",
				"barcode": "2311209624",
				"actions": [{"actionType": "barcode", "barcode": "2311209624"}],
				"row": 0,
				"col": 0,
				"width": 1,
				"height": 1,
				"color": "white"
			},]
		}, {
			"code": "89d69b18-2f7c-4e5a-977b-c520266e0f26",
			"name": "Новая",
			"order": 2,
			"hotKeys": [{
				"name": "товар1111",
				"barcode": "2012336615",
				"actions": [{"actionType": "barcode", "barcode": "2012336615"}],
				"row": 0,
				"col": 3,
				"width": 1,
				"height": 1,
				"color": null
			}]
		}], "pos": 0, "total_count": 2
	}

	tabs.data.forEach(s => s.hotKeys.forEach((k, i) => {
		k.id = `${s.code}_${i}`;
	}));
	const hotKeysShema = new schema.Entity('hotKeys');
	const tabSchema = new schema.Entity('tabs', {hotKeys: [hotKeysShema]}, {idAttribute: 'code'});
	const tabListShema = [tabSchema];
	let tabsNorm = normalize(tabs.data, tabListShema);

	return {
		before: tabs.data,
		after: tabsNorm
	};
}

export default TestSelector

