import React from 'react';
import DiscountListContainer from './containers/DiscountListContainer';
import DiscountEditContainer from './containers/DiscountEditContainer';

export function getRoutes() {
	return {
		discount: {
			path: '/discount',
			exact: true,
			component: DiscountListContainer,
			nested: {
				discountEdit: {
					path: '/discount/:action/:code',
					exact: true,
					isLayer: true,
					layout: DiscountEditContainer
				},
				discountAdd: {
					path: '/discount/:action',
					exact: true,
					isLayer: true,
					layout: DiscountEditContainer
				}
			}
		}

	}
}