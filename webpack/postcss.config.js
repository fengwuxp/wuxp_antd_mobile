const autoprefixer = require('autoprefixer');
const rucksackCsss = require('rucksack-css');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const postcssCssnext = require('postcss-cssnext');
// const postcssPresetEnv= require('postcss-preset-env');

module.exports = {
    // https://webpack.js.org/guides/migrating/#complex-options
    ident: 'postcss',
    plugins: [
        // postcssPresetEnv({
        //     stage: 3,
        // }),
        autoprefixer({
            browsers: ['last 4 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4']
        }),
        rucksackCsss,
        postcssFlexbugsFixes,
        postcssCssnext({
            warnForDuplicates:false
        }),
    ]
};

