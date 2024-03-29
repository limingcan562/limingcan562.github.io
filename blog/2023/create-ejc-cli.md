---
title: 为了把工作“推”给别人，减少沟通成本，提高工作效率，我开发了这样一个工具
des: 作为开发者，一些能不做的事尽量让别人帮你去做。我们应该把更多的时间留给自己，让自己更专注开发，想办法让工作变得更加简单。
createTime: 2023-3-29
---

## 背景
事情是这样的：  
公司一直很想重构官网，所以有一大堆信息，例如案例信息、`SEO`信息、产品信息、人物信息等。本来是想做个后台管理来管理这些信息，方便后期运营的同事自己去增删改查。结果不出所料，又出现了职场领导最爱的三问——“开发需要多久？”、“什么时候能开发完？”、“大概什么时候上线？”。

这潜台词不就是要快点搞出来吗？行，跟组里其他人商量完了以后，后台管理先不弄了，这样也省去了后台接口开发跟管理系统搭建的时间，反正也是一些静态数据，直接放前端就行了。

实现的思路也很简单：把页面中的一些静态数据，专门模块化抽离了出来，数据都建了相关的`json`，用`json`来管理对接人员提供的数据。到了对应的页面，再按需加载对应的`json`，渲染出对应的页面数据。如果有什么修改，直接改`json`就好了。  
这乍一看，好像确实没什么毛病。但是随着开发的深入，使用`json`管理数据这种方式，问题也慢慢暴露出来。

## 现实问题
### 问题一
**繁琐的修改，导致工作效率下降**

我们开发时，如果遇到的是让人很无语的客户或者领导（就是那种，一个设计能改几十稿，文案能改几百遍的那种），我们肯定会崩溃。相信大家应该也被这种**地狱反馈**折磨过吧：“领导不喜欢这个文案，要换”，“客户说这块信息不要了”，“这里有个错别字，要改一下”，“客户说这里要新加一条类别信息”...  
本来代码写的挺有思路的，结果因为这些琐事被打断，**效率分分钟大打折扣**。

### 问题二
**沟通成本的增加**

职场有各种各样的人，有习惯好的，有习惯差的。相信你应该也遇过这种类型的对接人，对领导或客户的修改意见不是直接截图，就是没有汇总，直接把修改意见一条条**碎片式**直接发群里。 

但我们在专注开发的时候，忙起来信息基本是没什么时间看的，有一些修改意见我们也会错过。所以得回头一条条查记录，遇到不理解的修改意见，又得再问一次对方确认一下，遇到脾气不好的，可能还会被问烦暴怒。**这无疑又增加了许多没有必要的沟通成本**。

### 问题三
**无法更方便友好的管理数据**
- 如果需要数据的页面或模块多了，会导致对应的`json`文件也增多。文件多了，数据太过碎片化，管理那么多文件也变得麻烦
- 数据量很大的时候，，数据会变得很冗长，想直接找到特定的某条数据，是很困难的
- 遇到数据非常多的页面或模块，想修改某个文案，即使用了关键字检索，但是如果有相同关键字的数据，检索了也得一个个翻，修改十分麻烦

## 分析问题
我相信上述问题，大家在平时工作中多多少少是有遇到过吧？所以项目上线后，我自己也分析总结了一下，发现这些问题，在我们很多项目中其实是非常常见的。

个人觉得，数据毕竟是对接人员给我们的，所以像上述的问题一、问题二这种无意义繁琐的修改，增加的无效沟通成本，应该在对接人员那个阶段就要过滤掉才对；作为开发人员的我们，最主要的职责应该是**专注开发**，跟**接收最后确认版本的数据**，而不是把时间浪费在那些没有意义的沟通跟修改上。  

**在企业中，我们经常用`Office`等办公文件，输出各种文档，以此方便部门与部门，或者是不同人员之间沟通同步信息**。  

于是一个想法闯入我的脑海，既然是办公软件，又是统计数据，那`Excel`这个办公软件似乎是个非常好的选择。我又查找了一下资料，强大的`nodeJS`，还能将我们的`Excel`转成`json`，看来遇到的问题迎刃而解。

## 解决问题
通过上述分析，我们可以得出以下解决方案：  

我们可以将所有数据集成在一个`Excel`文件中，这样对接人员可以通过这个文件，可以先很好的去收集客户或者领导给的数据，然后如果领导或者客户有什么修改，就可以直接在这个`Excel`直接修改。最后等一切确认完毕，对接人员再将这个`Excel`文件发回给我们，我们再导出`json`数据就可以了。

某种程度来说，我们相当于把修改这个工作前置，“推”给了对接人员。并且在这个过程中，我们不但可以很好的专注我们的开发，只用关注最后发回来的这个`Excel`，我们还为那些习惯不好的对接人员，养成了信息汇总，输出文档的好习惯。这很好的解决了问题一，问题二。

同时，基于`Excel`的功能，还有在`Excel`里面，每一个表（`sheet`）可以当做我们某个页面或某个模块的数据，因此上述问题三也得到了有效解决。

所以，我们最后解决上述的问题，就大致变成了以下步骤：
1. 需要一个`Excel`文件，它的作用是用来收集，修改，统计数据
2. 将这个`Excel`文件先给对接人员，让他们去对接数据的提供者，然后整理修改这些数据，导出最终确认版本的数据
3. 通过步骤二，我们拿到这个最终的`Excel`文件，再把它转成我们所需要的`json`。这样`Excel`跟`json` 的版本永远相同，只要保证`Excel`版本最新，我们的`json`也是最新的，降低了数据有误的风险
4. 后期模块或者页面有数据更新，我们更新只需要修改`Excel`，导出`json`，然后替换掉线上的`json`文件，不需要重新部署代码（**这点在开发小程序的时候，尤其重要**）

> 后面对接的小哥专门感谢了下我，因为他之前是用`Word`做的文档，实在是太乱了，我就帮忙做了一个`Excel`（也不复杂）。因为`Excel`比起`Word`，收集修改数据确实方便很多，发给领导或客户看的时候，也比较一目了然。  
> 老板应该给我加薪 :-)

---

另外，`Excel`功能全面，所以用它来管理数据还有以下好处：
- 更方便的操作。`Excel`是专业的办公软件，在`Excel`中对数据进行增删改查，当然要比在我们的编辑器内修改要方便太多
- 更可视化。每一个表（`sheet`）可以当做我们某个页面或某个模块的数据；每个表（`sheet`）的名字，就是我们`json`的名字；表里每一行数据，就是我们`json`每一条的数据
- 更方便的管理。数据都集成在一个`Excel`文件中，更加方便我们管理所有模块或页面的数据
- 更适合传播。本着我为人人，人人为我的精神，`json`不适合在非开发人员中传播，但是`Excel`适用于所有人员。不但对接人员可以对这个`Excel`进行修改，如果你发现`Excel`里面有问题，你也一样可以修改，然后再同步给对接人员。

有了这些好处，所以我们使用`Excel`来管理我们的数据，不仅能解决上述问题，**平时我们开发中，如果数据结构不复杂，我们一样也能用`Excel`来管理我们自己开发时候的数据。**

## 工具诞生
因此，基于上述的分析跟解决问题的思路，再结合`Excel`这个办公软件本身的优势，于是我将这两者结合在一起，开发了这个终端小工具——[`ejc-cli`](https://github.com/limingcan562/ejc-cli)

> `github`地址：[https://github.com/limingcan562/ejc-cli](https://github.com/limingcan562/ejc-cli)  
> - **如果真的觉得好用或者有帮助到，感谢大家狠狠的给一个`star`**。大家的认可，是我继续分享创作的动力之一
> - 也欢迎大家`fork`交流学习  
> - 有问题或者有什么想加的功能，也可以提`issue`给我，让我更好的完善它

上述的分析跟解决问题的思路，都离不开要拿来收集，修改，管理数据的`Excel`这个文件，于是我大致研究了大部分收集数据的`Excel`是怎么做的。发现这类`Excel`表格结构基本都差不多，都是一行标题，然后下面跟着一条条数据。

所以，为了让大家更方便的使用，[`ejc-cli`](https://github.com/limingcan562/ejc-cli)**里面已经内置了一个`Excel`模板，你不需要再自己制作一个`Excel`了**，你只需要执行：  
````npm
ejc-cli gt
````
或者将模板文件保存到指定目录：
````npm
ejc-cli gt './xlsx_template/'
````
这样你就能获取到一个名为`template.xlsx`的`Excel`模板文件。  

大家获取到这个模板文件后，把对应的一些信息改成自己的，然后根据上面解决问题的几个步骤：

- 先发给对接人员去收集，整理，修改数据
- 拿到最终版本的`Excel`文件（或者用来管理自己开发时的数据）
- 使用`ejc-cli`的命令行，导出我们最后要的`json`数据

`ejc-cli`导出`json`最简易的命令行：
````npm
ejc-cli -i './xlsx_template/template.xlsx'
````

**关于[`ejc-cli`](https://github.com/limingcan562/ejc-cli)更多的用法，大家可以去这里查阅：[使用说明](https://github.com/limingcan562/ejc-cli/blob/main/READEME_zh-CN.md)**

## 效果展示

模板`Excel`文件：

![template_excel.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8afb9628da154895b448c6d20e538bf9~tplv-k3u1fbpfcp-watermark.image?)

使用效果：

![preview.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/93398bf5601f459db5dc4a76d985892d~tplv-k3u1fbpfcp-watermark.image?)

输出`json`数据：

![effects.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ffd0ce7d399b457dabf5834b22cc884e~tplv-k3u1fbpfcp-watermark.image?)

## 最后
写这篇文章主要还是想表达，虽然平时我们“复制粘贴”很舒服，但是我觉得，作为开发者的我们，更应该充当一个创造者，代码就像是我们的原材料。我们既然拥有了原材料，那就应该创造一些工具，**尽可能让工具来帮我们做一些重复的事情，或者让工具把我们的工作、生活变得更加简单**  

就像为什么我想开发[`ejc-cli`](https://github.com/limingcan562/ejc-cli)这个工具，因为上面说的问题，其实在很多项目中都有遇到，而且不止一次，并且分析过后，我觉得是有办法把那些不必浪费掉的时间节约回来的。那我们为什么不利用我们的特长（编程），把我们的想法变成现实呢？

最后的最后，创作不易呀，对于[`ejc-cli`](https://github.com/limingcan562/ejc-cli)：
- **如果真的觉得好用或者有帮助到，感谢大家狠狠的给一个`star`**。大家的认可，是我继续分享创作的动力之一
- 也欢迎大家`fork`交流学习  
- 有问题或者有什么想加的功能，也可以提`issue`给我，让我更好的完善它


