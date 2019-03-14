import * as baseConfig from "./webpack/webpack.prod.config.template"
import * as webpack from "webpack";

const HtmlWebPackPlugin = require("html-webpack-plugin");

const config = {
    ...baseConfig,
};

let jspArtTemplate = `<%@ page contentType="text/html;charset=UTF-8" language="java" %> 
               <%@ page import="com.alibaba.fastjson.JSON" %>
               <%@ page contentType="text/html;charset=UTF-8" language="java" %>
               <%  
                 request.setAttribute("memberJSON", JSON.toJSONString(request.getAttribute("member"))); 
                 request.setAttribute("wxMpUserJSON", JSON.toJSONString(request.getAttribute("wxMpUser")));
                %>`;

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
        template: "./src/jsp/index.art",
        filename: "index.jsp",
        title: "antd mobile template",
        chunks: ['app'],
        inject: false,
        jspArtTemplate: jspArtTemplate

    }),
);


module.exports = config;
