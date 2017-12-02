const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('../webpack/constants');

const rules = [
	{
		test: /\.(js|jsx)$/,
		exclude: /node_modules/,
		use: [
			'babel-loader',
		]
	},
	{
		test: /\.(png|gif|jpg|svg|woff|woff2|eot|ttf|ico)$/,
		use: 'url-loader?limit=20480&name=assets/[name]-[hash].[ext]',
	}
];

if (config.IS_PRODUCTION) {
	rules.push({
		test: /\.styl$/,
		loader: ExtractTextPlugin.extract({
			fallback: 'style-loader',
			use: 'css-loader!stylus-loader?resolve url',
		}),
	});
} else {
	rules.push({
		test: /\.styl$/,
		loader: 'style-loader!css-loader!stylus-loader?resolve url',
	});
}

module.exports = rules;