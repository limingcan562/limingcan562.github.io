---
title: 如何使用nuxtJs在github.io搭建自己博客
des: 让你DIY专属于自己的博客
createTime: 2021-6-2
---


# 如何使用`nuxtJs`在`github.io`搭建自己博客
> 可以使用`nuxtJS``DIY`一个专属自己的博客，利用 `markdown` 来记录博客

## 概述  
1. 设置 `github` 上的个人主页
2. 在本地构建项目
3. 部署踩坑


> ### 设置 `github` 上的个人主页
1. 新建一个项目
登录以后，点击主页的 `New` 按钮
![](../md/create-blog-github/step_1.png)

2. 设置未来 `github.io` 主页的链接
![](../md/create-blog-github/step_2.png)

    **注意：**
    - `Repository name` 请填写前面的 `Owner` 名字 + `.github.io`
    - 如图示，`Repository name` 就应该写 `limingcan562.github.io` 这样后面可以直接用 `limingcan562.github.io` 打开你的个人主页


3. 完成以后回到主页你会发现仓库多了一个叫 `limingcan562.github.io` 的仓库（请取你自己的名字），进入以后点击 `Settings`
![](../md/create-blog-github/step_3.png)

4. 修改个人主页映射对应的仓库分支
![](../md/create-blog-github/step_4.png)

    **注意：**
    - 我是将打包好的文件推送到仓库的`gh-pages`分支，所以需要把个人主页映射到`gh-pages`分支，这样当你打开个人主页是，其实看到的是编译好的`gh-pages`分支内容
    - 推送 `gh-pages` 也是个坑，后续会讲

1. OK，目前我们`github`部分就完成了


> ### 在本地构建项目  
这个就不过多的赘述了，因为我的博客是用`nuxtJs`做的，所以直接上官网看看文档，直接搞个`demo`项目下来，这里主要介绍下我用到的插件文档
- [`nuxtJs`](https://www.nuxtjs.cn/)
- [`frontmatter-markdown-loader`](https://www.npmjs.com/package/)用来编译`md`的`loader`
- [`github-markdown-css`](https://www.npmjs.com/package/github-markdown-css) 美化编译后的`md`
- [`prismjs`](https://www.npmjs.com/package/prismjs) 用来高亮`md`
- [`gh-pages`](https://www.npmjs.com/package/gh-pages) 用来发布打包文件到`github`的`gh-pages`分支

> ### 部署踩坑  
1. `gh-pages`一直推不上`github`，等了好久以后报错问题！
2. 代码推到`gh-pages` 分支后，为什么不能预览，资源`404`！
3. 使用`gh-pages`推送分支时，老是报错！


- #### `gh-pages`一直推不上`github`，等了好久以后报错问题！  
这个问题真的快把我弄死，疯狂查阅资料，各种试，最后终于找出了问题！  
大家用`github`的时候真的不要用`hhtps`的方式，一定要用`ssh`的方式！重要事情说三遍：**`ssh`的方式**，**`ssh`的方式**，**`ssh`的方式**！  
具体的配置在`deploy.js`里，大家可以参考  

_另外用`souretree`的同学，记得连接`github`的方式也用`ssh`的，这样就不会存在拉不下来，或者推不上去的问题_

- #### 代码推到`gh-pages` 分支后，为什么不能预览，资源`404`！
首先，我们使用`gh-pages`提交代码到`gh-pages`分支时，我们会看到，里面的文件都有，但是就是没有`.nojekyll`，**没有`.nojekyll`** 是最根本的原因，默认`gh-pages`是不会把点文件推上去的
因为如果`github`上没有这个文件，是会忽略掉其他`_`开头的文件的，因此即使`github`上有`_nuxt`文件，一样会找不到资源，因为它会被略了，具体可以参考[这篇文章](https://www.cnblogs.com/babywhale/p/13560573.html)  
所以我们需要在`deploy.js`文件里改一下配置：
````javascript
ghpages.publish('./dist', {
    branch: 'gh-pages',
    repo: '你的仓库ssh地址',
    dotfiles: true,  // 很重要！！
    message: 'deploy'
}, err => {});
````  
重点是把`dotfiles: true`，这样`.nojekyll`才能推上去

- #### 使用`gh-pages`推送分支时，老是报错！
有时我们可能使用`gh-pages`推送分支，或者把远程`gh-pages`删除在推送，或者做了什么乱七八糟的操作以后，发现经常报错，类似：
````javascript
{"code":128,"message":"fatal: couldn't find remote ref refs/heads/gh-pages\n","name":"ProcessError"}
````
就会十分的崩溃  
在查阅了很多资料以后发现还是有解决方案的：
在项目下的终端运行：`node node_modules/gh-pages/bin/gh-pages-clean`；然后再推送，你会发现问题迎刃而解！可以参考[这篇文章](https://www.bountysource.com/teams/gh-pages/issues)
