---
title: Babel”新的配置方法“，你知道吗？
des: 新的配置方法，更加简便，更加强大
createTime: 2023-5-22
---

# 前言
在上一篇文章——[Babel配置不要再“复制粘贴”了，带你自己配一个Babel](https://juejin.cn/post/7197666704435920957) 中，我们知道：
- 如果我们开发的项目是**应用程序**，或者**大型的项目**，我们可以利用`@babel/preset-env`的配置功能，对`ES6+` `API`进行**全局垫平**。所以我们一般这么配置：
    ```js
    // babel.config.js
    const presets = [
        [
            '@babel/preset-env',
            {
                modules: false,
                useBuiltIns: 'entry', // 或者 useBuiltIns: 'usage'
                corejs: { version: '3.27.2', proposals: true }
            }
        ]
    ];

    const plugins = [
        '@babel/plugin-transform-runtime'
    ]
    module.exports = {plugins, presets};
    ```

- 如果我们是想开发一个**第三方库**，我们可以利用`@babel/plugin-transform-runtime`的配置功能，对`ES6+` `API`进行**局部垫平**，而不影响全局的环境。所以我们一般这么配置：
    ```js
    // babel.confing.js
    const presets = [
        [
            '@babel/preset-env',
            { modules: false }
        ]
    ];
    const plugins = [
        [
            '@babel/plugin-transform-runtime',
            {
                corejs: {
                    version: 3,
                    proposals: true
                }
            }
        ]
    ];
    module.exports = {plugins, presets};
    ```

以上是我们平时关于`Babel`见得最多的配置方法。但是这么配：
- 有时我们要关注`@babel/preset-env`配置，有时又要关注`@babel/plugin-transform-runtime`配置，并且配置项那么多，这种配置方法其实还是挺**繁琐**的
- `Babel`内容知识点本来就十分多，如果我们本身对`Babel`就“懵懵懂懂”的话，这无疑会很容易加深我们对`Babel`的疑惑，让我们觉得更懵圈。

**但其实还有一种新的`Babel`配置方法，它既能实现以上的配置，配置起来更加简洁，并且功能比上面的配置还要强大，同时它也是`Babel`成员更推荐的配法**。

学习是个循序渐进的过程，所以这篇文章接下来会带大家：
1. 大致了解这种新的配置方法一些背景故事，为什么诞生
2. 了解这种新的配置方法如何配置
3. 答疑以前我们学习关于`Babel`配置的疑问
4. 目前新配置方法存在的问题

PS：
- 为了大家阅读方便，每个模块相对独立，大家可以挑选自己喜欢的模块阅读  
- 想直接看怎么用的朋友，可以直接跳到**使用模块**

# 特别说明
本着写文章注重质量跟严谨性的态度，也为了大家可以更放心的使用这个新的配置方法，因此这个新的配置方法，我也阅读了大量关于`Babel`的文章，也在`github`上提了一些`issues`向`Babel`的开发成员求证学习。  

`Babel`的开发成员也十分友好，回应了我说：
 - 新的配置方法文档由两部分组成
 - **目前这个新的配置方法是他们更推荐的配法，完全可以用来替换`@babel/preset-env`、`@babel/plugin-transform-runtime`这两个包的配置功能**，达到一样的配置效果
 - 新的配置方法有一个对应的包，这个包在`@babel/preset-env`内部也稳定使用了

详细的可以看看我在`Babel`提的`issues`：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/758041bbbfba4057b170b216d2e88cc9~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9c9eb36eec294327a548c82f3d843efd~tplv-k3u1fbpfcp-watermark.image?)

`issues`链接：
- [Some of the proposed methods do not seem to have been realised](https://github.com/babel/babel/issues/15412#issuecomment-1518289649)
- [The "useBuiltIns: usage" mode and "usage-global" mode have different output codes](https://github.com/babel/babel/issues/15596#issuecomment-1528698891)

目前`Babel`官网并没有对这个新的配置方法有更详细的说明，相信后续这个方法可能也会成为`Babel`配置的主流。因此，大家学习到这种方法，也算是对`Babel`的一种拓展，但是最重要的是**我们可以利用这个新的方法，更方便的配置我们的`Babel`**

毕竟得到了官方`Babel`开发成员的回答与肯定，所以**这个新的配置方法，大家是可以放心“食用”的**。

# 准备
在文章开始之前，如果你对`Babel`已经有一个系统的了解，也明白`Babel`怎么配置，那么这篇文章会让你学习到`Babel`一种更强大的新的配置方法；

但是如果你才刚接触`Babel`，或者对`Babel`似懂非懂，还处于迷迷糊糊的状态，那我还是强烈建议你先阅读之前的两篇文章（**尤其是第二篇**）：

 - [想弄懂Babel？你必须得先弄清楚这几个包](https://juejin.cn/post/7190312484492804156)

    它主要介绍了我们平时项目中使用`Babel`的几个包，并答疑了我们学习`Babel`时的一些疑惑，让我们对`Babel`有个系统大致的理解。
 - [Babel配置不要再“复制粘贴”了，带你自己配一个Babel](https://juejin.cn/post/7197666704435920957)

    它主要讲解了我们平时项目中使用`Babel`配置的一些原理，还有应该如何更好的配置。

# 备注
- 我们把**前言**提到的以前的配置方法统称为：旧的配置方法
- 我们把这篇文章讲的新的配置方法统称为：新的配置方法
- 我们把通过引入`core-js`的**某个模块**（或其他`polyfill`），来实现旧版本浏览器不支持的**某个**`ES6+` `API`的过程，叫做垫平
- 当前`@babel/core`最新版本是：`7.21.8`
- 当前`@babel/preset-env`最新版本是：`7.21.5`

# 历史问题
通过前两篇文章，我们知道：
- 我们可以把所有这种存放了`ES6+` `API`的**方法与实现的集合**叫做`polyfill`
- `core-js`只是一种`polyfill`，还有很多其他`polyfill`。例如： [promise-polyfill](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Ftaylorhakes%2Fpromise-polyfill%255B "https://github.com/taylorhakes/promise-polyfill%5B")、[proxy-polyfill](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FGoogleChrome%2Fproxy-polyfill "https://github.com/GoogleChrome/proxy-polyfill") 、[es-shims](https://github.com/es-shims/es5-shim)等
- 如果我们是用`core-js`这个`polyfill`来垫平的话，应该用`core-js`的最新版本来垫平，越新的版本，包含的`ES6+` `API`实现就越多

OK，我们接着往下看。

[Babel项目](https://github.com/babel)中有这样一个包——[babel-polyfills](https://github.com/babel/babel-polyfills)

> 注意：大家看清楚，不是`@babel/polyfill`这个包，它跟`@babel/polyfill`是两码事  
> 不了解`@babel/polyfill`这个包的朋友，之前的文章——[想弄懂Babel？你必须得先弄清楚这几个包](https://juejin.cn/post/7190312484492804156)中有专门的说明

它的出现，有一段故事，主要是为了解决以下问题（更详细的故事，可以看看[这里](https://github.com/babel/babel/issues/10008)）：
- 以前`@babel/preset-env`这个包的`targets`选项，不能与`@babel/plugin-transform-runtime`这个包共享，`@babel/plugin-transform-runtime`设置不了`targets`
- 上面我们说过，`core-js`只是一种`polyfill`，还有很多其他`polyfill`。所以有可能不是所有人都想用`core-js`这个`polyfill`
- 为了更好的用户体验，旧的配置方法太繁琐

## 补充

关于问题一，我们再做一些补充：  

在旧的配置方法中，如果我们想开发一个第三方库的话，我们是利用`@babel/plugin-transform-runtime`的配置方法来开发的（因为配置`@babel/plugin-transform-runtime`，会以局部方式垫平`ES6+` `API`）但是在以前，这会导致库的体积十分庞大。

这是因为之前`@babel/plugin-transform-runtime`（或者别的插件）不能识别到我们要兼容的目标环境（即`targets`，或者是`packjson`的`browserslist`），所以会把我们代码中使用到的`ES6+` `API`**都垫平**，即使我们目标环境支持这些`ES6+` `API`。

但是在我们后续学习`Babel`配置的时候，我们会发现`@babel/plugin-transform-runtime`（或者别的插件）是可以识别`targets`的，不能识别`targets`这个问题并不能很好的体会到。这就让我们十分疑惑。

> 如果你在学习`Babel`过程中对这个问题有过疑惑的话，可以去**相关答疑模块**查看原因


# 结构
[babel-polyfills](https://github.com/babel/babel-polyfills) 可以看作是一个总的资源包，它存放了三种用于垫平`ES6+` `API`的插件包：

- [babel-plugin-polyfill-corejs2](https://github.com/babel/babel-polyfills/blob/main/packages/babel-plugin-polyfill-corejs2)：用`core-js` `2+`版本来垫平`ES6+` `API`
- [babel-plugin-polyfill-corejs3](https://github.com/babel/babel-polyfills/blob/main/packages/babel-plugin-polyfill-corejs3)：用`core-js` `3+`版本来垫平`ES6+` `API`
- [babel-plugin-polyfill-es-shims](https://github.com/babel/babel-polyfills/blob/main/packages/babel-plugin-polyfill-es-shims)：用`es-shims`这个`polyfill`来垫平`ES6+` `API`（为了解决上述问题二，不是每人都想用`core-js`这个`polyfill`来垫平）

OK，从上面关于三个包的描述，我们可以清楚的知道它们的作用分别是什么。

我们重点关注 [babel-plugin-polyfill-corejs3](https://github.com/babel/babel-polyfills/blob/main/packages/babel-plugin-polyfill-corejs3) 这个包，因为：

- `Babel`推荐的`polyfill`是`core-js`，目前`core-js`最新版本已经是`3+`的版本了
- 我自己也试了一下用`es-shims`来垫平`ES6+` `API`，然而并没有`core-js`那么方便（大家也可以自己试试）
- 通过`babel-plugin-polyfill-corejs3`这个包的名字，以此类推，后续如果`core-js`升级到`4+`版本的话，应该会再出`babel-plugin-polyfill-corejs4`这个包等
- `babel-plugin-polyfill-corejs3`这个包也已经在`@babel/preset-env`内部使用了（[相关链接](https://github.com/babel/babel/pull/12583)）
- **官方所说的新的配置方法，也是基于这个包**

# 回顾
在讲解如何使用新配置方法前，我们先大致回顾分析一下旧的配置方法是怎么配置，方便后续我们更好的理解如何使用。

> 在这里只是大概说明，更详细的分析，建议大家去阅读上一篇文章——[Babel配置不要再“复制粘贴”了，带你自己配一个Babel](https://juejin.cn/post/7197666704435920957) 

笼统的来说，平时我们做开发，不是开发大型项目、应用程序，就是开发第三方库。  
而这些都是需要配置`Babel`来垫平我们不支持`ES6` `API`的目标环境的。所以在这里，我们可以笼统的把垫平方式看成两大方式：

- 全局方式垫平 —— 适用于大型项目或者应用程序
- 局部方式垫平 —— 适用于开发第三方库


## 全局方式垫平

**全局的方式**垫平`ES6+` `API`，则都是利用`@babel/preset-env`的配置功能，它有两种配法（配置代码见**前言模块**）：

1. `useBuiltIns: 'entry'`
2. `useBuiltIns: 'usage'`

### `useBuiltIns: 'entry'`

这种方式比较简单粗暴。它需要我们在**入口**文件手动`import`**所有**或者**某块**`polyfill`，这样`Babel`会引入我们目标环境（`targets`）不支持的`polyfill`模块。

这种方式可以避免一些奇奇怪怪的问题，但某种程度来说，也会增大我们打包后的体积。

### `useBuiltIns: 'usage'`

这种方式则不需要我们手动引入`polyfill`。`Babel`会根据我们**当前代码中用到的`ES6+` `API`**，并判断当前的`targets`支不支持我们用到的这个`ES6+` `API`，不支持的话则**自动导入这个`ES6+` `API`对应的`polyfill`**。

这种方式虽然比较方便，但它是根据我们**当前自己代码中**用到的`ES6+` `API`来做判断的。所以如果我们使用的第三方库中，有用到我们当前`targets`不支持的`ES6+` `API`，但是我们自己的代码又没有用到这个`API`的话，那就会出问题了。  

具体问题可以看看这个例子 [use-third-party-library-problem](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Flimingcan562%2Flearn-babel-7%2Ftree%2Fmain%2Fknow-babel-config%2Fuse-third-party-library-problem "https://github.com/limingcan562/learn-babel-7/tree/main/know-babel-config/use-third-party-library-problem")


## 局部方式垫平
如果我们开发的是一个第三方库，我们当然要把我们的代码与使用者的代码做隔离，所以我们是需要以局部方式来垫平`ES6+` `API`的。

而以**局部的方式**垫平`ES6+` `API`，则是利用`@babel/plugin-transform-runtime`的配置功能（配置代码见**前言模块**）。

它会判断我们想要兼容的目标环境（很久以前判断不了），并根据**我们代码中使用到的`ES6+` `API`**，最后再将`polyfill`以**局部变量的方式**进行垫平。

# 使用
上面我们的大概说了：
- 新的配置方法诞生的一些历史
- 新的配置方法是基于 [babel-plugin-polyfill-corejs3](https://github.com/babel/babel-polyfills/blob/main/packages/babel-plugin-polyfill-corejs3) 这个插件包
- 回顾了一下旧的配置方法

我们先来看看新的配置方法是怎么配置的，先有个大概印象：

```js
const presets = [
    '@babel/preset-env',
]
const plugins = [
    [
        'babel-plugin-polyfill-corejs3',
        {
            method: "entry-global", // usage-global || usage-pure
            version: '3.20.2',
            proposals: true
        }
    ],
    '@babel/plugin-transform-runtime',
];

```

我们可以跟**前言模块**旧的配置方法对比一下，**这简直简便的不能再简便**

OK，接下来我们具体看看到底怎么配置。



## 配置项
在提了 [issues](https://github.com/babel/babel/issues/15412#issuecomment-1518201737) 询问了关于文档的配置项，并得到`Babel`贡献者的[回答](https://github.com/babel/babel/issues/15412#issuecomment-1518289649)后，可以知道 [babel-plugin-polyfill-corejs3](https://github.com/babel/babel-polyfills/blob/main/packages/babel-plugin-polyfill-corejs3) 这个包有以下配置项：
- **`method`（重点）**
- **`version`**
- **`proposals`**
- **`targets`**
- `ignoreBrowserslistConfig`
- `configPath`
- `debug`
- `include`
- `exclude`
- `shouldInjectPolyfill`
- `absoluteImports`
- `missingDependencies`

大家不要被那么多配置项吓到，**平常用到的就前三个**（`targets`也会讲解一下），其他的在我们需要用到的时候在学（太累了，能不学的尽量不学）。

## `method`
这个配置项就是用来**控制我们垫平`ES6+` `API`的方式。**

它一共有三个值：
- `entry-global`
- `usage-global`
- `usage-pure`

我们可以这么拆解，这样更方便我们记忆使用：
- 我们可以把`-`前面当做第一部分，它指的是控制`polyfill`引入的方式。是手动在**入口**引入，还是根据**我们代码中用到的**`ES6+` `API`自动引入
- 我们可以把`-`前面当做第二部分，它指的是`polyfill`是以**全局**还是**局部**的方式垫平
- 我们也会发现它们的值，跟旧的配置方法有所对应

### `entry-global`
#### 分析
我们可以把值拆成两部分来看：`entry`跟`global`。从这两个十分语义化的词我们可以知道：

- `entry`：**入口**。它指的是我们要在**入口**引入我们的`polyfill`
- `global`：**全局**。指的是，`polyfill`以**全局的方式**垫平

我们以`ie 11`为目标浏览器，用 [entry-global](https://github.com/limingcan562/learn-babel-7/tree/main/new-babel-config/entry-global) 这个例子，来感受一下它跟旧的配置方法有没有什么区别：

![entry-global.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7773adf26eab41dbbebcf89b4bc2c8ed~tplv-k3u1fbpfcp-watermark.image?)

根据上面的结果，我们会发现：
- 使用了新旧两种配置方法，发现编译后，注入的`polyfill`都是**234行**
- 编译后的文件都是一模一样的。  

#### 总结
`method: 'entry-global'`相当于旧的配置方法中的`useBuiltIns: 'entry'`

#### 注意
[文档](https://github.com/babel/babel-polyfills/tree/main/packages/babel-plugin-polyfill-corejs3)说`version`配置项，只有在使用`usage-global`或者`usage-pure`时才有用。

但是我试了一下，**在`entry-global`也是可以使用`version`的**，所以我有提 [issues](https://github.com/babel/babel/issues/15618)，目前没有答复

### `usage-global`
#### 分析
我们可以把值拆成两部分来看：`entry`跟`global`。从这两个十分语义化的词我们可以知道：

- `usage`：**用法**。它指的是**我们代码中用到**的`ES6+` `API`
- `global`：**全局**。指的是`polyfill`以**全局的方式**垫平


我们以`ie 11`为目标浏览器，使用两个`ES6+` `API`：
- [array-grouping](https://github.com/tc39/proposal-array-grouping)：它是个可以让数组分组更方便的`API`，目前它处于`stage-3`阶段
- `Promise`：我们最熟悉的异步`API`

并且用 [usage-global](https://github.com/limingcan562/learn-babel-7/tree/main/new-babel-config/usage-global) 这个例子来感受一下它跟旧的配置方法有没有什么区别：

![usage-global.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/75edf2860ee843c7b36c52d10d506ecf~tplv-k3u1fbpfcp-watermark.image?)

根据上面的结果，我们会发现：
- 在`ie 11`中，只垫平了我们用到的那两个`ES6+` `API`
- 编译后的文件都是一模一样的

#### 总结
`method: 'usage-global'`相当于旧配置方法中的`useBuiltIns: 'usage'`

### `usage-pure`
#### 分析
我们可以把值拆成两部分来看：`usage`跟`pure`。从这两个十分语义化的词我们可以知道：
- `usage`：**用法**。它指的是**我们代码中用到**的`ES6+` `API`
- `pure`：**纯净**。指的是`polyfill`以**局部的方式**垫平，并不会**污染**全局，因此它是纯净的

我们以`ie 11`为目标浏览器，还是使用上面两个`ES6+` `API`：
- [array-grouping](https://github.com/tc39/proposal-array-grouping)：它是个可以让数组分组更方便的`API`，目前它处于`stage-3`阶段
- `Promise`：我们最熟悉的异步`API`

并且用 [usage-pure](https://github.com/limingcan562/learn-babel-7/tree/main/new-babel-config/usage-pure) 这个例子来感受一下它跟旧的配置方法有没有什么区别：

![usage-pure.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/820523ab632240799e8a17807f02fe7f~tplv-k3u1fbpfcp-watermark.image?)

根据上面的结果，我们会发现：

旧的配置方法，是**无法垫平一些提案阶段的`ES6+` `API`的**。因为：
- 旧的配置设置的`version`只能是`3`，`3`代表的是`core-js@3.0.0`的版本，那它肯定不能垫平一些比较新的提案
- 新的配置方法，是可设置`core-js`的次版本号的（`core-js@3.x.x`），因此它能支持更多的`ES6+` `API`。所以新的配置方法更加强大

#### 总结
- `method: 'usage-pure'`相当于旧配置方法中，配置`@babel/plugin-transform-runtime`的方式
- 新的配置方法比旧的配置方法**更简便，更强**

#### 注意
我们需要`npm i core-js-pure -S`，因为：

- 以**全局变量方式**垫平是基于`core-js`这个包
- 以**局部变量方式**垫平是基于`core-js-pure`这个包

文档没有说，不安装相关依赖的话，会报错


## `targets`
它指的是我们垫平`ES6+` `API`的**目标环境**。

这个配置项设计的初衷是为了解决**历史问题模块**提到的第一个问题：  
- 利用`@babel/plugin-transform-runtime`配置开发第三方库时，以前`@babel/plugin-transform-runtime`是不能识别`targets`的，这会导致库的体积很大。

所以有了`targets`这个配置项，会帮我们大大的减少体积。


我们进行以下步骤：
- 安装`< 7.13.0`版本的`Babel`（`@babel/core@7.12.0`）
- 使用`Promise`、`Array.includes`两个`ES6+` `API`

然后用 [target-configuration](https://github.com/limingcan562/learn-babel-7/tree/main/new-babel-config/target-configuration) 这个案例，感受一下以前`targets`这个配置项在以前是怎么发挥作用的。

我们先看第一个结果（不配置`targets`，但设置了`browserslist: ["chrome 100"]`）：

![targets-problem-1.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3fd0e2684fae438ba2a164cb44e22ee2~tplv-k3u1fbpfcp-watermark.image?)

按照最新版本的`Babel`来说，设置了`browserslist: ["chrome 100"]`，我们的代码只会垫平`chrome 100`不支持的`ES6+` `API`。  
但是现在我们安装的是比较旧的版本（`7.12.0`），根据上图我们会发现，即使我们设置的目标浏览器（`chrome 100`）是支持这些`API`的，但`Babel`依旧垫平了这些`API`，所以我们的库会变得十分大，这是**历史问题模块**问题一很好的体现。

我们再来看第二个结果（配置`targets`）:

![targets-problem-2.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ac88338abc94378975abfa758afa2af~tplv-k3u1fbpfcp-watermark.image?)

我们会发现，因为我们新的配置方法设置了`targets`，所以此时`Babel`不会垫平`targets`支持的`API`，这大大节约了我们库的体积。这就很好的解决了**历史问题模块**的问题一。

> 在`Babel >= 7.13.0`的版本以后，在`Babel`配置文件新增了一个顶级的`targets`，并且`Babel`也支持识别`browserslist`  
> 所以在新的配置方法里`targets`这个配置项就不怎么用了。


## `version`
它指的是我们提供`polyfill`的集合包（像`core-js`，里面存放了很多`polyfll`集合）的版本。

因为我们是使用`babel-plugin-polyfill-corejs3`这个包
- 全局方式垫平的话，是用`core-js`这个包来垫平，所以`version`指的是`core-js`版本
- 局部方式垫平的话，是用`core-js-pure`这个包来垫平的，所以`version`指的就是`core-js-pure`的版本

**我们`version`当然是要越高越好，这样包含的`polyfill`才会更多**

参考文章：[babel-plugin-polyfill-corejs3](https://github.com/babel/babel-polyfills/tree/main/packages/babel-plugin-polyfill-corejs3)

## `proposals`
它指的是，我们是否开启编译处于提案阶段的`ES6+` `API`，那我们当然是要开启的，这个值只有在`method: 'usage-global'` 或者 `method: 'usage-pure'`时有用


# 相关答疑
在**历史问题**模块中，我们有说到：

- 在后续学习的过程中，我们发现`@babel/plugin-transform-runtime`（或者别的插件）是可以识别`targets`的，**但有些文章说不能识别**，这加深了我们对`Babel`的疑惑。

其实这一切的原因还是因为：**我们后续学习`Babel`的时候，`Babel`已经进行了很多更新，我们当前学习`Babel`时候的版本，跟以前那会的`Babel`版本已经不一样了，因此问题不能很好的体现。**

**所以以后我们学习`Babel`一定要注意好版本号，这就是为什么关于`Babel`的文章，我都会写上`Babel`版本备注的原因。**

OK，我们接着往下看。

在`Babel`发布`7.13.0`版本时候有一些[记录](https://babeljs.io/blog/2021/02/22/7.13.0)说到：
- 增加了顶层的`targets`
- 支持识别`browserslist`里面环境

这就是为什么后续我们学习`Babel`，有些文章说`@babel/plugin-transform-runtime`不能识别`targets`，但是我们照着例子敲，结果却是可以识别的原因。**因为我们学习的时候，`Babel`版本可能已经`>= 7.13.0`，并且可能配置了`browserslist`或者`targets`，这时`@babel/plugin-transform-runtime`已经可以识别`targets`了**

为了更好的感受这个问题，我们用 [transform-runtime-targets-problem](https://github.com/limingcan562/learn-babel-7/tree/main/new-babel-config/transform-runtime-targets-problem) 这个案例来感受一下： 

- 我们安装一个`< 7.13.0`版本（`7.12.0`）
- 配置`browerslist`为`chrome 100`
- 使用`Array`的`includes`方法（`chrome 100`已经支持）
- 使用`Promise`（`chrome 100`已经支持）

我们来看看结果：

![transform-runtime-targets-problem.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee0e2a906e2a433dad3deac6dfcb807a~tplv-k3u1fbpfcp-watermark.image?)

`chrome 100`已经支持了`Array`的`includes`跟`Promise`，但依旧被垫平了。

因为我们安装的`Babel < 7.13.0`，此时还没实现插件能识别`targets`

根据这个案例，相信大家应该对`Babel`的疑惑又减少了一些了。

# 新配置方法目前存在的问题
我们在**回顾模块**有说到，使用局部变量的方式垫平`ES6+` `API`，它会根据**我们代码中使用到的`ES6+` `API`**，最后再以**局部变量的方式**进行垫平。

`Babel`在进行编译的时候，是会注入很多**辅助函数**的，那么会有这样一种情况：

- 我们的代码中没有使用到`Promise`，但是辅助函数中用到了`Promise`，那这时我们的代码是不会垫平`Promise`的，因为我们自己的代码中没有用到`Promise`，那这是不是会导致代码报错呢？

这是个很现实的问题，我们用 [usage-pure-problem](https://github.com/limingcan562/learn-babel-7/tree/main/new-babel-config/usage-pure-problem)  这个例子来看看新旧配置方法，对于这块问题有没有处理。

## 旧的配置方法

我们先看看旧的配置方法的表现：

![usage-pure-problem-1.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d8296e0a02c543bdb28b4a2d963c6976~tplv-k3u1fbpfcp-watermark.image?)

我们来分析一下这个编译过程：

- 我们的源码里面只使用了`async`
- `Babel`从`@babel/runtime-corejs3`这个包里引入了辅助函数
- `ie 11`正常运行

## 新的配置方法

我们先看看新的配置方法的表现：

![usage-pure-problem-2.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c9daf0390d91468e84e2e68527031905~tplv-k3u1fbpfcp-watermark.image?)

我们来分析一下这个编译过程：

- 我们的源码里面只使用了`async`
- `Babel`从`@babel/runtime`这个包里引入了辅助函数
- `ie 11`报错

## 分析
我们来分析一下，为什么新的配置方法在`ie 11`会报`Promise`的错。

我们自己的源码中没有用到`Promise`，所以这个`Promise`肯定来自辅助函数。我们可以看到新旧配置方法，引入的辅助函数是来自不同的包：

- 旧的配置方法辅助函数来自：`@babel/runtime-corejs3`
- 新的配置方法辅助函数来自：`@babel/runtime`

经过一番查询，我们发现：

- 旧的配置方法，`Promise`来自辅助函数的这个包：`@babel/runtime-corejs3/helpers/asyncToGenerator`
- 新的配置方法，`Promise`来自辅助函数的这个包：`@babel/runtime/helpers/asyncToGenerator`

我们对比一下这两个包有什么不一样的：

![usage-pure-problem-3.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b2a0660e874943fca2eb1dcf6c2bc798~tplv-k3u1fbpfcp-watermark.image?)

通过分析对比，我们可以很清楚的知道：

旧的配置方法，引入的辅助函数都是局部变量方式的存在的，所以我们不需要担心我们辅助函数里的`ES6+` `API`没有被垫平；而新的配置方法则不是。

## 总结

所以，按目前情况来说，如果我们想**开发第三方库**，并且想用新的配置方法来代替旧的配置方法：

- 我们要注意，这可能会导致在旧的浏览器运行不起来的情况。因为在新的配置方法中，辅助函数可能存在`ES6+` `API`，它不会被垫平。
- 新的配置方法目前来说，适用于我们要兼容的一些比较新的目标环境

以上问题当然也有别的开发者发现了，目前这个问题已经解决了，估计后续的版本会修复。在修复以后，开发第三方库，我们就可以完完全全的用新的配置方法代替旧的配置方法了。

参考文章：
- [@babel/plugin-transform-runtime not transform Object.hasOwn correctly](https://github.com/babel/babel/issues/15572)
- [ownKeys, _objectSpread not imported from @babel/runtime helpers](https://github.com/babel/babel-polyfills/issues/128)
- [Add back moduleName option to @babel/plugin-transform-runtime](https://github.com/babel/babel/pull/15426)
- [Allow polyfill providers to specify custom @babel/runtime pkg](https://github.com/babel/babel/pull/15531)

# 总结
OK，最后我们总结一下新的配置方法：
- 如果我们开发的项目是**应用程序**，或者**大型的项目**，那我们可以这么配置：
    ```js
    // Babel配置
    const presets = [
        [
            '@babel/preset-env',
            { modules: false }
        ]
    ];
    const plugins = [
        '@babel/plugin-transform-runtime',
        [
            'babel-plugin-polyfill-corejs3',
            {
                method: "entry-global", // 或者method: "usage-global"
                version: '3.20.2',
                proposals: true
            }
        ]
    ];
    module.exports = {plugins, presets};

    // package.json
    {
        ...,
        // 设置目标环境
        "browserslist": [
            "ie 11"
        ]
    }

    // 入口文件
    // ---- useBuiltIns: 'entry'时，需要引入以下----
    // 垫平全部ES6+稳定版API
    import 'core-js/stable'; 
    // ---- 或者 -----
    // 垫平所有ES6+ API，包括提案阶段
    import 'core-js';
    ```

- 如果我们是想开发一个**第三方库**，我们可以这么配置：
    ```js
    // Babel配置
    const presets = [
        [
            '@babel/preset-env',
            { modules: false }
        ]
    ];
    const plugins = [
        '@babel/plugin-transform-runtime',
        [
            'babel-plugin-polyfill-corejs3',
            {
                method: "usage-pure",
                version: '3.20.2',
                proposals: true
            }
        ]
    ];
    module.exports = {plugins, presets};

    // package.json
    {
        ...,
        // 设置目标环境
        "browserslist": [
            "ie 11"
        ]
    }

    // 入口文件
    const Method = {
        wait(delay) {
            return new Promise(resolve => setTimeout(() => resolve(), delay);
        }
    }
    ...
    ```
    
我们可以对比一下旧的配置方法，新的配置方法更加的简洁，更加的强大。我们相当于:
- 利用`@babel/preset-env`进行`ES6+`语法编译
- 利用`@babel/plugin-transform-runtime`来优化辅助函数的引入，从而减少体积
- 利用`babel-plugin-polyfill-corejs3`来垫平`ES6+` `API`
- 我们根本不需要在`@babel/preset-env`跟`@babel/plugin-transform-runtime`这两个包切来切去；我们只需要关注`babel-plugin-polyfill-corejs3`如何配置就可以了

各个插件都做到了很好的功能配置区分，更条理了

另外：
- 如果想用新的配置方法用来**开发第三方库**，需要注意一些旧版本的浏览器可能会报错，因为它不会垫平辅助函数里面的`ES6+` `API`。所以想开发第三方库，**新的配置方法更适合用于一些比较新的浏览器**（后续这个问题会修复，就可以完全替代）
- 如果想用新的配置方法用来**开发应用项目或大型项目**，用全局方式垫平`ES6+` `API`，那么**新的配置方法完全可以直接代替旧的配置方法**
    
# 最后
文章涉及到的例子，已经上传 [Github](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Flimingcan562%2Flearn-babel-7 "https://github.com/limingcan562/learn-babel-7")，觉得有帮助的话，欢迎`Star`或者`Fork`学习（写文章真的很辛苦）。

如果读完这篇文章的你，觉得真的有帮助到，**欢迎点赞收藏**；如果有异同点，**欢迎在评论区讨论**。
