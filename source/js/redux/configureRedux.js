import createStore from './store'
import getRoutes from './routes'
import getReducers from './reducer'
import getMiddlewares from './middlewares'
import {createBrowserHistory} from 'history'
import createSagaMiddleware from 'redux-saga';
import {all} from 'redux-saga/effects'
import {routerMiddleware} from 'connected-react-router/immutable'
import logger from 'infrastructure/utils/logger'
import Raven from 'raven-js';
import createRavenMiddleware from "raven-for-redux";

const enableRaven = __DEV__ === false;
const buildVersion = __BUILD_VERSION__;
const environment = __DEV__ ? 'development' : 'production';

if (enableRaven) {
	Raven
		.config(`https://3f62df6e8d484fb8a04d82e52e5b8dc0@sentry.io/218225`, {
			release: buildVersion,
			environment: environment
		})
		.install();
}

function getRootSaga(modules) {
	const sagas = modules.reduce((list, module) => {
		if (module.getSagas) {
			return list.concat(module.getSagas());
		}
		return list;
	}, []);

	return function*() {
		yield all(sagas);
	};
}

export default function configureRedux(modules, initState) {
	const history = createBrowserHistory();
	const sagaMiddleware = createSagaMiddleware();
	const routes = getRoutes(modules);
	let middleware;
	if (enableRaven) {
		middleware = getMiddlewares(modules, createRavenMiddleware(Raven), routerMiddleware(history), sagaMiddleware);
	}
	else {
		middleware = getMiddlewares(modules, routerMiddleware(history), sagaMiddleware);
	}

	const store = createStore(
		{
			middleware: middleware,
			reducers: getReducers(modules),
			initionalState: initState,
			history
		}
	);

	function runSagas() {
		const task = sagaMiddleware.run(getRootSaga(modules));
		task.done.catch(error => {
			logger.error('Ошибка в saga', error);
			runSagas();
			store.dispatch({type: '@@core/GLOBAL_SAGA_ERROR', error});
			if (enableRaven && error) {
				Raven.captureException(error);
			}
		});
	}

	runSagas();

	return {store, routes, history};
}