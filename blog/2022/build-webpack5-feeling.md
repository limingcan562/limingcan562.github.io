---
title: 关于Webpack5搭建的一些体会
des: Webpack4升级Webpack5后，配置更加精简了，同时感受到看文档的重要性
createTime: 2022-2-4
---


## 前言  
在从`Webpack4`到`Webpack5`的升级过程中，即使以前已经搭建过`Webpack4`，但是搭建`Webpack5`的过程中还是有点痛苦。因为`Webpack`提供的功能方法实在是太多了，很庞大的一个体系，所以搭建完感触还是很多的，**发现不能一味的从网上找，还是得看文档**。  
看完文档才发现原来`Webpack5`里面已经精简了很多插件了，不需要额外安装其他插件，很多以前概念比较模糊的东西，看了文档还是比较清晰的。大家有兴趣的话可以`Fork`我的[`webpack5-boilerplate`](https://github.com/limingcan562/webpack5-boilerplate)学习交流，建议大家多敲敲多试试，过程虽然有点痛苦，但是一定会有收获的。  
本文讲解，需要一定`Webpack4`基础，还没有搭建过`Webpack4`的同学，可以看看这篇[`Webpack4搭建`](https://itxiaohao.github.io/passages/webpack4-learn-introduction/)  
下面的讲解，都基于[`webpack5-boilerplate`](https://github.com/limingcan562/webpack5-boilerplate)这个项目。

## `Webpack`大体框架
首先我们对`Webpack`得有一个大体的框架认识
```javascript
// webpack.config.js
module.exports = {
    // 入口
    entry: {},

    // 打包输出
    output: {},

    // 配置模块如何解析
    resolve: {},

    // 配置各种loader
    moudle: {},

    // 配置插件
    plugins: [],

    // 优化（可以进行代码分割）
    optimization: {},

    // webpack-dev-server 开发时的配置，一般用于development模式
    devServer: {}
};
``` 
## 所需要的`Loader`
### `CSS`类的`Loader`
- `css-loader`
- `css-minimizer-webpack-plugin`
- `mini-css-extract-plugin`
- `less-loader`
- `less`
- `style-loader`
- ...

目前我暂时用到的就这些

### 解析`ES6`类的`Loader`
- `@babel/core`
- `@babel/plugin-transform-runtime`
- `@babel/preset-env`
- `babel-loader`
- `core-js`

### 解析`Html`类的`Loader`
- `html-webpack-plugin`

### `Webpack5`不需要用到的依赖
- ~~`url-loader`~~
- ~~`file-loader`~~
- ~~`clean-webpack-plugin`~~
- ~~`@babel/polyfill`~~
- ~~`@babel/runtime`~~  
- ~~`optimize-css-assets-webpack-plugin`~~

### 最后依赖列表预览
````json
"devDependencies": {
    "@babel/core": "^7.16.12",
    "@babel/plugin-transform-runtime": "^7.16.10",
    "@babel/preset-env": "^7.16.11",
    "babel-loader": "^8.2.3",
    "css-loader": "^6.5.1",
    "css-minimizer-webpack-plugin": "^3.4.1",
    "filemanager-webpack-plugin": "^6.1.7",
    "html-webpack-plugin": "^5.5.0",
    "less": "^4.1.2",
    "less-loader": "^10.2.0",
    "mini-css-extract-plugin": "^2.5.3",
    "style-loader": "^3.3.1",
    "webpack": "^5.67.0",
    "webpack-cli": "^4.9.2",
    "webpack-dev-server": "^4.7.3",
    "webpack-merge": "^5.8.0"
},
"dependencies": {
    "core-js": "^3.20.3"
},
````

> [`webpack5-boilerplate`](https://github.com/limingcan562/webpack5-boilerplate)这个脚手架，核心的就这些依赖，另外需要的依赖再自己装就好了。是不是觉得依赖少了很多，我是顿时觉得很舒服。接下来讲一下这些不需要用到的插件，如何在`Webpack5`里面用别的方式替代。  

## 使用`Asset Module`模块，来管理资源
> 官方解释：资源模块(`asset module`)是一种模块类型，它允许使用资源文件（字体，图标等）而无需配置额外 loader。  

以编译图片为例，所以如果我们要编译图片：  
```javascript
const 
maxSize = 10 * 1024,
outImageFileName = 'img/',
proResFileName = 'assets/';

/**
 * @maxSize 如果图片小于10Kb，会被转为base64
 * @outImageFileName 要导出到哪个文件夹，如果写在filename配置里面，则会导出到这个文件夹上
 * @proResFileName outputPath指的也是把该资源存放到proResFileName文件夹下
 */
module: {
    rules: [
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset',
            // 设置图片导出大小，如果小于预设的值，则会被转化成base64
            parser: {
                dataUrlCondition: {
                    maxSize
                }
            },

            // 设置导出的路径为 img
            generator: {
                filename: `${outImageFileName}[name]-[hash:2][ext][query]`,
                outputPath: proResFileName
            }
        },
    ]
}
```
参考文章：
- [`Webpack`资源模块](https://webpack.docschina.org/guides/asset-modules/)
- [模块](https://webpack.docschina.org/configuration/module/)

## 使用`output`里面配置，在生成文件之前清空`output`目录的内容  
这样我们就可以不需要安装`clean-webpack-plugin`这个插件了  
```javascript
output: {
    clean: true
};
```
参考文章：
- [`output.clean`](https://webpack.docschina.org/configuration/output/#outputclean)   

## 使用`mini-css-extract-plugin`插件来压缩`css`代码
```javascript
// Webpack5压缩配置
optimization: {
    minimizer: [
        // 压缩css
        new CssMinimizerPlugin(),

        // '...' 来访问默认值。（不加的话，js不会压缩）
        '...'
    ],
},
```

```javascript
// Webpack4压缩配置
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

plugins: [
    // 压缩css
    new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'), //用于优化\最小化 CSS 的 CSS 处理器，默认为 cssnano
        cssProcessorOptions: { safe: true, discardComments: { removeAll: true } }, //传递给 cssProcessor 的选项，默认为{}
        canPrint: true //布尔值，指示插件是否可以将消息打印到控制台，默认为 true
    }),
]
```

`Webpack5`压缩`css`的配置对比起`Webpack4`的更加简单。  

参考文章：
- [`CssMinimizerWebpackPlugin`](https://webpack.docschina.org/plugins/css-minimizer-webpack-plugin/)  


## `Babel`依赖配置
- `@babel/cli`：如果想用`npm`在终端编译`Babel`，则需要安装它
- `@babel/core`：这个`Babel`核心`npm`包
- `@babel/preset-env`：个人理解它就是个集合包，里面有很多`Babel`的插件跟语法规则，并且它已经内置了`@babel/runtime`包了。如果在`Babel.config.json`里面配置它，它还可以有针对性的对语法转化跟`polyfill`的部分引入
- `@babel/polyfill`：`Babel`默认只转换语法，不转换新的`API`（如`Promise、Map、Symbol`等），所以`@babel/polyfill`的作用就像一个叠片，让所有浏览器都支持新的`API`
- `@babel/plugin-transform-runtime`有三大作用（摘自网上）：  
    1. 自动移除语法转换后内联的辅助函数（`inline Babel helpers`），使用`@babel/runtime/helpers`里的辅助函数来替代；  
    2. 当代码里使用了`core-js`的`API`，自动引入`@babel/runtime-corejs3/core-js-stable/`，以此来替代全局引入的`core-js/stable`（避免污染全局）;  
    3. 当代码里使用了`Generator/async`函数，自动引入`@babel/runtime/regenerator`，以此来替代全局引入的`regenerator-runtime/runtime`；

> 注意：从`Babel7.4`开始，`@babel/polyfill`就不再推荐使用了，他变成了两个`npm`集合包的组成：`core-js`与`regenerator-runtime`

### 关于`@babel/preset-env`配置项相关解析
先看看以下配置：
```json
// babel.config.json
"presets": [
    [
        "@babel/env",
        {
            "useBuiltIns": "usage",
            "modules": false
        }
    ]
],
"plugins": [
    "@babel/plugin-transform-runtime"
]
```
- 当`useBuiltIns: "entry"`时，需要手动在我们的文件内`import '@babel/polyfill'`，但是此时会引入所有当前`browserslist`不支持的`API`
- 当`useBuiltIns: "usage"`时，不需要手动在我们的文件内`import '@babel/polyfill'`，并且会自动引入当前`browserslist`不支持的`API`，并且是当前`js`所用到的`es6+`模块，不会全部都引入
- 当`modules: "auto"`或者`默认值`时，我们当前开发`js`如果有`import`别的模块，则它会被编译成`require`的方式
- 当`modules: "false"`时，我们当前开发`js`如果有`import`别的模块，则它编译的时候会保持`import`的方式，利于`Webpack`一类的打包工具，进行`tree shaking`

### 对`Polyfill`补全方式的选择
- **全局注入**
    - 就是通过`polyfill`将当前`browserslist`不支持的`API`进行注入，注入后可以通过`window.[API]`访问到
    - 例如全局注入了`Promise`，则可以通过`window.Promise`访问到
    - 一般适用于整个前端业务项目

相关配置如下：
```json
// babel.config.json
"presets": [
    [
        "@babel/env",
        {
            "useBuiltIns": "usage",
            "modules": false
        }
    ]
],
"plugins": [
    "@babel/plugin-transform-runtime"
]
```
- **局部注入**：
  - 就是通过`@babel/plugin-transform-runtime`，`@babel/runtime-corejs3`配合使用将当前`browserslist`不支持的`API`进行注入
  - 注入后可以不能通过`window.[API]`访问到。因为它只是局部注入，不会污染全局
  - 一般适用于开发`js`库

相关配置如下： 
```javascript
npm i @babel/runtime-corejs3 -S
```

```json
// babel.config.json
"presets": [
    "@babel/env"
],
"plugins": [
    [
        "@babel/plugin-transform-runtime",
        {
            "helpers": true,
            "corejs": 3, // 如果为false，则不注入，但是此时代码所在的整体项目需要支持缺失的API
            "regenerator": true,
            "absoluteRuntime": false,
            "version": "7.17.0",
            "useESModules": true
        }
    ]
]
``` 

参考文章：
- [`Babel`教程](https://www.jiangruitao.com/babel/)
- [`Webpack4`搭建](https://itxiaohao.github.io/passages/webpack4-Babel7/)

## 关于`devServer`配置的理解
我想大家最懵圈的应该就是`devServer.static`（`Webpack5`是`static`，`Webpack4`是`contentBase`）这个配置了吧。是不是一直觉得，如果把里面的路径配置指向了我们打包出来的文件夹名字（`dist`），然后开启了`webpack-dev-server`服务器，就是访问的我们打包的那个资源（`dist`），其实并不是。这里大家可以自己建一个最简单的`demo`，然后配置改成下面这样：  
```javascript
output: {
    path: path.resolve(__dirname, `build`),
},
devServer: {
    static: {
        directory: path.resolve(__dirname, `outDir`),
    },
}
```
此时打包出来的文件夹是`build`，但是我们开启服务器访问的时候，访问是`outDir`文件夹，结果页面显示的还是我们的开发的`index.html`的内容，这就说明`devServer.static`的配置，根本就不是控制开启了`webpack-dev-server`服务器后访问的文件目录。这是经过本人测试，分析后的个人理解。  
> `devServer.static`，实际上指的是：**一个存放，不经过`Webpack`编译的静态资源目录，他是一个目录**。它的功能就很像是`vue-cli`里面的`public`文件夹，我们开发的时候，可以通过`./`或者`../`访问到那个资源（具体看目录关系）。  


### 怎么访问到`devServer.static.directory`里面的文件
首先，我们先清楚这几点：
1. 开启`webpack-dev-server`服务器时，以[`webpack5-boilerplate`](https://github.com/limingcan562/webpack5-boilerplate)为例，我们的代码会根据我们的配置，在内存中生成一个打包文件，保存在内存中的打包文件目录结构：  
    ```
    (http://localhost:8080/)
    ├── js
    ├── img
    ├── font
    ├── media
    ├── favicon.ico
    ├── index.html
    └── share.html
    ```  
2. 开启`webpack-dev-server`服务器时，`devServer.static.directory`里面的文件会直接被映射到根目录下  
3. `devServer.static.directory`，默认指向的是`public`文件夹。

OK，我们在根目录下新建一个`public`的文件夹，里面放一个`test.txt`文件。开启`webpack-dev-server`，打开`http://localhost:8080/test.txt`，我们就可以访问到这个不经打包的静态资源了。此时保存在内存中的文件目录结构就变成了：  
```
(http://localhost:8080/)
├── js
├── img
├── font
├── media
├── favicon.ico
├── test.txt （直接被映射到根目录下）
├── index.html
└── share.html
```
所以想要访问`devServer.static.directory`的内容就是：`http://localhost:8080/（文件名字）`。  
> 注意：
> 如果在`public`里面新建一个`index.html`，访问`http://localhost:8080/index.html`或者`http://localhost:8080/`时，内容是我们的开发的`index.html`模板，这是因为我们的配置把编译后的`index.html`输出在`dist`文件夹根目录了，此时覆盖掉了`public/index.html`(可以在插件`HtmlWebpackPlugin`，把输的`filename`，设置为`filename: index2.html`，在`public`下新建一个`index.html`，此时访问`http://localhost:8080/`就是`public`里面的`index.html`)  
> 所以我们在`public`文件夹里面，要避免与被编译的文件同名，否则会被覆盖掉。  


## 关于`devServer.devMiddleware.publicPath`配置说明
`devServer.devMiddleware.publicPath`对应的是`Webpack4`里面的`devServer.publicPath`，以下简称`publicPath`。  
在没有配置`publicPath`的时候，我们开启`webpack-dev-server`，访问`http://localhost:8080/`得到的是覆盖掉`public/index.html`的编译后的模板`index.html`。因为`publicPath`默认值是：`''`指向根目录，所以我们访问`http://localhost:8080/`就是根目录，不用在后面加路径。  
但是如果我们想类似以下访问我们的开发页面：`http://localhost:8080/test/`，我们只要将配置设置成：

```javascript
output: {
    publicPath: '/test/',
},
devServer: {
    /**
     * 表示打包生成的静态文件所在的位置，意思是url访问的路径
     * 改变dist访问的路径，outpath需要跟他一致，启动访问的url为http://localhost:8080/test/index.html
     */
    devMiddleware: {
        publicPath: '/test/',
    },
}
```
此时我们访问的开发页面的路径就是：`http://localhost:8080/test/`  
> 注意：`output.publicPath`与`devServer.devMiddleware.publicPath`要始终保持一致，不然会有问题







