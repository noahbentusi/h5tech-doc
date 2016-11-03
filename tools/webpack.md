# webpack

> 一言以蔽之
>
> webpack是Nodejs的一个扩展命令。它原始核心功是将多个js文件打包合并成一个js文件。webpack本身可以扩展，分为loader（加载器）和plugin（插件）。通过加载各种loader和plugin，可以编译typescript、加载html、css、图片合并成一个打包文件，然后混淆压缩打包文件。

## 安装webpack扩展命令

执行`npm install -g webpack`即可。


## 打包两个js文件

一个测试模块`mod.js`

    //mod.js

    exports.message = "hello world!";

    exports.say = function(message) {
        console.log(message);
    };

一个主程序`main.js`

    //main.js

    var mod = require("./mod.js");

    mod.say(mod.message);

对`main.js`执行打包`webpack main.js bundle.js`。webpack会分析main.js中模块依赖关系，将依赖的模块一块打包进来。代码中main.js依赖mod.js，webpack会mod.js和main.js一块打包进bundle.js文件中。

如果`main.js`使用了扩展包，webpack也会去搜索当前`node_modules`目录下面的模块。

打包完成后，可以直接执行`node bundle.js`。

## 编写打包配置文件

在项目根目录创建一个名为`webpack.config.js`文件，内容其实是一个nodejs module。

    //webpack.config.js
    var path = require("path");

    module.exports = {
        devtool: "source-map", //需要生成source-map文件

        entry: "./main.js", //打包的入口文件
        output: {//打包文件的输出配置
            path: __dirname, //输出到当前目录__
            filename: "bundle.js", //输出打包文件名
            pathinfo: true, //source-map中记录被打包文件的位置信息
            devtoolLineToLine: true, //source-map中记录行对行的对应关系
            sourceMapFilename: "./bundle.js.map", //生成的source-map文件名
        },
        module: {
            loaders: [//加载配置

            ]
        },
        plugins: [//插件配置

        ],
        resolve: {
            root: [//搜索根目录包括当前目录
                path.resolve("./")
            ]
        }
    };

只需要执行`webpack`，webpack会自动加载`webpack.config.js`中的内容，进行打包。

## 一切为了前端

传统的前端页面，一个页面往往要加载很多资源，如：js脚本、css文件、图片、字体等等。浏览器对于每个资源都需要建立一个http请求。导致在资源很多的时候，导致页面载入很慢。

使用webpack，我们可以把这些资源打成一个bundle.js，并进行压缩、混淆。可以加快页面加载速度。

如果打包文件最终很大的话，也可以用很轻页面显示加载进度。加载完毕后，显示页面成品。

非javscript的打包资源，需要下载webpack加载器来支持。

执行`npm install html-loader style-loader css-loader less less-loader url-loader typescript ts-loader webpack`下载这些加载器。

* html-loader html加载器，用于打包html文件。在angular中，加载页面模板有用。
* css-loader css加载器，用于打包css文件。
* less-loader less加载器，用于将less文件编译成css文件并进行打包。less库是，less的编译器。less-loader需要使用它。
* style-loader css加载器、less加载器都依赖这个style加载器。
* url-loader url加载器。用于处理其它资源。它负责将资源转抱[Data URI](http://baike.baidu.com/item/Data%20URI)
* ts-loader typesrcipt加载器。用于编译打包typescript文件。稍后章节会介绍。
* typescript typescript编译器。
* webpack webpack包，里面包含了一些插件(plugin)。如压缩混淆。

### 一个传统页面

test.html文件

    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Webapck打包测试页面</title>

        <link rel="stylesheet" href="test.css"/>
        <script type="text/javascript" src="./test.js"></script>
    </head>
        <body>
            <div id="main"></div>
        </body>
    </html>

test.css文件

    html, body, #main {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
    }

    #main {
        color: blue;
        font-size: 21px;
    }


test.js文件

    window.addEventListener("load", function(event) {
        document.getElementById("main").innerText = "hello world!";
    });

### webpack打包

首先我们需要修改之前写好的`webpack.config.js`配置文件。

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
            new webpack.optimize.UglifyJsPlugin({//压缩混淆插件
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

配置文件，我们把入口文件改成entry.js。我们需要编写entry.js。把这些css, js打包在一起。

entry.js文件

    require("./test.css"); //加载test.css
    require("./test.js"); //加载test.js

修改test.html文件

    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Webapck打包测试页面</title>
    </head>
        <body>
            <div id="main"></div>
        </body>

        <script type="text/javascript" src="./bundle.js"></script>
    </html>

### 一步一步来之一 增加Less支持

在webpack.config.js的loaders数组中增加一条配置

    { test: /\.less$/, loader: "style!css!less" }

遇到.less文件，使用less加载器进行编译。编写test.less文件

    .full-size {
        margin: 0px;
        padding: 0px;
        width: 100%;
        height: 100%;
    }

    html, body {
        .full-size();
    }

    @text-color: red;
    @text-size: 12px;

    #main {
        .full-size();

        color: @text-color;
        font-size: @text-size + 9;
    }

修改entry.js，将加载test.css改成加载test.less。

    require("./test.less"); //加载test.less
    require("./test.js"); //加载test.js

执行`webpack`后，在浏览器查看test.html。

## 一步一步来之二，添加typescript支持，并使用模板

在webpack.config.js的loaders数组中增加一条配置

    //对.html, .tpl使用html加载器
    { test: /\.html$|\.tpl$/, loader: "html" },
    //对.ts使用typescript加载器
    { test: /\.ts$/, loader: "ts-loader" }

在项目根目录`webpack.config.js`添加一个`tsconfig.json`配置文件用来配置typescript编译选项。

    {
        "compilerOptions": {
            "target": "es5",                    //将typescript编译成es5代码
            "sourceMap": true,                  //生成source-map
            "emitDecoratorMetadata": true,      //保存注解数据
            "experimentalDecorators": true,     //支持注释功能
            "removeComments": true,             //不保存注释信息
            "noImplicitAny": false              //不使用任何暗示信息
        },
        "files": [
            "node_modules/typescript/lib/lib.es6.d.ts", //加载es6库
            "webpack/env-webpack.ts"                    //加载自定义库
        ],
        "compileOnSave": false
    }

**Json不支持注释，复制粘贴时请把注释去掉**

因为typescript本身没有require指令，为指示webpack加载资源。我们需要声明require指令。需要编写webpack/env-webpack.ts文件

    declare function require(name: string): any;

编写test.ts文件

    class Template
    {
        private apply: Function;

        constructor(private parent)
        {
            let content = require("./test.tpl"); //指示webpack加载指定模板

            //制作模板字符串函数
            this.apply = new Function("data", `
                return \`${content}\`;
            `);
        }

        public show(data): void
        {
            //通过模板生成页面
            let content = this.apply(data);

            //插入
            this.parent.innerHTML = content;
        }
    }

    window.addEventListener("load", function(event) {
        let main = document.getElementById("main");

        let template: Template = new Template(main);

        template.show({
            message: "this is message from type script"
        });
    });

编写模板文件test.tpl

    <span>${data.message}</span>

修改entry.js

    require("./test.css"); //加载test.css
    require("./test.ts"); //加载test.ts

然后打包并运行。
