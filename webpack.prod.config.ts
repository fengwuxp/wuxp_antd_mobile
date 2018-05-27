import * as baseConfig from "./webpack/webpack.prod.config.template"
import * as webpack from "webpack";
const HtmlWebPackPlugin=require("html-webpack-plugin");

const config = {
    ...baseConfig,
};
config.plugins.unshift(
    new webpack.DefinePlugin({
        'process.env': {
            /**
             * 环境变量
             */
            NODE_ENV: JSON.stringify("prod"),
            /**
             * api请求 根域名
             */
            ROOT_DOMAIN: JSON.stringify("/"),

            /**
             * 项目部署根目录
             */
            BASE_NAME: JSON.stringify("/h5")
        }
    }),
    new HtmlWebPackPlugin({
        template: "./src/jsp/index.ejs",
        filename: "index.jsp",
        title: "react App",
        chunks: ['app', 'common'],
        inject: true,
    }),
);


module.exports = config;
