const autoprefixer = require('autoprefixer');
const rucksackCsss = require('rucksack-css');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const postcssCssnext = require('postcss-cssnext');

module.export = {
    // https://webpack.js.org/guides/migrating/#complex-options
    ident: 'postcss',
    plugins: [
        rucksackCsss,
        postcssFlexbugsFixes,
        postcssCssnext,
        autoprefixer({
            browsers: ['last 4 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4']
        }),
    ]
};
