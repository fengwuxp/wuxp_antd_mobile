const webpack = require("webpack");
const path = require("path");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const {isExclude} = require("./WebpackUtils");

const {getLessLoader} = require("./getLessLoader");
const {scssModuleLoader, cssModuleLoader} = require("./cssModuleUtils");
const babelConfig = require('./getBabelCommonConfig')(false);

function getWebpackConfig() {
    if (process.env._self !== "1") {
        return require("../../../webpack-config/WebpackConfig");
    }
    return {};
}

const {
    DEPLOYMENT_DIRECTORY,
    PROJECT_DIR
} = getWebpackConfig();


const pluginImportOptions = [
    {
        style: true,
        libraryName: "antd-mobile"
    },
];


babelConfig.plugins.push([
    require.resolve('babel-plugin-import'),
    pluginImportOptions,
]);

/**
 * 获取打包配置
 * @param {GetWebpackBaseConfigOptions} options
 * @return {webpack.Configuration}
 */
getWebpackBaseConfig = function (options) {

    console.log("---------初始化打包配置--------", options);


    //默认打包目录
    const packPath = path.resolve('./dist');

    const config = {
        entry: {
            app: path.resolve('src', 'App'),
        },
        output: {
            filename: '[name]_[hash].js',
            chunkFilename: '[name]_[hash].js',
            path: packPath,
            publicPath: "/"
        },
        resolve: {
            extensions: [".ts", ".tsx", "d.ts", ".js", ".jsx", ".css", ".scss", ".less", ".png", "jpg", ".jpeg", ".gif"]
        },

        module: {
            rules: [
                {
                    test: /\.js[x]?$/,
                    // exclude: /(node_modules|bower_components)/,
                    exclude: isExclude,
                    use: [
                        {
                            loader: "babel-loader",
                            options: babelConfig
                        }
                    ]
                },
                {
                    test: /\.ts[x]?$/,
                    exclude: isExclude,
                    use: [
                        {
                            loader: "babel-loader",
                            options: babelConfig
                        },
                        {loader: "awesome-typescript-loader"}
                    ]
                },
                {
                    test: /\.css$/,
                    use: ExtractTextWebpackPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            cssModuleLoader,
                            {
                                loader: "postcss-loader",
                                options: {
                                    config: {
                                        path: path.join(__dirname, './postcss.config.js')
                                    }
                                }
                            },
                        ]
                    })
                },
                getLessLoader(options),
                {
                    test: /\.s[c|a]ss$/,
                    use: ExtractTextWebpackPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            scssModuleLoader,
                            {
                                loader: "postcss-loader",
                                options: {
                                    config: {
                                        path: path.join(__dirname, './postcss.config.js')
                                    }
                                }
                            },
                            {loader: "sass-loader"}
                        ]
                    })
                },
                {
                    test: /\.(png|jpg|svg)/,
                    use: [
                        {
                            loader: "url-loader",
                            options: {
                                limit: 1024 * 5
                            }
                        }
                    ]
                },
                {
                    test: /\.(woff|woff2|svg|ttf|eot)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            //项目设置打包到dist下的fonts文件夹下
                            options: {
                                name: 'fonts/[name].[hash:8].[ext]',
                                //10kb以下的直接打包到css文件中
                                limit: 1024 * 10,
                                //返回最终的资源相对路径
                                publicPath: function (url) {
                                    //使用全局变量来传递 资源根路径
                                    let uri = path.join(global['__RESOURCES_BASE_NAME__'], url).replace(/\\/g, '/');
                                    if (uri.startsWith("http:/") && !uri.startsWith("http://")) {
                                        uri = uri.replace("http:/", "http://")
                                    }
                                    return uri;
                                }
                            },

                        }
                    ]
                },
                {
                    test: /\.art$/,
                    loader: "art-template-loader",
                    options: {
                        escape: false
                        // art-template options (if necessary)
                        // @see https://github.com/aui/art-template
                    }
                }
            ]
        },
        // When importing a module whose path matches one of the following, just
        // assume a corresponding global variable exists and use that instead.
        // This is important because it allows us to avoid bundling all of our
        // dependencies, which allows browsers to cache those libraries between builds.
        externals: {
            "react": "React",
            "react-dom": "ReactDOM",
            "moment": "moment",
            // "react-router": "ReactRouter",
            // "react-router-dom": "ReactRouterDOM",
            // "redux": "Redux",
            "antd-mobile": "window['antd-mobile']"
        },
        plugins: [
            new ExtractTextWebpackPlugin({
                filename: "style.css",
                allChunks: true
            }),
            // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
            // new WriteFilePlugin({
            //     // test: /^((?!\.hot-update).)*$/,
            //     test: /\.jsp|\.tld|\.xml$/,
            // })
        ]
    };
    //是否打release包
    let release = process.env.RELEASE;
    if (release === "1") {
        //重写打包目录到部署目录
        config.output.path = DEPLOYMENT_DIRECTORY;
    }
    if (release != null) {
        config.plugins.push(
            //git https://github.com/johnagan/clean-webpack-plugin
            //先将部署目录清除
            new CleanWebpackPlugin([
                config.output.path
            ], {
                root: PROJECT_DIR,       　　　　　　     //根目录
                // verbose: true,        　　　　　　　    //开启在控制台输出信息
                // dry: false        　　　　　　　　　　  //启用删除文件,
                allowExternal: true,                   //允许删除wbpack根目录之外的文件
                // beforeEmit: true                       //在将文件发送到输出目录之前执行清理
            }),
        );
    }


    return config;
};


module.exports = {
    getWebpackBaseConfig
};
