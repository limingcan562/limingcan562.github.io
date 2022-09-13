---
title: 如何让原生小程序支持less语法（最新教程）
des: 网上文章太老了，必须拒绝繁琐的wxss，用更爽快的less
createTime: 2022-9-13
---

## 前言 
大家写小程序的时候，估计**最不爽**的就是写`wxss`样式了吧。维护差，可读性差，如果`Dom`嵌套的多的话，估计写下去得疯。于是上网搜了一下怎么让原生小程序支持`less`写法，但是发现很多文章都很老了，微信自己的`IDE`已经更新了`n`个版本了，文章的步骤里面已经跟`IDE`里的不一样。于是自己摸索总结了一下，本文算是`让原生小程序支持less语法`的最新版本教程了。  

> #### 补充：本文使用的是`IDE`是：原生小程序自带的`IDE`，`vscode` 

## 下载`Easy LESS`插件  
  - 在`vscode`市场里面下载`less`编译插件——`Easy LESS`。安装的时候建议不要选择同步，不然的话，这个插件会同步到你别的电脑里的`vscode`。因为现在我们工程基本都用`webpack`等构建工具，可以直接编译`less`啥的，所以这个插件同步了没什么意义，下载它只是为了给原生小程序用。  

    图示：  
    <img src="../md/let-miniprogram-use-less/step_1.png" width="400px" />


  - 比较懒的同学，也可以直接在[百度云](https://pan.baidu.com/s/1s4wnhUxHeuPV_dAiNWnfYA?pwd=7777m)下，提取码: `7777`。这样的话，没有用`vscode`的同学，也可以直接下载插件安装。

## 开始配置（这里跟网上的教程不一样了）
  1.安装插件  

  图示：  
  <img src="../md/let-miniprogram-use-less/step_2.png" width="400px" />  
  
  - #### 选择“导入已安装的`vscode`扩展”方式（不建议）  
    这个方式不太建议。因为这种方式，会将你`vscode`里面**安装过的**插件，都装到原生小程序`IDE`里面。但是有很多插件，实际上在原生小程序`IDE`里是用不到也用不了的，比如：`Live Server`、`Vetur`、`open in browser`等。个人喜欢`IDE`里能不装的东西，绝对不装。
  - #### 选择“从已解包的扩展文件夹安装”方式（建议）  
    这个方式强烈建议。算是一种按需载入，需要什么就加什么，很符合“编程思想”。  
    如果是在`vscode`上面下载的，则找到`vscode`里面插件的路径：  
    - `windows`路径：`C:\Users\Administrator\.vscode\extensions`   
    - `Mac`路径：`User/（你的用户名）/.vscode/extensions`（打开`Finder`，转到`Macintosh HD`文件夹（从左栏中的设备访问），按住`Cmd + Shift + . `所有隐藏文件都将变为可见）  

  2.配置插件相关的配置信息  
  `ctr + p`，输入`>setting.json`，选择打开`首选项：打开设置（json）`，拉到最下面，加入配置：  
  ````javascript
  "less.compile": {
      "outExt": ".wxss"
  },
  ````  

  如果成功配置的话，上面那几行代码是会高亮的，如果没有高亮，说明没有配置成功

## 验证
  上面的步骤都完成了以后，重启一下`IDE`，输入新建一个`less`文件测试一下，如果`ctr + s`可以输出一个`.wxss`的文件，则说明所有配置成功了，以下为成功示例：  

  <img src="../md/let-miniprogram-use-less/step_3.png" width="400px" />  

  `PS`：在所有步骤完成后，有时可能会出现`ctr + s` 不能输出`.wxss`文件的情况，这时可以更新小程序自带的`IDE`试试。

## 完美`Ending`
  其实完成以上步骤，基本就可以了。但是为了更完美一点，我们还需要再加多一个忽略上传文件的配置。  
  发布体验小程序的时候，大家都知道包是有大小限制的，所以当我们的页面越多，`.less`文件也会越多，这多多少少会增加我们进入小程序时耗得时间。所以我们在发布预览小程序的时候，要忽略掉`.less`文件的上传（测试好像实际不会上传`.less`，但为了保险起见，还是加上忽略配置）。打开根目录的`project.config.json`文件，加入以下配置：  
  ````javascript
  "packOptions": {
      "ignore": [
      {
          "value": ".less",
          "type": "suffix"
      },
  },
  ````  
  关于`project.config.json`文件相关介绍，大家可以去[官方文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/projectconfig.html#%E4%B8%80%E7%BA%A7%E5%AD%97%E6%AE%B5)详细看看