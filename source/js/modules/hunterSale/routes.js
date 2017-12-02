import React from 'react';

import HomeOneContainer from './containers/HomeOneContainer'
import HomeTwoContainer from './containers/HomeTwoContainer'


export default () => {
	return {
        hunterSale: {
            path: '/hakaton/build/',
            exact: true,
            component: HomeOneContainer
        },
        hunterSale2: {
            path: '/hakaton/build/two',
            exact: true,
            component: HomeTwoContainer
        }
	}
}