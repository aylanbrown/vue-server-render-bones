const webpack = require('webpack')
const utils = require('./utils')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./webpack.base.conf.js')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

// baseConfig.module.rules[0].options = ''

const isProduction = process.env.NODE_ENV === 'production'


module.exports = merge(baseConfig, {
	entry: './src/entry-server.js',
	target: 'node',
	devtool: '#source-map',
	output: {
		filename: 'server-bundle.js',
		libraryTarget: 'commonjs2'
	},
	externals: nodeExternals({
		whitelist: /\.css$/
	}),
	module: {
		rules: [
			{
				test: /\.css$/,
				use: isProduction ? ExtractTextPlugin.extract({
					use: 'css-loader',
					fallback: 'vue-style-loader'
				})
				: ['vue-style-loader','css-loader']
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
			'process.env.VUE_ENV': '"server"'
		}),
		new VueSSRServerPlugin(),
		isProduction ? new ExtractTextPlugin({
			filename: utils.assetsPath('css/[name].[contenthash].css'),
			allChunks: true
		}) : ''
	]
})