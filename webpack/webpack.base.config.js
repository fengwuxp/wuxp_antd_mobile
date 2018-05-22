const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const {existsSync} = require('fs');


/**
 * 获取主题配置
 * @param path    文件路径
 * @param isPackage  是否配置在package.json文件中
 */
function getTheme(path, isPackage) {


    let theme = {};
    if (isPackage) {
        //配置在package.json文件中
        const pkg = existsSync(path) ? require(path) : {};
        if (pkg.theme && typeof(pkg.theme) === 'string') {
            let cfgPath = pkg.theme;
            // relative path
            if (cfgPath.charAt(0) === '.') {
                cfgPath = resolve(args.cwd, cfgPath);
            }
            theme = require(cfgPath);
        } else if (pkg.theme && typeof(pkg.theme) === 'object') {
            theme = pkg.theme;
        }
    } else {
        //使用单独的js 文件
        theme = require(path);
    }
    return theme;
}

/**
 * 获取 打包配置
 * @param options
 *   {
 *     packagePath:"",  //packageJson的文件的地址
 *     themePath:"",    //样式js所在地址
 *   }
 * @return {{entry: {app: string}, output: {filename: string, chunkFilename: string, path: string, publicPath: string}, resolve: {extensions: string[]}, module: {rules: *[]}, externals: {react: string, "react-dom": string}}}
 */
const getWebpackBaseConfig = function (options) {

    console.log("---------初始化打包配置--------", options);
    const isPackage = options.packagePath !== undefined && options.packagePath !== null;
    const theme = getTheme(isPackage ? options.packagePath : options.themePath, isPackage);

    const config = {
        entry: {
            app: path.resolve('src', 'App'),
        },
        output: {
            filename: '[name]_[hash].js',
            chunkFilename: '[name]_[hash].js',
            path: path.resolve("src", '../dist'),
            publicPath: "/"
        },
        resolve: {
            extensions: [".ts", ".tsx", "d.ts", ".js", ".css", ".scss", ".less", ".png", "jpg", ".jpeg", ".gif"]
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                presets: ['es2015', 'stage-2']
                            }
                        }
                    ]
                },
                {
                    test: /\.ts[x]?$/,
                    // exclude: isExclude,
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                cacheDirectory: true,
                                presets: ['es2015', 'stage-2']
                            }
                        },
                        {loader: "awesome-typescript-loader"}
                    ]
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            {
                                loader: "css-loader",
                                options: {
                                    //压缩css
                                    minimize: true,
                                    localIdentName: "[name]__[local]-[hash:base64:5]"
                                }
                            },
                            {
                                loader: "postcss-loader",
                                options: {
                                    config: {
                                        path: path.join(__dirname,'./postcss.config.js')
                                    }
                                }
                            }
                        ]
                    })
                },
                {
                    test: /\.less$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            {
                                loader: "css-loader",
                                options: {
                                    //压缩css
                                    minimize: true,
                                    localIdentName: "[name]__[local]-[hash:base64:5]"
                                }
                            },
                            {
                                loader: "postcss-loader",
                                options: {
                                    config: {
                                        path: path.join(__dirname,'./postcss.config.js')
                                    }
                                }
                            },
                            {
                                loader: 'less-loader',
                                options: {
                                    // antd使用的是less3.X+,webpack添加如下配置：
                                    javascriptEnabled: true,
                                    sourceMap: true,
                                    modifyVars: theme
                                }
                            }
                        ]
                    }),
                    include: /node_modules/,
                },
                {
                    test: /\.s[c|a]ss$/,
                    use: ExtractTextPlugin.extract({
                        use: [
                            {
                                loader: "css-loader",
                                options: {

                                    //压缩css
                                    minimize: true,
                                    localIdentName: "[name]__[local]-[hash:base64:5]"
                                }
                            },
                            {
                                loader: "postcss-loader",
                                options: {
                                    config: {
                                        path: path.join(__dirname,'./postcss.config.js')
                                    }
                                }
                            },
                            {loader: "sass-loader"}
                        ],
                        fallback: "style-loader"
                    })

                },
                {
                    test: /\.(png|jpg|svg)/,
                    use: [
                        {
                            loader: "url-loader",
                            options: {
                                limit: 25000
                            }
                        }
                    ]
                }
            ]
        },
        // When importing a module whose path matches one of the following, just
        // assume a corresponding global variable exists and use that instead.
        // This is important because it allows us to avoid bundling all of our
        // dependencies, which allows browsers to cache those libraries between builds.
        externals: {
            "react": "React",
            "react-dom": "ReactDOM"
        }
    };

    return config;
};


module.exports = {
    getWebpackBaseConfig
};

