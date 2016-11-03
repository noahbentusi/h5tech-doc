#Nodejs和Npm

> 一言以蔽之
>
> Nodejs是一个Javscript运行时环境。它可以让Javscript脱离浏览器独自运行。它本身在标前ECMAScript5标准的基础上，又提供一套Api。这些API可以文件系统、网络和密码加解密等功能。使之可以用Javascript来编写本地程序。如: Typescript编译器、Http服务器、网络抢票等等。
>
> Npm是Nodejs提供的一个命令。它可以管理下载Nodejs扩展模块、第三库以及命令。

## 下载

访问[Nodejs官网（https://nodejs.org）](https://nodejs.org)，下载Nodejs安装包。一般下载LTS版本(即Long Term Support，长期支持的稳定版本)即可。

## Helloworld

编写一个js文件，`helloworld.js`

    //helloworld.js

    console.log("hello world!");

使用Nodejs的命令`node`可以直接运行这个js脚本。

`node helloworld.js`

## 使用模块加载另一个文件

如果要写一个复杂的程序的话，一个庞大的代码文件显然不现实。需要划分一个一个的模块。Nodejs使用*CMD*规范。用`require`语句来加载模块。

另一个helloworld模块, helloworld.js

    //helloworld.js

    exports.hello = "hello world!";

    exports.say = function(message) {
      console.log(message);
    };

Nodejs模块中，使用exports对象暴露模块对外输出的变量和方法。向exports对象赋所有的值，模块使用者都可以获取到。

主程序main.js

    //main.js

    //加载./helloworld.js，返回该模块的exports对象
    var helloMod = require("./helloworld.js");

    helloMod.say(helloMod.hello);

运行`node main.js`

## Nodejs的Api

Nodejs在标前ECMAScript5标准的基础上，又提供一套Api。这些API提供了文件系统、网络和密码加解密等功能。这些Api以一堆模块的形式提供给程序员。

如读取一个本地文件, readfile-demo.js

    //readfile-demo.js

    //加载Nodejs标准文件系统模块
    var fs = require("fs");

    //以同步的方式，读取./readme.md文件。文件编码是utf-8
    var content = fs.readFileSync("./readme.md", "utf-8");

    console.log(content);

运行`node readfile-demo.js`

Nodejs的标准Api可以查看[官网文档](https://nodejs.org/dist/latest-v6.x/docs/api/)。

## NPM（Nodejs Package Manager）

npm是Nodejs的一个命令，用来管理下载Nodejs扩展包。这个扩展包可以是一个库，也可以是一个扩展命令。

## 下载一个扩展库

执行`npm install colors`。等待一会儿，执行完成后。会在当前目录下生成一个名为`node_modules`目录。这个目录用存放Nodejs的扩展库。Nodejs遇到require指令，首先按照路径寻找，然后扫描标准Api后，最后扫描当前目录的`node_modules`里面的内容。

现在`node_modules`会存在一个`colors`的模块。我们现在可以在代码中使用它。


    //colors-demo.js

    var colors = require('colors');

    console.log('hello'.green); // outputs green text
    console.log('i like cake and pies'.underline.red) // outputs red underlined text
    console.log('inverse the color'.inverse); // inverses the color
    console.log('OMG Rainbows!'.rainbow); // rainbow
    console.log('Run the trap'.trap); // Drops the bass

运行`node colors-demo.js`

## 下载一个扩展命令，用来加速npm下载。

因为npm的仓库在中华人民共和国境外，又因为我国无法言语的国情，所以导致npm下载过程经常性卡死和下载失败。所以我们需要下载一个扩展命令`nrm`。使用这个命令将npm的默认仓库指向国内镜像仓库。

执行`npm install -g nrm --registry=https://registry.npm.taobao.org`来下载`nrm`。

* `-g`指示nrm安装到全局环境下，并安装成扩展命令。
* `--registry`指示npm当次执行使用的仓库为`https://registry.npm.taobao.org`

下载完成后，我们可以使用`nrm ls`查看当前有哪些国内镜像。使用`nrm test`测试各个镜像的响应速度。

我们决定使用阿里巴巴的镜像`nrm use taobao`。之后再使用`npm`命令下载东西，基本就是瞬秒了。

## 查找自己想要的库

可以登陆[npm官网](https://www.npmjs.com/)进行搜索。
