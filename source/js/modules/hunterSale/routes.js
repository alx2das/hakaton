import React from 'react';

import StatisticContainer from './containers/StatisticContainer'
import OptionsContainer from './containers/OptionsContainer'


export function getRoutes() {
	return {
        hunterSaleStatistic: {
            path: '/',
            exact: true,
            allowAnonymous: true,
            component: StatisticContainer
        },
        hunterSaleOptions: {
            path: '/options',
            exact: true,
            allowAnonymous: true,
            component: OptionsContainer
        }
	}
}