---
title: 如何使用nuxtJs在github.io搭建自己博客
des: 让你DIY专属于自己的博客
createTime: 2021-6-2
---


# 如何使用`nuxtJs`在`github.io`搭建自己博客
> 可以使用`nuxtJS` `DIY`一个专属自己的博客，利用 `markdown` 来记录博客

## 概述  
1. 设置 `github` 上的个人主页
2. 在本地构建项目
3. 部署踩坑


> ### 设置 `github` 上的个人主页
1. 新建一个项目  
登录`github`以后，点击主页的 `New` 按钮新建一个代表个人主页的仓库
![](../md/create-blog-github/step_1.png)
仓库名字自取，可以取`姓名全拼` + `github.io`，博主的个人主页仓库名叫就是：`limingcan562.github.io`

2. 完成以后回到主页你会发现仓库多了一个叫 `limingcan562.github.io` 的仓库（_请取你自己的名字_），进入以后点击 `Settings`
![](../md/create-blog-github/step_3.png)

3. 设置未来 `github.io` 主页的链接  
进入到自己刚刚建好的仓库进行配置
![](../md/create-blog-github/step_2.png)

    **注意：**
    - `Repository name` 请填写前面的 `Owner` 名字 + `.github.io`
    - 如图示，`Repository name` 就应该写 `limingcan562.github.io` 这样后面可以直接用 `limingcan562.github.io` 打开你的个人主页


4. 修改个人主页映射对应的仓库分支
![](../md/create-blog-github/step_4.png)

    **注意：**
    - 我是将打包好的文件推送到仓库的`gh-pages`分支，所以需要把个人主页映射到`gh-pages`分支，这样当你打开个人主页是，其实看到的是编译好的`gh-pages`分支内容
    - 推送 `gh-pages` 也是个坑，后续会讲

5. OK，目前我们`github`部分就完成了


> ### 在本地构建项目  
这个就不过多的赘述了，因为我的博客是用`nuxtJs`做的，所以直接上官网看看文档，直接搞个`demo`项目下来，这里主要介绍下我用到的插件文档
- [`nuxtJs`](https://www.nuxtjs.cn/)
- [`frontmatter-markdown-loader`](https://www.npmjs.com/package/)用来编译`md`的`loader`
- [`github-markdown-css`](https://www.npmjs.com/package/github-markdown-css) 美化编译后的`md`
- [`prismjs`](https://www.npmjs.com/package/prismjs) 用来高亮`md`
- [`gh-pages`](https://www.npmjs.com/package/gh-pages) 用来发布打包文件到`github`的`gh-pages`分支

> ### 部署踩坑  
1. 用`soureceTree`一直推不上`github`或者拉不下代码，等了好久以后报错问题！
2. 使用`gh-pages`推送分支部署时，老是报错！
3. 代码推到`gh-pages` 分支后，为什么不能预览，资源`404`！


- #### 用`soureceTree`一直推不上`github`或者拉不下代码，等了好久以后报错问题！ 

不知道用`soureceTree`的同学有没有遇到过，在拉`github`代码或者推代码到`github`时，发现等了很久，结果后面发现各种各样的报错，或者一直弹出要输入github账号密码，就十分的烦躁...但后面上网各种找答案以后，终于有办法可以解决：  
**不要用`https`的方式连接`github`仓库，一定要用`ssh`方式连接仓库**  


`mac`端跟着网上配置`ssh`到`github`的步骤走，问题不大，但是在生成`ssh`时，会提示要你输入密码，此时不要输入密码，一路回车就好了，这样后面推送代码的时候，就不会再提示输入密码。这里讲下`window`环境下怎么弄  
在配置好`ssh`到`github`以后，我们会发现`window`的`souceTree`拉取代码还是有问题，这里需要设置一下：  
进入`工具` --> `选项`
![](../md/create-blog-github/step_5.png)
这样设置好以后，关掉`sourceTree`重新推一下就好了

- #### 使用`gh-pages`推送分支部署时，老是报错！
有时我们可能使用`gh-pages`推送分支，或者把远程`gh-pages`删除在推送，或者做了什么乱七八糟的操作以后，发现经常报错，类似：
````javascript
{"code":128,"message":"fatal: couldn't find remote ref refs/heads/gh-pages\n","name":"ProcessError"}
````
就会十分的崩溃，但是在查阅了很多资料以后发现还是有解决方案的：
1. 在项目下的终端运行：`node node_modules/gh-pages/bin/gh-pages-clean`；然后再推送，你会发现问题迎刃而解！可以参考[这篇文章](https://www.bountysource.com/teams/gh-pages/issues)
2. **将`deploy.js`里面的`repo`改成`ssh`链接，就好了（这个是最重要的！）**

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