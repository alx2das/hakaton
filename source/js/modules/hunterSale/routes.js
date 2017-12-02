import React from 'react';

import StatisticContainer from './containers/StatisticContainer'


export function getRoutes() {
	return {
		hunterSale: {
			path: '/',
			exact: true,
			allowAnonymous: true,
			component: StatisticContainer
		}
	}
}