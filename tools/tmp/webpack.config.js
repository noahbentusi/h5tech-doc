//webpack.config.js
var path = require("path");
var webpack = require("webpack");

module.exports = {
    devtool: "source-map", //需要生成source-map文件

    entry: "./entry.js", //**打包的入口文件改为entry.js**
    output: {//打包文件的输出配置
        path: __dirname, //输出到当前目录__
        filename: "bundle.js", //输出打包文件名
        pathinfo: true, //source-map中记录被打包文件的位置信息
        devtoolLineToLine: true, //source-map中记录行对行的对应关系
        sourceMapFilename: "./bundle.js.map", //生成的source-map文件名
    },
    module: {
        loaders: [//加载配置
            //后缀.css文件，使用css加载器
            { test: /\.css$/, loader: "style!css" },

             //woff2字体文件，打包成Data URI，类型为application/octet-stream
            { test: /\.woff2$/, loader: "url?mime=application/octet-stream" },

             //.woff字体文件，打包成Data URI，类型为application/font-woff
            { test: /\.woff$/, loader: "url?mime=application/font-woff" },

             //.ttf字体文件，打包成Data URI，类型为application/x-font-ttf
            { test: /\.ttf$/, loader: "url?mime=application/x-font-ttf" },

             //.eot字体文件，打包成Data URI，类型为application/octet-stream
            { test: /\.eot$/, loader: "url?name=application/octet-stream" },

            //.svg文件，打包成Data URI，类型为image/svg+xml
            { test: /\.svg$/, loader: "url?name=image/svg+xml" },

            //.jpg, .jpeg, .png, .gif打包为Data URI，类型自动检测
            { test: /\.jpg$|\.jpeg$|\.png$|\.gif/, loader: "url" }
        ]
    },
    plugins: [//插件配置
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    resolve: {
        root: [//搜索根目录包括当前目录
            path.resolve("./")
        ]
    }
};
