import React from 'react';
import {reduxForm, Field, FieldArray, formValueSelector} from 'redux-form/immutable';
import {connect} from 'react-redux'
import * as options from '../enums/options';
import toJS from 'components/HOC/toJs'

let RolesForm = (props) => {
	const {array: {push}, handleSubmit, pristine, reset, submitting} = props;

	// console.log(initialValues);

	return (
		<div className="h100per">
			<div className="title_panel">
				<h1>Тестирование контрагентов</h1>
			</div>
			<div className="widget_block">

				<form onSubmit={handleSubmit((props) => {
					console.log('onSubmit', props);
				})}>

					<Field component="input" type="text" name="name"/>
					<FieldArray name="roles" component={({fields, meta}) => {
						console.log(fields);
						return (<div>
							{fields.map((role, roleIndex) =>
								<div className="f_left" key={roleIndex}>
									<Field name={`${role}.selected`} id={'role_' + roleIndex} component="input"
										   type="checkbox"/>
									<label htmlFor={'role_' + roleIndex} className="label_check">
										<i className="icon"/>
										<span>{fields.get(roleIndex).get('name')}</span>
									</label>
								</div>
							)}
						</div>)
					}
					}/>

				</form>

			</div>
		</div>);
};

RolesForm = reduxForm({
	form: 'testContragent',
	enableReinitialize: true
})(RolesForm);


class TestContainer extends React.Component {

	onSubmit() {

	}

	render() {
		const {formData, form} = this.props;

		form && console.log(form.toJS());

		const vals = [
			'CASHIER', 'CUSTOMER', 'EMPLOYEE', 'ADMINISTRATOR', 'SERVICE_PROVIDER', 'PROVIDER'
		].map((v) => {
			return {
				selected: formData.roles.indexOf(v) >= 0,
				name: v
			}
		});

		const initialValues = {
			name: 'test',
			roles: vals
		};
		return (
			<div className="h100per">
				<RolesForm initialValues={initialValues}/>
			</div>
		);
	}
}


// const FieldArraysForm = (props) => {
// 	const { array: { push }, handleSubmit, pristine, reset, submitting } = props
// 	return (
// 		<form onSubmit={handleSubmit}>
// 			<div>
// 				<label>Club Name</label>
// 				<Field name="clubName" key="clubName" component={clubName =>
// 					<div>
// 						<input type="text" {...clubName} placeholder="Club Name"/>
// 						{clubName.touched && clubName.error && <span>{clubName.error}</span>}
// 					</div>
// 				}/>
// 			</div>
// 			<FieldArray name="members" component={members =>
// 				<ul>
// 					<li>
// 						<button type="button" onClick={() => push('members', {})}>Add Member</button>
// 					</li>
// 					{members.map((member, memberIndex) =>
// 						<li key={memberIndex}>
// 							<button
// 								type="button"
// 								title="Remove Member"
// 								onClick={() => members.remove(memberIndex)}/>
// 							<h4>Member #{memberIndex + 1}</h4>
// 							<div>
// 								<label>First Name</label>
// 								<Field name={`${member}.firstName`} component={firstName =>
// 									<div>
// 										<input type="text" {...firstName} placeholder="First Name"/>
// 										{firstName.touched && firstName.error && <span>{firstName.error}</span>}
// 									</div>
// 								}/>
// 							</div>
// 							<div>
// 								<label>Last Name</label>
// 								<Field name={`${member}.lastName`} component={lastName =>
// 									<div>
// 										<input type="text" {...lastName} placeholder="Last Name"/>
// 										{lastName.touched && lastName.error && <span>{lastName.error}</span>}
// 									</div>
// 								}/>
// 							</div>
// 							<FieldArray name={`${member}.hobbies`} component={hobbies =>
// 								<ul>
// 									<li>
// 										<button type="button" onClick={() => hobbies.push()}>Add Hobby</button>
// 									</li>
// 									{hobbies.map((hobby, hobbyIndex) =>
// 										<li key={hobbyIndex}>
// 											<button
// 												type="button"
// 												title="Remove Hobby"
// 												onClick={() => hobbies.remove(hobbyIndex)}/>
// 											<div>
// 												<Field name={hobby} component={hobbyProps =>
// 													<div>
// 														<input type="text" {...hobbyProps} placeholder={`Hobby #${hobbyIndex + 1}`}/>
// 														{hobbyProps.touched && hobbyProps.error && <span>{hobbyProps.error}</span>}
// 													</div>
// 												}/>
// 											</div>
// 										</li>
// 									)}
// 									{hobbies.error && <li className="error">{hobbies.error}</li>}
// 								</ul>
// 							}/>
// 						</li>
// 					)}
// 				</ul>
// 			}/>
// 			<div>
// 				<button type="submit" disabled={submitting}>Submit</button>
// 				<button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values
// 				</button>
// 			</div>
// 		</form>
// 	)
// }


TestContainer = connect(
	state => ({
		formData: {
			name: 'text',
			roles: ['CUSTOMER', 'ADMINISTRATOR'],
			crole: ['CUSTOMER', 'ADMINISTRATOR']
		},
		form: formValueSelector('testContragent')(state, 'roles')
	})
)(TestContainer);

export default TestContainer;