# Atom铁臂阿童木编辑器

> 一言以蔽之
>
> 是目前流行中免费的（<-这一点很重要）支持语言广泛的文本编辑器。它本身还有很多可下载的插件。
> 其中很多插件非常好用。

## 下载

可访问[Atom官网](https://atom.io/)下载相应版本的安装包。目前支持平台有：

* windows
* mac
* ubuntu
* others linux

## 推荐插件

* atom-typescript

atom对typescript的语言支持。安装后可对typescript语言 语法高亮。

* file-icons

对atom编辑器中文件图标进行了美化。

* minimap

对当前编辑文件进行了缩略图显示

* atom-beautify

对代码进行格式化的工具。

* color-picker

编辑css/less等样式文件时，在文件中直接显示顔色值的颜色。并且提供颜色提取器。

* emmet

快速书写html代码的插件。

比如: 在html文件中输入

`html:5`

然后按`Tab`键，emmet就会自动展开成如下内容：

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>

    </body>
    </html>

另外，它支持类似jquery语法的代码扩展。

比如：`ul[class='items']>li[class='item']*3`按`Tab`键就会展开成如下内容:

    <ul class="items">
        <li class="item"></li>
        <li class="item"></li>
        <li class="item"></li>
    </ul>
