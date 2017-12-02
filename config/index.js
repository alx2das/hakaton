const merge = require('webpack-merge');


module.exports = function (config) {
	try {
		return merge(
			require(`./env/config.default.json`),
			require(`./env/config.${config}.json`)
		);
	} catch (err) {
		return require(`./env/config.default.json`);
	}
};