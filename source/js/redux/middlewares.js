import logger from 'dev/logger';
import {applyMiddleware} from 'redux';

/**
 *
 * @param modules
 * @param customMiddleWares
 * @returns {[*,*]}
 */
export default function getMiddlewares(modules, ...customMiddleWares) {

	let middlewares = [...customMiddleWares];

	let composerFuncs = [];

	modules.forEach((module) => {
		if (module.getMiddlewares)
			middlewares.push(module.getMiddlewares());
	});

	// if (__DEV__ && __LOGGER__) {
	// 	middlewares.push(logger);
	// }

	if (__DEV_TOOLS__) {
		const DevTools = require('../dev/DevTools.jsx').default;
		composerFuncs.push(DevTools.instrument());
	}

	return [
		applyMiddleware(...middlewares),
		...composerFuncs
	];

}