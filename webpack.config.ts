import * as baseConfig from "./webpack/webpack.config.template";
import * as HtmlWebPackPlugin from "html-webpack-plugin";
import * as webpack from "webpack";

const config: webpack.Configuration = {
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


export default config;
