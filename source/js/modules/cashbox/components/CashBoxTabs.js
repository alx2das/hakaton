import React from 'react'
import PropTypes from 'prop-types'
import TabShape from './TabShape'

const CashBoxTabs = ({tabs, activeTab, onSelectTab, onAddTab}) => {
	return (
		<div class="tabs_flat  tabs_flat__stretch">
			{tabs.map(s => {
				return (<a key={'cashtabs_' + s.code} onClick={() => onSelectTab(s.code)}
						   class={["tab", activeTab.code == s.code ? "tab__active" : ""].join(' ')}>{s.name}</a>)
			})}
			<a class="tab  tab__add" onClick={onAddTab}>+ Добавить вкладку</a>
		</div>
	);
};

CashBoxTabs.propTypes = {
	tabs: PropTypes.arrayOf(TabShape).isRequired,
	activeTab: PropTypes.shape({
		name: PropTypes.string.isRequired,
		code: PropTypes.string.isRequired
	}),
	onSelectTab: PropTypes.func.isRequired,
	onAddTab: PropTypes.func.isRequired
};
export default CashBoxTabs

