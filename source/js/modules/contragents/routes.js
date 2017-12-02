import React from 'react';
import ContragentListContainer from './containers/ContragentListContainer';
import ContragentEditContainer from './containers/ContragentEditContainer';
//
// import TestContainer from './containers/TestContainer';

export function getRoutes() {
	return {
		contragents: {
			path: '/contragents',
			exact: true,
			component: ContragentListContainer,
			nested: {
				contragentsEdit: {
					path: '/contragents/:action/:code',
					exact: true,
					isLayer: true,
					layout: ContragentEditContainer
				},
				contragentsAdd: {
					path: '/contragents/:action',
					exact: true,
					isLayer: true,
					layout: ContragentEditContainer
				}
			}
		}
	}
}