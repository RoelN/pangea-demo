const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");

const env = process.env.NODE_ENV || "development";
const isProd = env === "production";
const out = path.resolve(__dirname, "_site");
const exclusions = /node_modules/;

const optimization = {
	splitChunks: isProd && { chunks: "all" },
	minimize: isProd,
	// prints more readable module names in the browser console on HMR updates, in dev
	namedModules: !isProd,
	// prevent emitting assets with errors, in dev
	noEmitOnErrors: !isProd
};

const fileLoaderOptions = {
	name: "[name].[hash].[ext]"
};

module.exports = {
	mode: isProd ? "production" : "development",
	entry: {
		main: path.resolve(__dirname, "src", "js", "main.js")
	},
	output: {
		path: out,
		filename: "[name].[hash].js",
		publicPath: "./"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: exclusions,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"]
					}
				}
			},
			{
				test: /\.css$/,
				exclude: exclusions,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					"css-loader",
					"postcss-loader"
				]
			},
			{
				include: path.resolve(__dirname, "src", "fonts"),
				use: [
					{
						loader: "file-loader",
						options: fileLoaderOptions
					}
				]
			},
			{
				test: /\.(png|jpg|svg)$/i,
				oneOf: [
					{
						resourceQuery: /external/,
						loader: "file-loader",
						options: fileLoaderOptions
					},
					{
						loader: "url-loader",
						options: {
							limit: 8192,
							...fileLoaderOptions
						}
					}
				]
			}
		]
	},
	devtool: isProd ? false : "eval",
	optimization,
	plugins: [
		new MiniCssExtractPlugin({
			filename: "styles.[contenthash].css",
			ignoreOrder: false
		}),
		new ManifestPlugin({
			fileName: "../src/_includes/.webpack/manifest.json"
		})
	]
};
