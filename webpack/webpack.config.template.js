const path=require("path");

const {getWebpackBaseConfig}=require("./webpack.base.config");



const baseConfig = getWebpackBaseConfig({
    themePath: path.resolve("theme", "index.json")
});
const config = {
    ...baseConfig
};


config.plugins = [
    ...config.plugins,
];
config.mode = "development";

module.exports=config;
