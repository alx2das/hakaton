import React from 'react';

/**
 * Разбор флагов роута
 * - index - главная страница
 * - path - v4-docs
 * - exact - v4-docs
 * - strict - v4-docs
 * - component - v4-docs
 * - isLayer - флаг если страница является слоем
 * - layout - мастер-страница, если не указана то берется дефолтная
 *                (у обычной страницы - своя, у слоя - своя),
 *                если layout: null, то рендерится без мастера
 */

export default function getRoutes(modules) {
	return modules.filter((m) => isFunc(m.getRoutes))
		.reduce((routes, module) => {
			const routesObject = module.getRoutes();
			const routesArray = getRouteFromSection(routesObject);
			return [...routes, ...routesArray];
		}, []);
}

function getRouteFromSection(routesObject) {
	return Object.keys(routesObject).reduce((prev, key) => {
		const route = routesObject[key];
		if (route.nested) {
			route.nested = getRouteFromSection(route.nested);
		}
		return [...prev, route];
	}, []);
}

function isFunc(f) {
	return typeof f === 'function';
}