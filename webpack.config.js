const colorsSupported   = require('supports-color');
const path              = require('path');
const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool  : 'source-map',
	entry    : {
		app: ['babel-polyfill', path.join(__dirname, 'client', 'app/app.js')]
	},
	output   : {
		path         : path.join(__dirname, 'dist'),
		publicPath   : '/',
		filename     : '[name].bundle.js',
		chunkFilename: '[name].bundle.js',
	},
	//devtool: isProduction ? 'sourcemap' : 'eval-source-map',
	module   : {
		rules: [
			{
				test   : /\.js$/,
				exclude: /node_modules/,
				loaders: ['ng-annotate-loader', 'babel-loader'],
			},
			{
				test  : /\.html$/,
				loader: 'raw-loader',
			},
			{
				test  : /\.json$/,
				loader: 'json-loader',
			},
			{
				test   : /\.css$/,
				loaders: ['style-loader', 'css-loader'],
			},
			{
				test: /\.scss$/,
				loaders: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test  : /\.(png|gif)$/,
				loader: 'url-loader',
			},
			{
				test  : /\.(jpg)$/,
				loader: 'file-loader',
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				loader: 'file-loader'
			},
			{
				test: /\.svg$/,
				loader: 'svg-sprite-loader',
				options : {
					extract: false
				}
			},
		]
	},
	resolve  : {
		alias: {
			jquery: "jquery",
			lodash: 'lodash',
			moment: 'moment',
		}
	},
	plugins  : [
		// Injects bundles in your index.html instead of wiring all manually.
		// It also adds hash to all injected assets so we don't have problems
		// with cache purging during deployment.
		new HtmlWebpackPlugin({
			template: 'client/index.html',
			inject  : 'body',
			hash    : true
		}),

		new webpack.ProvidePlugin({
			jQuery: "jquery",
			$     : "jquery",
			_     : 'lodash',
			moment: 'moment',
		}),

		// Automatically move all modules defined outside of application directory to vendor bundle.
		// If you are using more complicated project structure, consider to specify common chunks manually.
		new webpack.optimize.CommonsChunkPlugin({
			name     : 'vendor',
			minChunks: function (module, count) {
				return module.resource && module.resource.indexOf(path.resolve(__dirname, 'client')) === -1;
			}
		})
	],
	devServer: {
		contentBase: path.join(__dirname, 'client'),
		compress   : false,
		https      : false,
		port       : 3000,
		stats      : {
			colors : colorsSupported,
			chunks : false,
			modules: false,
		},
	},
};
