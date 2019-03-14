const postcssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const rucksackCsss = require('rucksack-css');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const postcssPresetEnv= require('postcss-preset-env');

// console.log("postcssImport",typeof postcssImport,"\n");
// console.log("autoprefixer",typeof autoprefixer,"\n");
// console.log("postcssFlexbugsFixes",typeof postcssFlexbugsFixes,"\n");
// console.log("postcssPresetEnv",typeof postcssPresetEnv,"\n");

module.exports = {
    sourceMap: false,
    ident: 'postcss',
    plugins: loader => [
        postcssImport({
            root: loader.resourcePath,
        }),
        postcssPresetEnv({
            stage: 3,
        }),
        autoprefixer(),
        // require('cssnano')({
        //     autoprefixer: false
        // }),
        postcssFlexbugsFixes
    ]
};
