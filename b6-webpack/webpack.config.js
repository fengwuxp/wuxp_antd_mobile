const baseConfig = require("./webpack/webpack.config.template");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");


const config = {
    ...baseConfig,
};

// config.output.publicPath = '/weex/antd/';

config.plugins.push(
    new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: "index.html",
        title: "antd mobile template",
        chunks: ['app'],
        inject: true,
    })
);


module.exports = config;
