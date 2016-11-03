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

    #helloworld.js

    console.log("hello world!");

使用Nodejs的命令`node`可以直接运行这个js脚本。

`node helloworld.js`

## 使用模块加载另一个文件

如果要写一个复杂的程序的话，一个庞大的代码文件显然不现实。需要划分一个一个的模块。Nodejs使用*CMD*规范。用`require`语句来加载模块。

另一个helloworld模块, helloworld.js

    #helloworld.js

    exports.hello = "hello world!";

    exports.say = function(message) {
      console.log(message);
    };

Nodejs模块中，使用exports对象暴露模块对外输出的变量和方法。向exports对象赋所有的值，模块使用者都可以获取到。

主程序main.js

    #main.js

    /*
    * 加载./helloworld.js，返回该模块的exports对象
    */
    var helloMod = require("./helloworld.js");

    helloMod.say(helloMod.hello);

## Nodejs的Api

Nodejs在标前ECMAScript5标准的基础上，又提供一套Api。这些API可以文件系统、网络和密码加解密等功能。这些Api以一堆模块的形式提供给程序员。

如读取一个本地文件, readfile-demo.js

    #readfile-demo.js

    /**　加载Nodejs标准文件系统模块　*/
    var fs = require("fs");

    /** 以同步的方式，读取./readme.md文件。文件编码是utf-8 */
    var content = fs.readFileSync("./readme.md", "utf-8");
