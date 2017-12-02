const webpack = require('webpack');
const config = require('./webpack/constants');
const vendor = require('./webpack/vendors');
const plugins = require('./webpack/plugins');
const rules = require('./webpack/rules');
const devServer = require('./webpack/devServer');

const buildEntryPoint = (point) => {
	if (config.IS_PRODUCTION)
		return point;
	return [point, 'webpack/hot/only-dev-server', `webpack-dev-server/client?http://${config.app.HOST}:${config.app.PORT}`];
};

module.exports = function (env) {
	let output = {
		path: config.buildPath,
		publicPath: '/',
		filename: '[name]-[hash].js'
	};
	if (config.IS_PRODUCTION)
		output.sourceMapFilename = '[file].map';

	return {
		devtool: config.IS_PRODUCTION ? 'source-map' : 'eval-source-map',
		context: config.jsSourcePath,
		entry: {
			vendor: vendor,
			app: buildEntryPoint('./index'),
			// signin: buildEntryPoint('./signin'),
		},
		output: output,
		module: {
			rules: rules,
		},
		resolve: {
			extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx', '.svg', '.ttf', '.woff', '.woff2'],
			modules: [
				config.nodeModules,
				config.jsSourcePath,
			],
		},
		plugins: plugins(env),
		devServer: devServer
	};
};