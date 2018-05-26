const {INCLUDE_PATH} = require("../../../webpack-config/WebpackConfig");

//默认导入的模块
const DEFAULT_INCLUDE = [
    "typescript_api_sdk",
    "wuxp_antd_mobile",
    "wuxp_antd_mamager",
    "wuxp_react_dynamic_router"
];

const list = [...(INCLUDE_PATH || []), ...DEFAULT_INCLUDE];

/**
 * loader是否忽略该文件
 * @param path 文件路径
 * @return {boolean} true 忽略 false 不忽略
 */
const isExclude = function (path) {

    //是否为node_modules中的模块
    let isNodeModules = path.indexOf("node_modules") >= 0;

    let isWxpComponents = list.some((item) => {
        return path.indexOf(item) >= 0;
    });

    if (isWxpComponents) {
        return false;
    }
    return isNodeModules;
};

module.exports = {
    isExclude
};
