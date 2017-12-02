import React from 'react';
import TestSelector from './components/TestSelector'
import TestSelector2 from './components/TestSelector2'
import TestDrag from './containers/TestDrag'
import TestNumber from './components/TestNumber'
import TestSelectorDate from './components/TestSelectorDate'
import TestAmount from './components/TestAmount'
import TestPhone from './components/TestPhone'
import TestLayers from './containers/TestLayers'
import TestLayer1 from './components/TestLayer1'
import TestLayer2 from './components/TestLayer2'


export function getRoutes() {
	return {
		testSelect: {
			path: '/testselect',
			exact: true,
			allowAnonymous: true,
			component: TestSelector
		},
		testSelect2: {
			path: '/testselect2',
			exact: true,
			allowAnonymous: true,
			component: TestSelector2
		},
		testDrag: {
			path: '/drag',
			exact: true,
			allowAnonymous: true,
			component: TestDrag
		},
		testNumbers: {
			path: '/testnumber',
			exact: true,
			allowAnonymous: true,
			component: TestNumber
		},
		// testDatePicker2: {
		// 	path: '/test-datepicker2',
		// 	exact: true,
		// 	component: DatePicker2
		// },
		testDate: {
			path: '/testdate',
			exact: true,
			allowAnonymous: true,
			component: TestSelectorDate
		},
		testAmount: {
			path: '/testamount',
			exact: true,
			allowAnonymous: true,
			component: TestAmount
		},
		testPhone: {
			path: '/testphone',
			exact: true,
			allowAnonymous: true,
			component: TestPhone
		},
		testLayers: {
			path: '/testlayers',
			exact: true,
			component: TestLayers,
			nested: {
				testLayer1: {
					path: '/layer1',
					exact: true,
					isLayer: true,
					layout: TestLayer1
				},
				testLayer2: {
					path: '/layer2',
					exact: true,
					isLayer: true,
					layout: TestLayer2
				},
				testLayer3: {
					path: '/layer3',
					exact: true,
					isLayer: true,
					layout: TestLayer2
				},
				testLayer4: {
					path: '/layer4',
					exact: true,
					isLayer: true,
					layout: TestLayer2
				},
				testLayer5: {
					path: '/layer5',
					exact: true,
					isLayer: true,
					layout: TestLayer2
				}
			}
		},
	}
}