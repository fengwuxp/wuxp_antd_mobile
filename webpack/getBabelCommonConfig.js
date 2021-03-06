module.exports = function (modules) {
    const plugins = [
        // require.resolve('babel-plugin-transform-es3-member-expression-literals'),
        // require.resolve('babel-plugin-transform-es3-property-literals'),
        require.resolve('babel-plugin-transform-object-assign'),
        require.resolve('babel-plugin-transform-class-properties'),
        require.resolve('babel-plugin-transform-object-rest-spread'),
        require.resolve('babel-plugin-syntax-dynamic-import'),
    ];
    plugins.push([require.resolve('babel-plugin-transform-runtime'), {
        helpers: false,
    }]);
    return {
        presets: [
            require.resolve('babel-preset-react'),
            [require.resolve('babel-preset-env'), {
                modules
            }],
        ],
        plugins
    };
};
