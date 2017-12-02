import React from 'react';
import CashBoxLayout from './containers/CashBoxLayout';
import CashBoxContainer from './containers/CashBoxContainer';

export function getRoutes() {
	return {
		hotkeys: {
			path: '/hotkeys',
			exact: true,
			layout: CashBoxLayout,
			component: CashBoxContainer
		}
	}
}