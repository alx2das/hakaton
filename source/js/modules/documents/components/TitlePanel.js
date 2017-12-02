import React from 'react'
import TabLink from './TabLink'

const TitlePanel = ({children}) => (
	<div className="title_panel">
		{children}
		<div className="tabs_flat  tabs_flat__h1">
			<TabLink to="/documents/cheque" label="Чеки"/>
			<TabLink to="/documents/money" label="Денежные средства"/>
			<TabLink to="/documents/external" label="Заказы"/>
			<TabLink to="/documents/ishop" label="Интернет-магазин"/>
			<TabLink to="/documents/reports" label="Отчеты"/>
		</div>
	</div>
);


export default TitlePanel;