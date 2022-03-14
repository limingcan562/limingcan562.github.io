(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{238:function(o,e,c){var map={"./2021/create-blog-github.md":244,"./2021/webpack-pack-path.md":245,"./2022/about-prototype.md":246,"./2022/build-webpack5-feeling.md":247};function n(o){var e=d(o);return c(e)}function d(o){if(!c.o(map,o)){var e=new Error("Cannot find module '"+o+"'");throw e.code="MODULE_NOT_FOUND",e}return map[o]}n.keys=function(){return Object.keys(map)},n.resolve=d,o.exports=n,n.id=238},244:function(o,e){o.exports={attributes:{title:"如何使用nuxtJs在github.io搭建自己博客",des:"让你DIY专属于自己的博客",createTime:"2021-6-2"},html:'<h1>如何使用<code>nuxtJs</code>在<code>github.io</code>搭建自己博客</h1>\n<blockquote>\n<p>可以使用<code>nuxtJS</code> <code>DIY</code>一个专属自己的博客，利用 <code>markdown</code> 来记录博客</p>\n</blockquote>\n<h2>概述</h2>\n<ol>\n<li>设置 <code>github</code> 上的个人主页</li>\n<li>在本地构建项目</li>\n<li>部署踩坑</li>\n</ol>\n<blockquote>\n<h3>设置 <code>github</code> 上的个人主页</h3>\n</blockquote>\n<ol>\n<li>\n<p>新建一个项目<br>\n登录<code>github</code>以后，点击主页的 <code>New</code> 按钮新建一个代表个人主页的仓库\n<img src="../md/create-blog-github/step_1.png" alt="">\n仓库名字自取，可以取<code>姓名全拼</code> + <code>github.io</code>，博主的个人主页仓库名叫就是：<code>limingcan562.github.io</code></p>\n</li>\n<li>\n<p>完成以后回到主页你会发现仓库多了一个叫 <code>limingcan562.github.io</code> 的仓库（<em>请取你自己的名字</em>），进入以后点击 <code>Settings</code>\n<img src="../md/create-blog-github/step_3.png" alt=""></p>\n</li>\n<li>\n<p>设置未来 <code>github.io</code> 主页的链接<br>\n进入到自己刚刚建好的仓库进行配置\n<img src="../md/create-blog-github/step_2.png" alt=""></p>\n<p><strong>注意：</strong></p>\n<ul>\n<li><code>Repository name</code> 请填写前面的 <code>Owner</code> 名字 + <code>.github.io</code></li>\n<li>如图示，<code>Repository name</code> 就应该写 <code>limingcan562.github.io</code> 这样后面可以直接用 <code>limingcan562.github.io</code> 打开你的个人主页</li>\n</ul>\n</li>\n<li>\n<p>修改个人主页映射对应的仓库分支\n<img src="../md/create-blog-github/step_4.png" alt=""></p>\n<p><strong>注意：</strong></p>\n<ul>\n<li>我是将打包好的文件推送到仓库的<code>gh-pages</code>分支，所以需要把个人主页映射到<code>gh-pages</code>分支，这样当你打开个人主页是，其实看到的是编译好的<code>gh-pages</code>分支内容</li>\n<li>推送 <code>gh-pages</code> 也是个坑，后续会讲</li>\n</ul>\n</li>\n<li>\n<p>OK，目前我们<code>github</code>部分就完成了</p>\n</li>\n</ol>\n<blockquote>\n<h3>在本地构建项目</h3>\n</blockquote>\n<p>这个就不过多的赘述了，因为我的博客是用<code>nuxtJs</code>做的，所以直接上官网看看文档，直接搞个<code>demo</code>项目下来，这里主要介绍下我用到的插件文档</p>\n<ul>\n<li><a href="https://www.nuxtjs.cn/"><code>nuxtJs</code></a></li>\n<li><a href="https://www.npmjs.com/package/"><code>frontmatter-markdown-loader</code></a>用来编译<code>md</code>的<code>loader</code></li>\n<li><a href="https://www.npmjs.com/package/github-markdown-css"><code>github-markdown-css</code></a> 美化编译后的<code>md</code></li>\n<li><a href="https://www.npmjs.com/package/prismjs"><code>prismjs</code></a> 用来高亮<code>md</code></li>\n<li><a href="https://www.npmjs.com/package/gh-pages"><code>gh-pages</code></a> 用来发布打包文件到<code>github</code>的<code>gh-pages</code>分支</li>\n</ul>\n<blockquote>\n<h3>部署踩坑</h3>\n</blockquote>\n<ol>\n<li>用<code>soureceTree</code>一直推不上<code>github</code>或者拉不下代码，等了好久以后报错问题！</li>\n<li>使用<code>gh-pages</code>推送分支部署时，老是报错！</li>\n<li>代码推到<code>gh-pages</code> 分支后，为什么不能预览，资源<code>404</code>！</li>\n</ol>\n<ul>\n<li>\n<h4>用<code>soureceTree</code>一直推不上<code>github</code>或者拉不下代码，等了好久以后报错问题！</h4>\n</li>\n</ul>\n<p>不知道用<code>soureceTree</code>的同学有没有遇到过，在拉<code>github</code>代码或者推代码到<code>github</code>时，发现等了很久，结果后面发现各种各样的报错，或者一直弹出要输入github账号密码，就十分的烦躁...但后面上网各种找答案以后，终于有办法可以解决：<br>\n<strong>不要用<code>https</code>的方式连接<code>github</code>仓库，一定要用<code>ssh</code>方式连接仓库</strong></p>\n<p><code>mac</code>端跟着网上配置<code>ssh</code>到<code>github</code>的步骤走，问题不大，但是在生成<code>ssh</code>时，会提示要你输入密码，此时不要输入密码，一路回车就好了，这样后面推送代码的时候，就不会再提示输入密码。这里讲下<code>window</code>环境下怎么弄<br>\n在配置好<code>ssh</code>到<code>github</code>以后，我们会发现<code>window</code>的<code>souceTree</code>拉取代码还是有问题，这里需要设置一下：<br>\n进入<code>工具</code> --&gt; <code>选项</code>\n<img src="../md/create-blog-github/step_5.png" alt="">\n这样设置好以后，关掉<code>sourceTree</code>重新推一下就好了</p>\n<ul>\n<li>\n<h4>使用<code>gh-pages</code>推送分支部署时，老是报错！</h4>\n</li>\n</ul>\n<p>有时我们可能使用<code>gh-pages</code>推送分支，或者把远程<code>gh-pages</code>删除在推送，或者做了什么乱七八糟的操作以后，发现经常报错，类似：</p>\n<pre><code class="language-javascript">{&quot;code&quot;:128,&quot;message&quot;:&quot;fatal: couldn\'t find remote ref refs/heads/gh-pages\\n&quot;,&quot;name&quot;:&quot;ProcessError&quot;}\n</code></pre>\n<p>就会十分的崩溃，但是在查阅了很多资料以后发现还是有解决方案的：</p>\n<ol>\n<li>在项目下的终端运行：<code>node node_modules/gh-pages/bin/gh-pages-clean</code>；然后再推送，你会发现问题迎刃而解！可以参考<a href="https://www.bountysource.com/teams/gh-pages/issues">这篇文章</a></li>\n<li><strong>将<code>deploy.js</code>里面的<code>repo</code>改成<code>ssh</code>链接，就好了（这个是最重要的！）</strong></li>\n</ol>\n<ul>\n<li>\n<h4>代码推到<code>gh-pages</code> 分支后，为什么不能预览，资源<code>404</code>！</h4>\n</li>\n</ul>\n<p>首先，我们使用<code>gh-pages</code>提交代码到<code>gh-pages</code>分支时，我们会看到，里面的文件都有，但是就是没有<code>.nojekyll</code>，<strong>没有<code>.nojekyll</code></strong> 是最根本的原因，默认<code>gh-pages</code>是不会把点文件推上去的\n因为如果<code>github</code>上没有这个文件，是会忽略掉其他<code>_</code>开头的文件的，因此即使<code>github</code>上有<code>_nuxt</code>文件，一样会找不到资源，因为它会被略了，具体可以参考<a href="https://www.cnblogs.com/babywhale/p/13560573.html">这篇文章</a><br>\n所以我们需要在<code>deploy.js</code>文件里改一下配置：</p>\n<pre><code class="language-javascript">ghpages.publish(\'./dist\', {\n    branch: \'gh-pages\',\n    repo: \'你的仓库ssh地址\',\n    dotfiles: true,  // 很重要！！\n    message: \'deploy\'\n}, err =&gt; {});\n</code></pre>\n<p>重点是把<code>dotfiles: true</code>，这样<code>.nojekyll</code>才能推上去</p>\n'}},245:function(o,e){o.exports={attributes:{title:"Webpack 打包时，如何保留img文件夹里原有的文件夹",des:"保留img文件夹里面原始文件，更好管理",createTime:"2021-6-21"},html:'<h2>场景</h2>\n<p>有时我们在开发模式时，会在<code>img</code>文件里建很多的不同的文件夹，方便我们开发过程中更好的管理，就像这样：<br>\n<img src="../md/webpack-pack-path/pic_1.png" alt="">\n我们把一些场景的资源用不同的文件存放，这样在我们开发的过程中，可以更快更有效地管理我们场景的资源，尤其是在做游戏项目。<br>\n当我们项目开发完了，打包时，<code>webpack</code>内部会将我们应用的图片资源，全部打包到一文件夹中，就像下面这样：\n<img src="../md/webpack-pack-path/pic_2.png" alt="">\n但是如果遇到项目上线了，只是紧急替换图片，不需要改逻辑，又或者有些奇葩客户，说打包出来图片文件不要混在一起，要分开，这样方便他们自己修改别的版本（我就遇到过），这就很尴尬了，光是找替换的文件都要找半天，所以这时如果我们在打包的时候，保留了原本<code>img</code>里面的文件夹，那就很舒服</p>\n<h2>实现</h2>\n<p><code>webpack</code>🐂🍺的地方不需要再说啦，现在说下怎么实现在打包的时候，保留<code>img</code>文件夹里面的文件夹，其实也不是很难<br>\n<code>webpack</code>配置：</p>\n<pre><code class="language-javascript">// webpack.config.js\n{\n    test: /\\.(png|jpg|jpeg|gif)$/,\n    use: [\n        {\n            loader: \'url-loader\',\n            options: {\n                //利用[path]路径获取文件夹名称并设置文件名\n                name: \'[path]/[name].[ext]\',\n                limit: 1, \n                //过滤掉[path]的相对路径\n                context: path.resolve(__dirname, \'../dev/assets\'),\n            }\n        }\n    ]\n},\n</code></pre>\n<p>我的开发目录结构：\n<img src="../md/webpack-pack-path/pic_3.png" alt=""></p>\n<p>打包以后的目录：\n<img src="../md/webpack-pack-path/pic_4.png" alt=""></p>\n<p>这样做可以过滤掉开发目录前面的路径：</p>\n<pre><code class="language-javascript">context: path.resolve(__dirname, \'../dev/assets\')\n</code></pre>\n<p>如果为了防止缓存，还可以在打包出来的图片文件加上<code>hash</code>：</p>\n<pre><code class="language-javascript">name: \'[path]/[name]-[hash:8].[ext]\',\n</code></pre>\n'}},246:function(o,e){o.exports={attributes:{title:"最通俗易懂的原型、原型链理解",des:"__proto__、prototype、constructor到底是什么？用最通俗易懂的方法教会你",createTime:"2022-3-14"},html:'<h2>最通俗易懂的原型、原型链理解</h2>\n<h3>前言</h3>\n<p>首先原型、原型链，算是前端进阶里面必不可少，十分重要的一块了。在面试，面试官很喜欢用这一块来辨别你的底层知识掌握的怎么样；用的第三方框架，库里面，很多功能模块化了，但大部分功能都继承自一个基类，所以了解原型、原型链对我们使用第三方的框架、库也有着很大的帮助。</p>\n<h3>理解什么是<code>__proto__</code>、<code>prototype</code>、<code>constructor</code></h3>\n<p>很多人在看这一块知识的时候，刚开头看可能还能理解，看久了就懵了，那是因为代码中充斥着各种<code>x.__proto__.__proto__</code>，<code>x.__proto__.constructor.prototype</code>，<code>x.prototype.__proto__</code>，这当然会懵掉。所以我们要理解原型、原型链是什么，一定要先搞明白，<code>__proto__</code>、<code>prototype</code>、<code>constructor</code>是什么东西。<br>\n下面笔者会比较用通俗的话来解释，带着大家更好的理解原型，原型链是什么（因为为了大家更好的理解，所以有些地方可能会稍微有点不恰当，敬请见谅）。</p>\n<h4><code>__proto__</code>：</h4>\n<p>这个属性可以通俗的理解成，<strong>所有对象拥都有的属性（函数也是一种特殊的对象，所以构造函数也会有这个属性）</strong>。所以<strong>实例出来的对象，构造函数都会有<code>__proto__</code>这个属性</strong>。它最后一定<strong>指向某个构造函数的原型（<code>x.prototype</code>）</strong>。因此，当我们看到最后结尾如果是<code>.__proto__</code>，那它的返回值一定是<code>x.prototype</code>。</p>\n<blockquote>\n<p>但只有一个例外，那就是<code>Obeject.prototype.__proto__</code>，它的末端是<code>null</code>，所以我们看到<code>.__proto__</code>结尾时，一定要判断好前面是不是<code>Obeject.prototype</code></p>\n</blockquote>\n<p>因此我们可以总结<code>__proto__</code>以下特点：</p>\n<ul>\n<li>对象都拥有的属性，构造函数也有</li>\n<li>最后一定指向某个构造函数的<code>prototype</code>（<code>x.prototype</code>）</li>\n<li>只有一个例外，<code>Obeject.prototype.__proto__</code>指向的是<code>null</code></li>\n<li>构造函数的<code>__proto__</code>都直接指向<code>Function.prototype</code></li>\n</ul>\n<h4><code>prototype</code>：</h4>\n<p>这个属性可以通俗的理解成，只有构造函数才会拥有的属性，实例出来的对象，是不会有这个属性的。</p>\n<p>因此我们可以总结<code>prototype</code>以下特点：</p>\n<ul>\n<li>构造函数独有的属性</li>\n</ul>\n<h4><code>constructor</code>：</h4>\n<p>这个属性存在于两个地方</p>\n<ol>\n<li>构造函数的原型对象（<code>x.prototype</code>）</li>\n<li>构造函数本身也有（继承自<code>Function.prototype.constructor</code>）</li>\n</ol>\n<blockquote>\n<p>实例出来的对象也可以访问到<code>constructor</code>，是因为实例出来的对象<code>constructor</code>继承自构造函数的原型对象（<code>x.prototype</code>），可以用<code>hasOwnProperty(\'constructor\')</code>验证</p>\n</blockquote>\n<p>验证：</p>\n<pre><code class="language-javascript">function Person() {\n\n}\nvar lMC = new Person();\nconsole.log(lMC.constructor.name);  // Person\nconsole.log(lMC.hasOwnProperty(\'constructor\'));  // false\nconsole.log(Person.prototype.constructor.name);  // Person\nconsole.log(Person.prototype.hasOwnProperty(\'constructor\'));  // true\n</code></pre>\n<p>因此我们可以总结<code>constructor</code>以下特点：</p>\n<ul>\n<li>构造函数的原型对象（<code>x.prototype</code>）拥有的属性，指回构造函数本身</li>\n<li>构造函数本身也有，指向<code>Function</code>；</li>\n</ul>\n<h4>什么是原型链</h4>\n<p>当我们用构造函数<code>Func</code>实例化了一个对象<code>A</code>后，访问<code>A</code>的方法或者属性时，会现在<code>A</code>自身找有没有对应的方法属性，没有的话则通过<code>A.__proto__</code>去构造函数的原型对象<code>Func.prototype</code>找，如果<code>Func.prototype</code>也没有，则在往<code>Func.prototype.__proto__</code>往<code>Obeject.prototype</code>找，如果还没有则再通过<code>Obeject.prototype.__proto__</code>找，在这过程中，如果有则返回相应的方法属性，没有的话则再通过<code>Obeject.prototype.__proto__</code>找，但此时<code>Obeject.prototype.__proto__</code>已经到顶，指向的是<code>null</code>，所以此时没有对应的方法属性，返回<code>undefined</code>。<br>\n在查找的过程中会遍历以上的一条链，这条链就是原型链：</p>\n<p><img src="../md/about-prototype/pic_1.png" alt="原型链1"></p>\n<p>等同于</p>\n<p><img src="../md/about-prototype/pic_2.png" alt="原型链2"></p>\n<h3>方法总结</h3>\n<p>假定我们用<code>Func</code>表示构造函数；<code>obj</code>表示<code>Func</code>的实例对象</p>\n<ol>\n<li>\n<p>如果最后以<code>__proto__</code>结尾，返回的一定是<code>x.prototype</code>（<code>Object.prototype.__proto__</code>除外），所以我们先确定是<strong>谁的</strong><code>__proto__</code></p>\n<ul>\n<li>如果是<code>Func</code>的<code>__proto__</code>，那么直接指向<code>Function.prototype</code></li>\n<li>如果是<code>obj</code>的<code>__proto__</code>，那么直接指向其实例的构造函数的<code>prototype</code>(<code>Func.prototype</code>)</li>\n<li>如果是<code>Func.prototype</code>的<code>__proto__</code>，那么直接指向<code>Object.prototype</code>，（因为<code>Func.prototype</code>是对象，其构造函数是<code>Object</code>）</li>\n</ul>\n</li>\n<li>\n<p>如果是以<code>prototype</code>结尾，只用判断是<strong>谁的</strong><code>prototype</code>，只有构造函数才有<code>prototype</code>属性</p>\n<ul>\n<li><code>obj.prototype</code>，返回<code>undefined</code>，因为<code>obj</code>是实例，不是构造函数</li>\n<li><code>Func.prototype</code>，返回<code>Func</code>这个构造函数的<code>prototype</code>所有内容</li>\n</ul>\n</li>\n<li>\n<p>如果是以<code>constructor</code>结尾，先弄清楚前面是<strong>对象</strong>还是<strong>构造函数</strong>；</p>\n<ul>\n<li>如果是<strong>构造函数</strong>的<code>constructor</code>，则直接指向<code>Function</code>\n<ul>\n<li><code>Func.constructor</code>，直接指向<code>Function</code>，因为构造函数的构造器，当然是<code>Function</code></li>\n</ul>\n</li>\n<li>如果是<strong>对象</strong>的<code>constructor</code>：\n<ul>\n<li><code>obj.constructor</code>，直接指向<code>Func</code>，因为<code>obj</code>是由<code>Func</code>构造而来，所以当然是<code>Func</code>（<code>obj.constructor</code>实际上是继承自<code>Func.prototype.constructor</code>，<code>obj</code>本身是没有<code>constructor</code>的）</li>\n</ul>\n</li>\n<li><strong><code>构造函数.prototype.constructor</code>指回这个构造函数</strong></li>\n<li><strong><code>Func.prototype.constructor</code>，指回<code>Func</code>本身</strong></li>\n<li><strong><code>Object.prototype.constructor</code>，指回<code>Obeject</code>构造函数</strong></li>\n<li><strong><code>Obeject.constructor</code>，指向<code>Function</code></strong></li>\n</ul>\n</li>\n</ol>\n<h3>牛刀小试</h3>\n<p>根据上面对<code>__proto__</code>、<code>prototype</code>、<code>constructor</code>的特点总结，还有方法总结，我们可以拿下面这道题来试试，如果大家都可以正确无误的答出来，那大家对原型应该就了解的差不多了</p>\n<pre><code class="language-javascript">function Person(name) {\n    this.name = name\n}\nvar p2 = new Person(\'king\');\n\nconsole.log(p2.__proto__); // Person.prototype\n\nconsole.log(p2.__proto__.__proto__); // Object.prototype\n\nconsole.log(p2.__proto__.__proto__.__proto__); // null\n\nconsole.log(p2.__proto__.__proto__.__proto__.__proto__.__proto__); // 报错\n\nconsole.log(p2.constructor); // Person\n\nconsole.log(p2.prototype); // undefined\n\nconsole.log(Person.constructor); // Function\n\nconsole.log(Person.prototype); // 输出Person.prototype这个对象里所有的方法和属性\n\nconsole.log(Person.prototype.constructor); // Person\n\nconsole.log(Person.prototype.__proto__); // Obejct.prototype\n\nconsole.log(Person.__proto__); // Fuction.prototype\n\nconsole.log(Function.prototype.__proto__); // Obeject.prototype\n\nconsole.log(Function.__proto__); // Function.prototype\n\nconsole.log(Object.__proto__); // Function.prototype\n\nconsole.log(Object.prototype.__proto__); // null\n</code></pre>\n<h3>最后</h3>\n<p>原型、原型链本来就挺绕的，所以建议大家先了解<code>__proto__</code>、<code>prototype</code>之间的链接，熟悉了，再把<code>constructor</code>加上一起理解，循环渐进。等理解以后，多画几遍原型链图加深理解。OK，最后假定我们用<code>Animal</code>表示构造函数；<code>dog</code>表示<code>Animal</code>的实例对象，祭出一张原型链图：</p>\n<blockquote>\n<p><strong>红色链表示的是我们平时实例出来的对象的原型链</strong></p>\n</blockquote>\n<p><img src="../md/about-prototype/pic_3.png" alt="原型链图"></p>\n'}},247:function(o,e){o.exports={attributes:{title:"关于Webpack5搭建的一些体会",des:"Webpack4升级Webpack5后，配置更加精简了，同时感受到看文档的重要性",createTime:"2022-2-4"},html:'<h2>前言</h2>\n<p>在从<code>Webpack4</code>到<code>Webpack5</code>的升级过程中，即使以前已经搭建过<code>Webpack4</code>，但是搭建<code>Webpack5</code>的过程中还是有点痛苦。因为<code>Webpack</code>提供的功能方法实在是太多了，很庞大的一个体系，所以搭建完感触还是很多的，<strong>发现不能一味的从网上找，还是得看文档</strong>。<br>\n看完文档才发现原来<code>Webpack5</code>里面已经精简了很多插件了，不需要额外安装其他插件，很多以前概念比较模糊的东西，看了文档还是比较清晰的。大家有兴趣的话可以<code>Fork</code>我的<a href="https://github.com/limingcan562/webpack5-boilerplate"><code>webpack5-boilerplate</code></a>学习交流，建议大家多敲敲多试试，过程虽然有点痛苦，但是一定会有收获的。<br>\n本文讲解，需要一定<code>Webpack4</code>基础，还没有搭建过<code>Webpack4</code>的同学，可以看看这篇<a href="https://itxiaohao.github.io/passages/webpack4-learn-introduction/"><code>Webpack4搭建</code></a><br>\n下面的讲解，都基于<a href="https://github.com/limingcan562/webpack5-boilerplate"><code>webpack5-boilerplate</code></a>这个项目。</p>\n<h2><code>Webpack</code>大体框架</h2>\n<p>首先我们对<code>Webpack</code>得有一个大体的框架认识</p>\n<pre><code class="language-javascript">// webpack.config.js\nmodule.exports = {\n    // 入口\n    entry: {},\n\n    // 打包输出\n    output: {},\n\n    // 配置模块如何解析\n    resolve: {},\n\n    // 配置各种loader\n    moudle: {},\n\n    // 配置插件\n    plugins: [],\n\n    // 优化（可以进行代码分割）\n    optimization: {},\n\n    // webpack-dev-server 开发时的配置，一般用于development模式\n    devServer: {}\n};\n</code></pre>\n<h2>所需要的<code>Loader</code></h2>\n<h3><code>CSS</code>类的<code>Loader</code></h3>\n<ul>\n<li><code>css-loader</code></li>\n<li><code>css-minimizer-webpack-plugin</code></li>\n<li><code>mini-css-extract-plugin</code></li>\n<li><code>less-loader</code></li>\n<li><code>less</code></li>\n<li><code>style-loader</code></li>\n<li>...</li>\n</ul>\n<p>目前我暂时用到的就这些</p>\n<h3>解析<code>ES6</code>类的<code>Loader</code></h3>\n<ul>\n<li><code>@babel/core</code></li>\n<li><code>@babel/plugin-transform-runtime</code></li>\n<li><code>@babel/preset-env</code></li>\n<li><code>babel-loader</code></li>\n<li><code>core-js</code></li>\n</ul>\n<h3>解析<code>Html</code>类的<code>Loader</code></h3>\n<ul>\n<li><code>html-webpack-plugin</code></li>\n</ul>\n<h3><code>Webpack5</code>不需要用到的依赖</h3>\n<ul>\n<li><s><code>url-loader</code></s></li>\n<li><s><code>file-loader</code></s></li>\n<li><s><code>clean-webpack-plugin</code></s></li>\n<li><s><code>@babel/polyfill</code></s></li>\n<li><s><code>@babel/runtime</code></s></li>\n<li><s><code>optimize-css-assets-webpack-plugin</code></s></li>\n</ul>\n<h3>最后依赖列表预览</h3>\n<pre><code class="language-json">&quot;devDependencies&quot;: {\n    &quot;@babel/core&quot;: &quot;^7.16.12&quot;,\n    &quot;@babel/plugin-transform-runtime&quot;: &quot;^7.16.10&quot;,\n    &quot;@babel/preset-env&quot;: &quot;^7.16.11&quot;,\n    &quot;babel-loader&quot;: &quot;^8.2.3&quot;,\n    &quot;css-loader&quot;: &quot;^6.5.1&quot;,\n    &quot;css-minimizer-webpack-plugin&quot;: &quot;^3.4.1&quot;,\n    &quot;filemanager-webpack-plugin&quot;: &quot;^6.1.7&quot;,\n    &quot;html-webpack-plugin&quot;: &quot;^5.5.0&quot;,\n    &quot;less&quot;: &quot;^4.1.2&quot;,\n    &quot;less-loader&quot;: &quot;^10.2.0&quot;,\n    &quot;mini-css-extract-plugin&quot;: &quot;^2.5.3&quot;,\n    &quot;style-loader&quot;: &quot;^3.3.1&quot;,\n    &quot;webpack&quot;: &quot;^5.67.0&quot;,\n    &quot;webpack-cli&quot;: &quot;^4.9.2&quot;,\n    &quot;webpack-dev-server&quot;: &quot;^4.7.3&quot;,\n    &quot;webpack-merge&quot;: &quot;^5.8.0&quot;\n},\n&quot;dependencies&quot;: {\n    &quot;core-js&quot;: &quot;^3.20.3&quot;\n},\n</code></pre>\n<blockquote>\n<p><a href="https://github.com/limingcan562/webpack5-boilerplate"><code>webpack5-boilerplate</code></a>这个脚手架，核心的就这些依赖，另外需要的依赖再自己装就好了。是不是觉得依赖少了很多，我是顿时觉得很舒服。接下来讲一下这些不需要用到的插件，如何在<code>Webpack5</code>里面用别的方式替代。</p>\n</blockquote>\n<h2>使用<code>Asset Module</code>模块，来管理资源</h2>\n<blockquote>\n<p>官方解释：资源模块(<code>asset module</code>)是一种模块类型，它允许使用资源文件（字体，图标等）而无需配置额外 loader。</p>\n</blockquote>\n<p>以编译图片为例，所以如果我们要编译图片：</p>\n<pre><code class="language-javascript">const \nmaxSize = 10 * 1024,\noutImageFileName = \'img/\',\nproResFileName = \'assets/\';\n\n/**\n * @maxSize 如果图片小于10Kb，会被转为base64\n * @outImageFileName 要导出到哪个文件夹，如果写在filename配置里面，则会导出到这个文件夹上\n * @proResFileName outputPath指的也是把该资源存放到proResFileName文件夹下\n */\nmodule: {\n    rules: [\n        {\n            test: /\\.(png|svg|jpg|jpeg|gif)$/i,\n            type: \'asset\',\n            // 设置图片导出大小，如果小于预设的值，则会被转化成base64\n            parser: {\n                dataUrlCondition: {\n                    maxSize\n                }\n            },\n\n            // 设置导出的路径为 img\n            generator: {\n                filename: `${outImageFileName}[name]-[hash:2][ext][query]`,\n                outputPath: proResFileName\n            }\n        },\n    ]\n}\n</code></pre>\n<p>参考文章：</p>\n<ul>\n<li><a href="https://webpack.docschina.org/guides/asset-modules/"><code>Webpack</code>资源模块</a></li>\n<li><a href="https://webpack.docschina.org/configuration/module/">模块</a></li>\n</ul>\n<h2>使用<code>output</code>里面配置，在生成文件之前清空<code>output</code>目录的内容</h2>\n<p>这样我们就可以不需要安装<code>clean-webpack-plugin</code>这个插件了</p>\n<pre><code class="language-javascript">output: {\n    clean: true\n};\n</code></pre>\n<p>参考文章：</p>\n<ul>\n<li><a href="https://webpack.docschina.org/configuration/output/#outputclean"><code>output.clean</code></a></li>\n</ul>\n<h2>使用<code>mini-css-extract-plugin</code>插件来压缩<code>css</code>代码</h2>\n<pre><code class="language-javascript">// Webpack5压缩配置\noptimization: {\n    minimizer: [\n        // 压缩css\n        new CssMinimizerPlugin(),\n\n        // \'...\' 来访问默认值。（不加的话，js不会压缩）\n        \'...\'\n    ],\n},\n</code></pre>\n<pre><code class="language-javascript">// Webpack4压缩配置\nconst OptimizeCssAssetsPlugin = require(\'optimize-css-assets-webpack-plugin\');\n\nplugins: [\n    // 压缩css\n    new OptimizeCssAssetsPlugin({\n        assetNameRegExp: /\\.css$/g,\n        cssProcessor: require(\'cssnano\'), //用于优化\\最小化 CSS 的 CSS 处理器，默认为 cssnano\n        cssProcessorOptions: { safe: true, discardComments: { removeAll: true } }, //传递给 cssProcessor 的选项，默认为{}\n        canPrint: true //布尔值，指示插件是否可以将消息打印到控制台，默认为 true\n    }),\n]\n</code></pre>\n<p><code>Webpack5</code>压缩<code>css</code>的配置对比起<code>Webpack4</code>的更加简单。</p>\n<p>参考文章：</p>\n<ul>\n<li><a href="https://webpack.docschina.org/plugins/css-minimizer-webpack-plugin/"><code>CssMinimizerWebpackPlugin</code></a></li>\n</ul>\n<h2><code>Babel</code>依赖配置</h2>\n<ul>\n<li><code>@babel/polyfill</code>在<code>Babel 7.4.0</code>就被弃用了。所以不用在安装<code>@babel/polyfill</code>这个插件了</li>\n<li><code>Babel</code>是一个个人觉得蛮复杂的体系，大家可以好好阅读下面这几篇文章，读多几遍好好理解一下</li>\n</ul>\n<p>参考文章：</p>\n<ul>\n<li><a href="https://babeljs.io/docs/en/"><code>Babel</code></a></li>\n<li><a href="https://itxiaohao.github.io/passages/webpack4-Babel7/"><code>Webpack4</code>搭建</a></li>\n<li><a href="https://blog.csdn.net/qq_15601471/article/details/99690530">babel在<code>webpack</code>中使用和配置</a></li>\n</ul>\n<h2>关于<code>devServer</code>配置的理解</h2>\n<p>我想大家最懵圈的应该就是<code>devServer.static</code>（<code>Webpack5</code>是<code>static</code>，<code>Webpack4</code>是<code>contentBase</code>）这个配置了吧。是不是一直觉得，如果把里面的路径配置指向了我们打包出来的文件夹名字（<code>dist</code>），然后开启了<code>webpack-dev-server</code>服务器，就是访问的我们打包的那个资源（<code>dist</code>），其实并不是。这里大家可以自己建一个最简单的<code>demo</code>，然后配置改成下面这样：</p>\n<pre><code class="language-javascript">output: {\n    path: path.resolve(__dirname, `build`),\n},\ndevServer: {\n    static: {\n        directory: path.resolve(__dirname, `outDir`),\n    },\n}\n</code></pre>\n<p>此时打包出来的文件夹是<code>build</code>，但是我们开启服务器访问的时候，访问是<code>outDir</code>文件夹，结果页面显示的还是我们的开发的<code>index.html</code>的内容，这就说明<code>devServer.static</code>的配置，根本就不是控制开启了<code>webpack-dev-server</code>服务器后访问的文件目录。这是经过本人测试，分析后的个人理解。</p>\n<blockquote>\n<p><code>devServer.static</code>，实际上指的是：<strong>一个存放，不经过<code>Webpack</code>编译的静态资源目录，他是一个目录</strong>。它的功能就很像是<code>vue-cli</code>里面的<code>public</code>文件夹，我们开发的时候，可以通过<code>./</code>或者<code>../</code>访问到那个资源（具体看目录关系）。</p>\n</blockquote>\n<h3>怎么访问到<code>devServer.static.directory</code>里面的文件</h3>\n<p>首先，我们先清楚这几点：</p>\n<ol>\n<li>开启<code>webpack-dev-server</code>服务器时，以<a href="https://github.com/limingcan562/webpack5-boilerplate"><code>webpack5-boilerplate</code></a>为例，我们的代码会根据我们的配置，在内存中生成一个打包文件，保存在内存中的打包文件目录结构：<pre><code>(http://localhost:8080/)\n├── js\n├── img\n├── font\n├── media\n├── favicon.ico\n├── index.html\n└── share.html\n</code></pre>\n</li>\n<li>开启<code>webpack-dev-server</code>服务器时，<code>devServer.static.directory</code>里面的文件会直接被映射到根目录下</li>\n<li><code>devServer.static.directory</code>，默认指向的是<code>public</code>文件夹。</li>\n</ol>\n<p>OK，我们在根目录下新建一个<code>public</code>的文件夹，里面放一个<code>test.txt</code>文件。开启<code>webpack-dev-server</code>，打开<code>http://localhost:8080/test.txt</code>，我们就可以访问到这个不经打包的静态资源了。此时保存在内存中的文件目录结构就变成了：</p>\n<pre><code>(http://localhost:8080/)\n├── js\n├── img\n├── font\n├── media\n├── favicon.ico\n├── test.txt （直接被映射到根目录下）\n├── index.html\n└── share.html\n</code></pre>\n<p>所以想要访问<code>devServer.static.directory</code>的内容就是：<code>http://localhost:8080/（文件名字）</code>。</p>\n<blockquote>\n<p>注意：\n如果在<code>public</code>里面新建一个<code>index.html</code>，访问<code>http://localhost:8080/index.html</code>或者<code>http://localhost:8080/</code>时，内容是我们的开发的<code>index.html</code>模板，这是因为我们的配置把编译后的<code>index.html</code>输出在<code>dist</code>文件夹根目录了，此时覆盖掉了<code>public/index.html</code>(可以在插件<code>HtmlWebpackPlugin</code>，把输的<code>filename</code>，设置为<code>filename: index2.html</code>，在<code>public</code>下新建一个<code>index.html</code>，此时访问<code>http://localhost:8080/</code>就是<code>public</code>里面的<code>index.html</code>)<br>\n所以我们在<code>public</code>文件夹里面，要避免与被编译的文件同名，否则会被覆盖掉。</p>\n</blockquote>\n<h2>关于<code>devServer.devMiddleware.publicPath</code>配置说明</h2>\n<p><code>devServer.devMiddleware.publicPath</code>对应的是<code>Webpack4</code>里面的<code>devServer.publicPath</code>，以下简称<code>publicPath</code>。<br>\n在没有配置<code>publicPath</code>的时候，我们开启<code>webpack-dev-server</code>，访问<code>http://localhost:8080/</code>得到的是覆盖掉<code>public/index.html</code>的编译后的模板<code>index.html</code>。因为<code>publicPath</code>默认值是：<code>\'\'</code>指向根目录，所以我们访问<code>http://localhost:8080/</code>就是根目录，不用在后面加路径。<br>\n但是如果我们想类似以下访问我们的开发页面：<code>http://localhost:8080/test/</code>，我们只要将配置设置成：</p>\n<pre><code class="language-javascript">output: {\n    publicPath: \'/test/\',\n},\ndevServer: {\n    /**\n     * 表示打包生成的静态文件所在的位置，意思是url访问的路径\n     * 改变dist访问的路径，outpath需要跟他一致，启动访问的url为http://localhost:8080/test/index.html\n     */\n    devMiddleware: {\n        publicPath: \'/test/\',\n    },\n}\n</code></pre>\n<p>此时我们访问的开发页面的路径就是：<code>http://localhost:8080/test/</code></p>\n<blockquote>\n<p>注意：<code>output.publicPath</code>与<code>devServer.devMiddleware.publicPath</code>要始终保持一致，不然会有问题</p>\n</blockquote>\n'}}}]);