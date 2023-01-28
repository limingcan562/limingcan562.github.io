---
title: 想弄懂Babel？你必须得先弄清楚这几个包
des: 学习Babel 7，看懂官方文档，梳理、了解，我们平时接触Babel用到的主要几个包，搞清楚Babel是什么、作用又是什么
createTime: 2023-1-19
---

## 前言
相信很多人都知道`Babel`，知道它是用来编译`ES6+`的东西。但是再深入一点，大家都清楚我们平时项目中`Babel`用到的那些包作用是什么吗？为什么要用那几个包？

另外，我们平时项目中`Babel`用到的包其实并不多，基本就是文章中讲解的这几个包，所以如果大家能把这几个包弄得很清楚，`Babel`的大部分知识也了解的差不多了。

由于`Babel`内容实在太多，加上配置讲的话，篇幅太长，大家阅读也累。为了让大家更好地理解，我们把`Babel`拆成两部分（`Babel`了解篇，`Babel`配置篇）来学习：

### `Babel`了解篇
就是本篇文章。脱离配置`Babel`这块，系统的梳理、介绍、讲解我们平时`Babel`用到的主要几个包。

### `Babel`配置篇
当我们在清楚地理解了`Babel`的主要几个包后，我们就能更好地深入`Babel`怎么配置。

> 注意：本篇文章不涉及`Babel`配置篇，后续会专门出文章讲解怎么配置`Babel`。

本篇文章稍微有点长，第一是因为`Babel`本身内容就特别多，第二是因为有些同学看官网的时候，觉得很难懂，所以文章写的比较详细，并且会答疑了一些我们平时看官网难懂的地方，所以希望大家可以静下心来，一个模块一个模块的看，每个模块都是循序渐进的。相信我，看完你一定会对`Babel`有一个**更清晰的理解**。 


章节中的案例，代码都放到 [Github](https://github.com/limingcan562/learn-babel-7) 上了，建议大家边阅读，边跟着案例看。如果大家觉得有帮助到，欢迎**Star** 跟 **Fork**学习。

备注：
- 当前`@babel/core`最新版本是：`7.20.12`
- 当前`@babel/preset-env`最新版本是：`7.20.2`


## `Babel`
> 官网解释：`Babel`是一个工具链，主要用于将采用`ECMAScript 2015+`语法编写的代码转换为向后兼容的 `JavaScript`语法，以便能够运行在当前和旧版本的浏览器或其他环境中。

我们可以这么理解，`Babel`就是一个工具。它是一个可以将`ES6+`等新特性，转换成低版本浏览器或其他环境能支持并正常运行的一个工具。

### 结构
很多人以为`Babel`只有`plugins`、`presets`等几个配置。其实不止，我们看看`Babel`配置文件大致架构：
````javascript
// babel.config.js
module.exports = {
    ...,
    envName: "development",
    plugins: [],
    presets: [],
    passPerPreset: false,
    targets: {},
    browserslistConfigFile: true,
    browserslistEnv: undefined,
    inputSourceMap: true
    ...
}
````
我们一般主要用到的就是`plugins`、`presets`这两个



### 功能
从大体上看，`Babel`提供以下两个功能组成：
- 编译`ES6+`最新语法（`let`、`class`、`() => {}`等）
- 实现旧版本浏览器不支持的`ES6+`的`API`（`Promise`、`Symbol`、`Array.prototype.includes`等）

参考文章：
- [What is Babel?](https://babeljs.io/docs/en/)
- [Options](https://babeljs.io/docs/en/options)

## `@babel/core`
从`core`可以看出，它是`Babel`实现编译的核心。所以我们如果要使用`Babel`，`@babel/core`这个包一定是必不可少的。另外我们平常说的`Babel 6`、`Babel 7`指的就是`@babele/core`的版本

参考文章：[@babel/core](https://babeljs.io/docs/en/babel-core)

## `@bable/cli`
> 官网解释：`Babel`自带了一个内置的`CLI`命令行工具，可通过命令行编译文件  

简单地说就是，让我们可以在**终端**里使用命令来编译（这样可以更好的调试打印信息）：
````
npx babel index.js
````
安装的话，我们最好安装到我们项目的本地目录下，尽量不要安装到全局（影响全局的东西，都很可怕）

参考文章：[`@babel/cli`](https://babeljs.io/docs/en/babel-cli)

## `@bable/preset-env`
> 官网解释：`@babel/preset-env`是一个智能预设，它允许您使用最新的`JavaScript`，而无需微观管理目标环境需要哪些语法转换（以及可选的浏览器`polyfill`）。这既让你的生活更轻松，也让`JavaScript`包更小！

### 理解
`@bable/preset-env`这个名字，我们可以拆开两部分来看，这样方便理解：
- `preset`预设
- `env`环境

#### `preset`
`Babel`编译`ES6+`**语法**，是通过一个个插件`plugin`去实现的。每年都会有不同新的提案、新的语法，但我们不可能一个个插件去配置，所以就有了`preset`这个东西。因此我们可以理解成`preset`就是一个**语法插件集合包**，这样我们只用安装这一个包，不需要一个个配插件，就可以很方便的编译最新的语法了。


我们通过一个不用预设的案例 [no-preset](https://github.com/limingcan562/learn-babel-7/tree/main/no-preset) ，感受一下如果不用`preset`有多麻烦。
````javascript
//  入口文件 index.js
const senses = ['eye', 'nose', 'ear', 'mouth'];

const lMC = {
    senses,
    like: ['eat', 'drink', 'play', 'fun'],
    information: {
        sex: 'male',
        age: '18+'
    },
    play: (sport = 'badminton') => {
        console.log(`play ${sport}`);
    }
};

const { like, information } = lMC;
````
这段代码，我们用了几个`ES6`新语法：
- `const`声明
- 属性的简洁表示法
- 箭头函数
- 函数默认值
- 模板字符串
- 解构

如果不用`preset`我们`Babel`配置如下：
````javascript
// Babel配置文件 babel.config.js
const plugins = [
    '@babel/plugin-transform-arrow-functions',
    '@babel/plugin-transform-block-scoping',
    '@babel/plugin-transform-destructuring',
    '@babel/plugin-transform-parameters',
    '@babel/plugin-transform-shorthand-properties',
    '@babel/plugin-transform-template-literals'
];
module.exports = {plugins};
````

编译后的文件：
````javascript
// 编译后的文件 compile.js
var senses = ['eye', 'nose', 'ear', 'mouth'];
var lMC = {
  senses: senses,
  like: ['eat', 'drink', 'play', 'fun'],
  information: {
    sex: 'male',
    age: '18+'
  },
  play: function () {
    var sport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'badminton';
    console.log("play ".concat(sport));
  }
};
var like = lMC.like,
  information = lMC.information;
````

在不用`preset`的情况下，实现上述编译的过程，我基本是用一个`ES6`新语法，我就要去查一个插件，首先我不记得那么多插件，其次一个个插件找真的很累。


ok，那我们再用一个使用了预设的案例 [use-preset](https://github.com/limingcan562/learn-babel-7/tree/main/use-preset) ，感受一下预设到底有多方便。
我们`npm i @babel/preset-env -D`，修改`babel.config.js`使用`preset`预设：

````javascript
// 修改babel.config.js
const presets = [
    '@babel/preset-env'
];

module.exports = {presets};
````
编译后的文件：
````javascript
// 编译后的文件 compile.js
"use strict";

var senses = ['eye', 'nose', 'ear', 'mouth'];
var lMC = {
  senses: senses,
  like: ['eat', 'drink', 'play', 'fun'],
  information: {
    sex: 'male',
    age: '18+'
  },
  play: function play() {
    var sport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'badminton';
    console.log("play ".concat(sport));
  }
};
var like = lMC.like,
  information = lMC.information;
````

我们会发现，用`preset`（预设）方式输出的代码，跟`plugins`（不用预设）方式输出的代码是几乎是一模一样的。但是`preset`的`babel.config.js`更简洁，我也不需要一个个插件去找，也不需要安装那么多插件，只用安装`@babel/preset-env`这一个包，就可以很愉快的写`ES6+`。


#### `env`
`env`指的是环境。因为`@babel/preset-env`还有一个配置功能，我们可以通过配置我们代码运行的**目标环境**，来控制`polyfill`（一个提供低版本浏览器缺失的`ES6+`新特性的方法与实现的集合 ，后面会有更详细的讲解）的导入跟语法编译，从而使`ES6+`新的特性可以在我们想要的**目标环境**中顺利运行。

> 备注：`@babel/preset-env`的配置功能，后续会有文章说明

### 功能
通过上面对`preset`、`env`的理解跟案例感受，我们能总结出`@babel/preset-env`主要提供以下功能：
- 它**只编译`ES6+`语法**（上述案例只使用了`ES6+`的语法，并没有用`ES6+`的`API`）
- 它并不提供`polyfill`，但是可以通过**配置**我们代码运行的**目标环境**，从而控制`polyfill`的导入跟语法编译，使`ES6+`的新特性可以在我们想要的**目标环境**中顺利运行


### 注意
我们先看看`TC39`提案分为几个阶段：
- 阶段0　 （`stage-0`）——草根（Strawman）：只是一个想法，可能是`Babel`插件。
- 第一阶段（`stage-1`）——提案（Proposal）：这是值得研究的。
- 第二阶段（`stage-2`）——草案（Draft）：初步规范。
- 第三阶段（`stage-3`）——候选（Candidate）：完整的规范和最初的浏览器实现。
- 第四阶段（`stage-4`）——完成（Finished）：将被添加到下一年度的版本中。

再看看官网中这段话：
> Note: `@babel/preset-env` won't include any JavaScript syntax proposals less than Stage 3 because at that stage in the TC39 process, it wouldn't be implemented by any browsers anyway. Those would need to be included manually. 

大致意思是：

- 在`Babel 7`以后，`@bable/preset-env`舍弃了`Stage presets`（`@babel/preset-stage-x`）这种预设
- `@bable/preset-env`只提供`TC39`大于`stage-3`的提案（即只包含`stage-4`阶段），因此如果要用小于`stage 4`的提案语法，则必须先安装再手动引入对应插件

第一点相信大家都很好理解，我们来理解一下第二点是什么意思。  

意思是，如果我们想用一些小于`stage-4`阶段的语法的话，光安装`@babel/preset-env`这一个包是没有用的，因为这个包里只包含编译`stage-4`的预设，所以我们就得安装并配置相应的`plugin`去编译。


在写这篇文章的时候，有一个新的语法 [do expressions](https://github.com/tc39/proposal-do-expressions) ，它当前是处于`stage-1`阶段的语法，用插件`@babel/plugin-proposal-do-expressions`可以编译这个语法。  

<img src="../md/know-babel/compole-stage-1-1.jpeg" alt="pic.jpeg" width="100%"/>  


> 官网解释：do { .. } 表达式执行一个块（其中有一个或多个语句），块内的最终语句完成值成为 do 表达式的完成值。

我们借助[官网](https://www.babeljs.cn/docs/babel-plugin-proposal-do-expressions)，整理成这个案例 [compile-stage-1](https://github.com/limingcan562/learn-babel-7/tree/main/compile-stage-1) 来看看怎么使用小于`stage-4`的语法。

我们先只用`@babel/preset-env`，看看能不能编译`do {...}`这个语法。

````javascript
// do expressions stage-1语法
let x = 100;
let y = 20;

let a = do {
    if (x > 10) {
        if (y > 20) {
            ("big x, big y");
        } else {
            ("big x, small y");
        }
    } else {
        if (y > 10) {
            ("small x, big y");
        } else {
            ("small x, small y");
        }
    }
};
````

`Babel.config.js`配置：
````javascript
const presets = [
    '@babel/preset-env'
];

// const plugins = [
    // '@babel/plugin-proposal-do-expressions'
// ];

// module.exports = {plugins, presets};

module.exports = {presets};
````

我们会发现终端报错：

<img src="../md/know-babel/compole-stage-1-2.png" width="100%" />

大致意思是：`@babel/preset-env`当前未启用对实验语法`doExpressions`的支持（因为`doExpressions`当前是`stage-1`的语法，`@babel/preset-env`只包含必编译`stage-4`的语法插件），需要我们加入`@babel/plugin-proposal-do-expressions`插件去编译。

那我们`npm i @babel/plugin-proposal-do-expressions -D`，修改一下`babel.config.js`：

````javascript
const presets = [
    '@babel/preset-env'
];

const plugins = [
    '@babel/plugin-proposal-do-expressions'
];

module.exports = {plugins, presets};

// module.exports = {presets};
````
我们可以看到，可以正常输出编译后的文件：
````javascript
"use strict";

var x = 100;
var y = 20;
var a = x > 10 ? y > 20 ? "big x, big y" : "big x, small y" : y > 10 ? "small x, big y" : "small x, small y";
````
所以，当我们想使用小于`stage-4`阶段的语法时，我们要先找到**其对应的编译插件**安装，然后在`plugins`里面配置就好了。

参考文章：
- [TC39 proposals](https://github.com/tc39/proposals)
- [proposal-do-expressions](https://github.com/tc39/proposal-do-expressions)
- [@babel/plugin-proposal-do-expressions](https://www.babeljs.cn/docs/babel-plugin-proposal-do-expressions)

### 补充
有时我们也可能需要知道我们当前的`preset`（预设）包含了哪些插件，那我们怎么查看当前`@babel/preset-env`包含了哪些预设呢？

我们可以通过查看`@babel/preset-env` --> `package.json` --> `dependencies`里面可以找到。我目前安装的`@babel/preset-env`版本为`7.20.2`，它包含了以下预设：

````json
// @babel/preset-env@7.20.2预设
"dependencies": {
    "@babel/plugin-bugfix-safari-id-destructuring-collision-in-function-expression": "^7.18.6",
    "@babel/plugin-bugfix-v8-spread-parameters-in-optional-chaining": "^7.18.9",
    ...,
    "@babel/plugin-transform-sticky-regex": "^7.18.6",
    "@babel/plugin-transform-template-literals": "^7.18.9",
    "@babel/plugin-transform-typeof-symbol": "^7.18.9",
    "@babel/plugin-transform-unicode-escapes": "^7.18.10",
    "@babel/plugin-transform-unicode-regex": "^7.18.6",
  },
````


## `polyfill`
### 功能
`ES6+`除了提供很多简洁的语法（`let`、`class`、`() => {}`等）外，还为我们提供了很多便捷的`API`（`Promise`、`Symbol`、`Array.prototype.includes`等）。但**旧版本浏览器是不支持这些`API`的**，而`polyfill`存放了这些`API`的方法与实现，所以它可以使得这些不支持的浏览器，支持这些`API`。

### 理解
我们可以把所有这种存放了`ES6+` `API`的**方法与实现的集合**叫做`polyfill`，也就是我们经常说的**垫片**。（如果把我们的旧版本浏览器缺失的`API`当做一个个坑，`polyfill`就是用来把这个坑填平）

`polyfill`也分很多种，像`core-js`是会提供旧版本浏览器缺失的**所有**的`API`；还有一些只提供缺失`API`的**某块**，例如 [promise-polyfill](https://github.com/taylorhakes/promise-polyfill[)、[proxy-polyfill](https://github.com/GoogleChrome/proxy-polyfill) 等。

`Babel`配置`polyfill`的过程，就是实现旧版本浏览器对这些`API`支持的过程。

## `@babel/polyfill`
上面我们解释了`polyfill`是什么，从包名`@babel/polyfill`就知道，它就是一个`polyfill`（其核心是依靠`core-js@2.x.x`实现）。虽然这个包已经被废弃了，但我们还是稍微了解一下它。

> **官网解释：**  
> 🚨 从Babel 7.4.0开始，这个包已经被弃用，转而直接包含`core-js/stable`（用于`polyfill ECMAScript`功能）  
> 
> **使用：**
> ````javascript
> import "core-js/stable";
> ````



### 初识
我们通过这个例子 [know-babel-polyfill](https://github.com/limingcan562/learn-babel-7/tree/main/know-babel-polyfill)，来了解一下`@babel/polyfill`的组成。
[know-babel-polyfill](https://github.com/limingcan562/learn-babel-7/tree/main/know-babel-polyfill) 什么都没安装，只安装了`@bable/polyfill`这个依赖，我们可以很清楚看到，`@bable/polyfill`由以下两个包组成：

<img src="../md/know-babel/babel-polyfill.jpeg" width="100%" />

- `core-js`（**版本为`2`**）
- `regenerator-runtime`

我们来大致理解一下这两包是什么：

#### `core-js`
这个包就是我们上述`polyfill`模块所说的，里面存放了很多`ES6+` `API`的方法与实现。如果要在旧浏览用到`Promise`、`Symbol`、`Array.prototype.includes`等方法时，这个包会为我们提供。它可以使那些不支持`API`的浏览器，支持这些`API`，它就是一种垫片。

> **特别注意**：由上图可知，`@babel/polyfill`是与`2`版本的`core-js`绑定的，`2`版本的`core-js`并不包含`stable`这个文件夹的。因此官网说的`import "core-js/stable"`，实际上是要我们安装`core-js@3.x.x`版本来代替`@babel/polyfill`，因为从`3`版本开始，才有`stable`这个文件夹

#### `regenerator-runtime`
我们的源码里面使用了`async function() {}`等异步函数，或者`fuction* myGenerator() {}`这种`Generator`函数的话，就会需要用到这个包来编译。

### 总结
所以对于`@babel/polyfill`，我们有以下总结：
- 这个包由`core-js`（**版本为`2.x.x`**）与`regenerator-runtime`两个包组成
- 这个包在`Babel 7.4.0`以后就废弃了，所以在`Babel 7.4.0`以后，我们想让一些不支持`ES6+` `API`的旧版本浏览器支持这些`API`，应该直接安装`core-js@3.x.x`的包（**不要安装`2.x.x`的版本，已经不维护了，目前最新版本为`3.x.x`**；并且只有`3`的版本才有`stable`这个文件夹）

参考文章：[@babel/polyfill](https://babeljs.io/docs/en/babel-polyfill)


## `core-js`
### 概述
通过上面`polyfill`、`@babel/polyfill`两个模块，我们可以知道它是一个垫片，它会提供旧版本浏览器缺失的**所有**的`API`，如果我们想要在旧浏览器用到`ES6+` `API`时，我们直接安装`core-js@3.x.x`这个包。  

通过 [官方的介绍](https://github.com/zloirock/core-js#babelpolyfill)，我们可以知道：
````javascript
import '@babel/polyfill';
````

等同于
````javascript
// core-js必须是3.x.x版本，因为2.x.x版本，不包含stable文件夹
import "core-js/stable";
import "regenerator-runtime/runtime";
````

`Babel >= 7.18.0`等同于
````javascript
// core-js必须是3.x.x版本，因为2.x.x版本，不包含stable文件夹
// Babel >= 7.18.0后 不需要再 import "regenerator-runtime/runtime";
import "core-js/stable";
````


### 注意

我们针对不需要再`import "regenerator-runtime/runtime"`这块，稍微解释一下，加深一下我们对`Babel`跟官网文档的理解。

我们看官方这段话：
> If you are compiling generators or async function to `ES5`, and you are using a version of `@babel/core` or `@babel/plugin-transform-regenerator` older than `7.18.0`, you must also load the [regenerator-runtime](https://github.com/facebook/regenerator/tree/main/packages/runtime) package

大家看这句话的时候可能有点疑惑，其实它的意思就是：

如果我们要把`async function() {}`等异步函数，或者`fuction* myGenerator() {}`这种`Generator`函数编译成`ES5`，并且`@babel/core`或`@babel/plugin-transform-regenerator`小于`7.18.0`，我们就需要手动`import "regenerator-runtime/runtime"`这个包。

但在`Babel 7.18.0`或者`@babel/plugin-transform-regenerator 7.18.0`及其以后的版本，`regenerator-runtime`包里面的内容会被**内联编译**到我们的代码中，所以我们只用引入`import "core-js/stable"`这一个包就可以了。

我们来用两个例子结合`Webpack`打包出来，在浏览器运行，这样更直观的理解感受一下。

#### `Babel < 7.18.0`
我们用这个例子 [import-regenerator-runtime](https://github.com/limingcan562/learn-babel-7/tree/main/import-regenerator-runtime) 看看在`Babel 7.18.0`之前为什么要手动引入`regenerator-runtime`这个包。

> **特别说明：** 我们例子安装`Babel`的版本为`7.16.7`，`@babel/plugin-transform-regenerator`这个插件必须**手动安装为小于`7.18.0`的版本**（因为我们安装依赖的时候，即使指定了依赖的版本，但依赖的依赖安装时，可能会是最新的，这样可能会看不出效果。所以为什么有时我们对着官网敲`Demo`实际出来的结果不一样，因为版本没对上）。可以通过`package-lock.json`查看各个依赖版本

ok，来看看我们的入口文件（`index.js`）：
````javascript
// 先不引入regenerator-runtime/runtime

// import 'regenerator-runtime/runtime';
const sleep = async function() {
    setTimeout(() => console.log('get up'), 1000);
}
sleep();
````
接着我们打包（`Webpack`打包出来的文件在`dist/dist.js`）在浏览器运行。正常情况下，浏览器应该会过一秒后输出`get up`。但实际情况如下，我们会发现之前网友们经常出现的一个问题——`regeneratorRuntime is not defined`：

<img src="../md/know-babel/import-regenerator-runtime.png" width="100%" />

说明缺失了`regeneratorRuntime`，我们再看看`Babel`编译后的文件（`compile.js`）：

<img src="../md/know-babel/import-regenerator-runtime-2.png" width="100%" />

我们发现在全局中，`regeneratorRuntime`根本没有定义，所以才报了`regeneratorRuntime is not defined`的错。

如果我们再手动引入一下`import "regenerator-runtime/runtime"`：
````javascript
import 'regenerator-runtime/runtime';

const sleep = async function() {
    setTimeout(() => console.log('get up'), 1000);
}
sleep();
````

此时浏览器输出：

<img src="../md/know-babel/import-regenerator-runtime-3.png" width="30%" />

当我们手动引入以后，浏览器可以正常运行了。

这说明，在`@babel/core`或`@babel/plugin-transform-regenerator`的版本小于`7.18.0`的时候，使用了异步函数（`async function() {}`），或者`Generator`这种函数（`fuction* myGenerator() {}`）的话，是需要我们手动引入`regenerator-runtime`这个包的，因为`regenerator-runtime`**这个包会为我们提供`regeneratorRuntime`这个全局对象**。

#### `Babel >= 7.18.0`
我们用这个例子 [no-import-regenerator-runtime](https://github.com/limingcan562/learn-babel-7/tree/main/no-import-regenerator-runtime) 看看在`Babel 7.18.0`之后为什么不需要手动引入`regenerator-runtime`这个包。（`@babel/core`版本为`7.20.12`）

ok，来看看我们的入口文件，这时不再手动引入`regenerator-runtime`这个包：
````javascript
const sleep = async function() {
    setTimeout(() => console.log('get up'), 1000);
}
sleep();
````

编译出包以后在浏览器运行，得到跟上述手动引入`regenerator-runtime`这个包一模一样的效果：

<img src="../md/know-babel/import-regenerator-runtime-3.png" width="30%" />

我们再看看`Babel`编译后的文件：

![no-import-regenerator-runtime.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f923b96597f4f0c948b82b5b2f01f6d~tplv-k3u1fbpfcp-watermark.image?)

我们会发现，`regenerator-runtime`包里的内容，会以**局部变量的方式内联注入到我们的代码中**，这样我们就不需要全局提供一个`regeneratorRuntime`对象了。

所以，在`Babel >= 7.18.0`以后，我们直接`import "core-js/stable";`就好


参考文章：
- [core-js](https://github.com/zloirock/core-js#babelpolyfill)
- [@babel/polyfill](https://babeljs.io/docs/en/babel-polyfill)
- [Inline regenerator-runtime helper](https://babeljs.io/blog/2022/05/19/7.18.0#inline-regenerator-runtime-helper-14538httpsgithubcombabelbabelpull14538)


## `@babel/runtime`
> 官方解释：`@babel/runtime`是一个包含`Babel`模块化运行时助手的库

在`Babel`编译的时候，会有一些辅助函数，这些函数就是`ES6+`一些语法糖的实现，我们用这个案例 [helper-functions](https://github.com/limingcan562/learn-babel-7/tree/main/helper-functions) 看看辅助函数是什么。

我们用`Babel`编译一下`class`这个语法糖：
````javascript
class People {
    constructor() {
    }
}
const person  = new Person();
````

编译以后：


<img src="../md/know-babel/heplper-functions.png" width="100%" />

我们先看红色框，它是`Babel`编译后的代码。我们会发现，编译以后生成很多函数，并且会以内联的方式插入到我们的代码中，这些函数就是我们说的**辅助函数**。

我们再看蓝色框，它是`@babel/runtime`的内容，它在`node_modules/@babel/runtime/helpers`。

我们最后来看看白色框，会发现`Babel`编译后的辅助函数，都可以在`@bable/runtime`里面找到。

所以`@babel/runtime`是**存放了`Babel`辅助函数的一个集合包**。


参考文章：[@babel/runtime](https://babeljs.io/docs/en/babel-runtime)

## `@babel/plugin-transform-runtime`
> 官方解释：一个插件，可以重用`Babel`注入的帮助程序代码以节省代码大小

通过上面`@babel/runtime`模块的了解，我们知道当我们使用了一些`ES6+`的语法糖时，`Babel`会生成一些辅助函数来编译这些语法糖，并以**内联的方式插入**到代码中。

那如果我们有10个文件都用到了语法糖，那这些辅助函数，是不是会生成10次，并内联插入10次呢？我们用这个案例 [no-use-transform-runtime](https://github.com/limingcan562/learn-babel-7/tree/main/no-use-transform-runtime) 来感受一下。

我们定义了三个文件，每个文件都用了`class`这个语法糖。

````javascript
// babel.config.js 配置文件
const presets = [
    '@babel/preset-env'
];
module.exports = {presets};

// Animal.js 文件
export default class Animal {
    constructor() {}
};

// Country.js 文件
export default class Country {
    constructor() {}
};

// index.js 文件
import Animal from "./class/Animal";
import Country from "./class/Country";

class People {
    constructor() {
    }
};

const lMC = new People();
const cat = new Animal();
const usa = new Country();
````

最后打包出来文件：

<img src="../md/know-babel/no-use-transform-runtime.png" alt="big-dist-size.png" width="100%" />

看看红色的框框，我们会发现实现的方法都是一样的，所以在每个使用到`class`语法糖的文件中，辅助函数都被生成并插入了一次，这些基本重复的代码，无疑是会大大增加我们的打包体积的。目前打包出来的体积是：`6KB`。

为了解决上述的弊端，我们就得使用`@babel/plugin-transform-runtime`插件。从`@babel/runtime`模块我们知道，它里面存放了`Babel`辅助函数的集合，`@babel/plugin-transform-runtime`会将我们用到的辅助函数，从`@babel/runtime`中以`require`或者`import`的方式，引入到我们的文件中，实现复用，从而减小我们最终输出包的体积。

所以`@babel/runtime`跟`@babel/plugin-transform-runtime`两者通常是配合一起使用。

> 备注：`@babel/plugin-transform-runtime`还有一个配置功能，后续会有文章说明

我们用这个案例 [use-transform-runtime](https://github.com/limingcan562/learn-babel-7/tree/main/use-transform-runtime) 看看使用了`@babel/plugin-transform-runtime`插件以后有什么变化。

我们的案例代码跟上述一样，只是在`babel.config.js`增加了`@babel/plugin-transform-runtime`配置
````javascript
// babel.config.js 配置文件
// 增加了@babel/plugin-transform-runtime 配置
const plugins = [
    '@babel/plugin-transform-runtime'
]
const presets = [
    '@babel/preset-env'
];
module.exports = {plugins, presets};

// Animal.js 文件
export default class Animal {
    constructor() {}
};

// Country.js 文件
export default class Country {
    constructor() {}
};

// index.js 文件
import Animal from "./class/Animal";
import Country from "./class/Country";

class People {
    constructor() {
    }
};

const lMC = new People();
const cat = new Animal();
const usa = new Country();
````

编译跟打包后的文件：

<img src="../md/know-babel/use-transform-runtime.png" alt="big-dist-size.png" width="100%" />


我们会发现：
- 辅助函数会以`require`引用的方式加到我们的代码中
- 打包后，辅助函数只用了一次，而且不是插入三次，很好的实现了复用
- 打包出来的体积也变成了`3KB`，很好的缩小了最后包的体积（不要小看缩小了`3KB`，只是因为我用最简单的方式写了`ES6+`语法，实际中我们项目肯定没那么简单）

所以`@babel/runtime`跟`@babel/plugin-transform-runtime`两者配合一起使用，一般来说是可以帮助我们大大减少打包后的体积的。


## 最后
如果读完这篇文章，你对`Babel`的主要几个包已经有了更清晰的认识，那已经可以更好的深入`Babel`配置了。

因为`Babel`的知识体系实在太大了，所以我们应该先把`Babel`主要的几个包弄清楚，才能更好地深入配置。关于`Babel`的配置，会后续再出文章。

我们平常项目中`Babel`用到的包，基本就是这篇文章中讲解的几个包，这篇文章算是十分详细的介绍了这几个包了。如果大家能把这几个包弄得很清楚，`Babel`的大部分知识也了解的差不多了。

文章中有用到`Webpack`，如果你也想了解`Webpack`的知识，可以看看我自己用`Webpack5`搭的脚手架 [webpack5-boilerplate](https://github.com/limingcan562/webpack5-boilerplate)，跟之前我写的这篇文章—— [webpack5优化的地方及搭建的一些体会](https://juejin.cn/post/7077189347941974024)。

如果读完这篇文章的你，觉得真的有帮助到，**欢迎点赞收藏**；如果有异同点，**欢迎在评论区讨论**。
