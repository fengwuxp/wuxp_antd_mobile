import baseConfig from "./webpack/webpack.config.template";
import * as HtmlWebPackPlugin from "html-webpack-plugin";


const config = {
    ...baseConfig,
};

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
