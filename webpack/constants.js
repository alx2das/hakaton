const path = require('path');
const appConfigFn = require('../config/index');

const NODE_ENV = process.env.NODE_ENV || 'development';
const SERVER_RENDER = process.env.SERVER_RENDER === 'true';
const IS_DEVELOPMENT = NODE_ENV === 'development';
const IS_PRODUCTION = NODE_ENV === 'production';
const CONFIG_TYPE = process.env.CONFIG_TYPE || NODE_ENV;

const app = appConfigFn(CONFIG_TYPE);
const jsSourcePath = path.join(__dirname, '../source/js');
const nodeModules = path.resolve(__dirname, '../node_modules');
const buildPath = path.join(__dirname, '../build');
const sourcePath = path.join(__dirname, '../source');


module.exports = {
	IS_DEVELOPMENT,
	IS_PRODUCTION,
	NODE_ENV,
	SERVER_RENDER,
	jsSourcePath,
	buildPath,
	sourcePath,
	nodeModules,
	app
};