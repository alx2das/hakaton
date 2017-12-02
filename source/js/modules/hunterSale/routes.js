import React from 'react';

import HomeOneContainer from './containers/HomeOneContainer'
import HomeTwoContainer from './containers/HomeTwoContainer'


export default () => {
	return {
        hunterSale: {
            path: '/',
            exact: true,
            component: HomeOneContainer
        },
        hunterSale2: {
            path: '/two',
            exact: true,
            component: HomeTwoContainer
        }
	}
}