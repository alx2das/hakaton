import React from 'react';

export function getRoutes() {
	return {
		testRoute: {
			path: '/cash',
			exact: true,
			component: ({location}) => (<h2> Cash list</h2>)
		}
	}
}