import React from 'react';
import PropTypes from 'prop-types';
import groupShape from './groupShape';
import MODIFIER_GROUP_TYPE from '../../enums/modifierGroupType'

class ModifiersTab extends React.Component {

	handleOpenModifier(e, props) {
		this.props.onOpenModifier(props);
		e.preventDefault();
		e.stopPropagation();
	}

	handleRemoveModifier(e, props) {
		this.props.onRemoveModifier(props);
		e.preventDefault();
		e.stopPropagation();
	}

	render() {
		let {
			className='', modifiers = [], onAddGroup, onOpenGroup, onAddModifier,
			onToggleModifier,
		}=this.props;

		return (
			<div className={className}>
				<a className="icon-plus  add_modificators_group" onClick={onAddGroup}>Добавить
					группу</a>

				{modifiers.map(group => (
					<div className="modificators_group" key={group.code}>
						<div className="modificators_group_title">{group.name}
							<a className="icon-pencil" onClick={() => onOpenGroup(group.code)}></a>
						</div>

						<div className="modificators_wrapper">
							{group.modifiers.map(m => (
								<div key={m.code}
									 className={m.selected ? 'selected' : ''}
									 onClick={() => onToggleModifier({modifierCode: m.code, groupCode: group.code})}>
									{m.name}
									<div class="controls">
										<a class="icon-pencil"
										   onClick={e => this.handleOpenModifier(e, {
											   modifierCode: m.code,
											   groupCode: group.code
										   })}></a>
										<a class="icon-trash-bin"
										   onClick={e => this.handleRemoveModifier(e, {
											   modifierCode: m.code,
											   groupCode: group.code
										   })}></a>
									</div>
								</div>
							))}
							<div className="add_new_modificator"
								 onClick={() => onAddModifier({groupCode: group.code})}>+
							</div>
						</div>
					</div>
				))}
			</div>);
	}
}

ModifiersTab.propTypes = {
	className: PropTypes.string,
	modifiers: PropTypes.arrayOf(groupShape),
	onAddGroup: PropTypes.func.isRequired,
	onOpenGroup: PropTypes.func.isRequired,
	onAddModifier: PropTypes.func.isRequired,
	onOpenModifier: PropTypes.func.isRequired,
	onRemoveModifier: PropTypes.func.isRequired,
	onToggleModifier: PropTypes.func.isRequired
};

export default ModifiersTab;