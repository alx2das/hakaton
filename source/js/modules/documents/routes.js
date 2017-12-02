import React from 'react';
import {Redirect} from 'react-router-dom';
import ChequeListContainer from './containers/ChequeListContainer'
import ChequeViewContainer from './containers/ChequeViewContainer'
import MoneyListContainer from './containers/MoneyListContainer'
import IShopDocsContainer from './containers/ShopDocsContainer'
import ShopDocViewContainer from './containers/ShopDocViewContainer'
import ExternalListContainer from './containers/ExternalListContainer'
import OrderViewContainer from './containers/OrderViewContainer'
import OrderAddContainer from './containers/OrderAddContainer'
import ReportsContainer from './containers/ReportsContainer'

export function getRoutes() {
	return {
		documentsChequeIndex: {
			path: '/documents',
			exact: true,
			component: () => <Redirect to="/documents/cheque"/>
		},
		documentsCheque: {
			path: '/documents/cheque',
			exact: true,
			component: ChequeListContainer,
			nested: {
				documentsChequeView: {
					path: '/documents/cheque/:chequeId/:shiftId',
					exact: true,
					layout: ChequeViewContainer,
					isLayer: true
				}
			}
		},
		documentsMoney: {
			path: '/documents/money',
			exact: true,
			component: MoneyListContainer
		},
		documentsExternal: {
			path: '/documents/external',
			exact: true,
			component: ExternalListContainer,
			nested: {
				documentsExternalView: {
					path: '/documents/external/view/:point/:id',
					exact: true,
					layout: OrderViewContainer,
					isLayer: true
				},
				documentsExternalAdd: {
					path: '/documents/external/add',
					exact: true,
					layout: OrderAddContainer,
					isLayer: true
				}
			}
		},
		documentsIShop: {
			path: '/documents/ishop',
			exact: true,
			component: IShopDocsContainer,
			nested: {
				documentsIShopView: {
					path: '/documents/ishop/view/:point/:id',
					exact: true,
					layout: ShopDocViewContainer,
					isLayer: true
				}
			}
		},
		documentsReports: {
			path: '/documents/reports',
			exact: true,
			component: ReportsContainer
		}
	}
}