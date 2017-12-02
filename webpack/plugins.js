const webpack = require('webpack');
const config = require('../webpack/constants');
const path = require('path');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
const WebpackChunkHash = require('webpack-chunk-hash');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = require("../node_modules/webpack/lib/optimize/CommonsChunkPlugin");


module.exports = function (env) {
	const plugins = [

		new WebpackChunkHash(),
		new CommonsChunkPlugin({
			// The order of this array matters
			names: ["common", "vendor"],
			minChunks: 2
		}),
		new CommonsChunkPlugin({
			name: "manifest",
			minChunks: Infinity
		}),
		new ChunkManifestPlugin({
			filename: "manifest.json",
			manifestVariable: "webpackManifest"
		}),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.ProvidePlugin({
			$: 'jquery',
			logger: ['infrastructure/utils/logger', 'default']
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(config.NODE_ENV)
			},
			__API_URL__: JSON.stringify(config.app.API_URL),
			__DEV__: config.IS_DEVELOPMENT,
			__DEV_TOOLS__: false,
			__CLIENT__: true,
			__BUILD_VERSION__: JSON.stringify(env && env.BUILD_VERSION ? env.BUILD_VERSION : '0.0.0'),
			__BUILD_DATE__: (new Date).toLocaleString(),
			__CLIENT_CONFIG__: JSON.stringify(config.app)
		}),
		new HtmlWebpackPlugin({
			version: JSON.stringify(env && env.BUILD_VERSION ? env.BUILD_VERSION : '0.0.0'),
			date: (new Date).toLocaleString(),
			template: path.join(config.sourcePath, 'index.html'),
			path: config.buildPath,
			filename: 'index.html',
			chunks: ["app", "common", "vendor", "manifest"]
		}),
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: [
					autoprefixer({
						browsers: [
							'last 3 version',
							'ie >= 10',
						],
					}),
				],
				stylus: {
					use: [require('nib')()],
					import: ['~nib/lib/nib/index.styl'],
					preferPathResolver: 'webpack',
				},
				context: config.sourcePath,
			}
		}),
		new OpenBrowserPlugin({url: `http://${config.app.HOST}:${config.app.PORT}/`})
	];

	if (config.IS_PRODUCTION) {
		// Production plugins
		plugins.push(
			new webpack.LoaderOptionsPlugin({
				minimize: true,
				debug: false,
			}),
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false,
					screw_ie8: true,
					conditionals: true,
					unused: true,
					comparisons: true,
					sequences: true,
					dead_code: true,
					evaluate: true,
					if_return: true,
					join_vars: true
				},
				output: {
					comments: false,
				},
				sourceMap: true
			}),
			new ExtractTextPlugin('[name]-[hash].css'),
			new CopyWebpackPlugin([
				{from: '../static/**/*', to: 'static'},
				// {from: '../favicon.ico'}
			])
		);
	} else {
		// Development plugins
		plugins.push(
			new webpack.HotModuleReplacementPlugin(),
			new DashboardPlugin(),
			new webpack.NamedModulesPlugin()
		);
	}

	return plugins;
};