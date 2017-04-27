const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const getLocaleFilesNames = require('./src/js/getLocaleFilesNames');
console.log(getLocaleFilesNames);

module.exports = {
	devtool: 'cheap-eval-source-map',
	entry: {
		index: path.resolve('src/js/index.js'),
	},
	output: {
		path: 'build',
		filename: '[name]_bundle.js',
	},
	resolve: {
		alias: {
			js: path.resolve('src/js'),
		}
	},
	module:{
		rules: [
			{
				test: /\.js$/,
				exclude: [/node_modules/],
				use: {
					loader: "babel-loader",
					options: {
						presets: ['es2015', 'react', 'stage-1'],
					},
				}
			},
		]
	},
	plugins: [
		new CopyWebpackPlugin([
			{from: 'src/locales', to: 'locales'},
		]),
		new HtmlWebpackPlugin({
			template: path.resolve('src/template.html'),
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV),
				LOCALE_FILES: JSON.stringify(getLocaleFilesNames()),
			}
		})
	]
}
