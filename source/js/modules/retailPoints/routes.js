import React from 'react';
import RetailPointsContainer from '../retailPoints/containers/RetailPointsContainer';
import AddEditRetailPointContainer from '../retailPoints/containers/AddEditRetailPointContainer';
import RegisterKKTContainer from './containers/RegisterKKTContainer'


export function getRoutes() {
	return {
		retailPoints:{
			path:'/retail-points',
			exact: true,
			component: RetailPointsContainer,
			nested: {
				registerKKT: {
					path: '/retail-points/register/:id',
					exact: true,
					isLayer: true,
					layout: RegisterKKTContainer
				},

				retailPointAdd: {
					path: '/retail-points/:action/:id',
					exact: true,
					isLayer: true,
					layout: AddEditRetailPointContainer
				},
				retailPointEdit: {
					path: '/retail-points/:action/:id',
					exact: true,
					isLayer: true,
					layout: AddEditRetailPointContainer
				}
			}
		}
	};
}