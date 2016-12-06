var path = require("path");
var webpack = require("webpack");

module.exports = {
    devtool: "source-map",
    entry: "./entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js",
        pathinfo: true,
        devtoolLineToLine: true,
        sourceMapFilename: "./bundle.js.map",
    },
    module: {
        loaders: [
            { test: /\.html$|\.tpl$/, loader: "html" },
            { test: /\.ts$/, loader: "ts-loader" },
            { test: /\.css$/, loader: "style!css" },
            { test: /\.less$/, loader: "style!css!less" },
            { test: /\.woff2$/, loader: "url?mime=application/octet-stream" },
            { test: /\.woff$/, loader: "url?mime=application/font-woff" },
            { test: /\.ttf$/, loader: "url?mime=application/x-font-ttf" },
            { test: /\.eot$/, loader: "url?name=application/octet-stream" },
            { test: /\.svg$/, loader: "url?name=image/svg+xml" },
            { test: /\.jpg$|\.jpeg$|\.png$|\.gif/, loader: "url" }
        ]
    },
    plugins: [
        /*new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })*/
    ],
    resolve: {
        root: [
            path.resolve("./")
        ]
    }
};
