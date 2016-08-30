var webpack = require('webpack');
var path = require('path');
var paths;

// Define paths here
paths = {
    src: path.join(process.cwd(), '/src/'),
    dist: path.join(process.cwd(), '/dist/')
};

module.exports = {
    target: 'web',
    entry: {
        app: './src/index.js'
    },
    output: {
        path: path.join(paths.dist, '/'),
        filename: 'index.js'
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/
            }
        ],
        noParse: /\.min\.js/
    },
    progress: true,
    stats: { children: false },
    resolve: {
        modulesDirectories: [
            'node_modules',
            'src'
        ],
        extensions: [
            '',
            '.js'
        ]
    },
    plugins: [
        /*new webpack.DefinePlugin({
            __ENV__: JSON.stringify(env),
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),*/
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};