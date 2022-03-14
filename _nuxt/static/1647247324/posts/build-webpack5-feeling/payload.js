__NUXT_JSONP__("/posts/build-webpack5-feeling", {data:[{posts:{attributes:{title:"关于Webpack5搭建的一些体会",des:"Webpack4升级Webpack5后，配置更加精简了，同时感受到看文档的重要性",createTime:"2022-2-4"},html:"\u003Ch2\u003E前言\u003C\u002Fh2\u003E\n\u003Cp\u003E在从\u003Ccode\u003EWebpack4\u003C\u002Fcode\u003E到\u003Ccode\u003EWebpack5\u003C\u002Fcode\u003E的升级过程中，即使以前已经搭建过\u003Ccode\u003EWebpack4\u003C\u002Fcode\u003E，但是搭建\u003Ccode\u003EWebpack5\u003C\u002Fcode\u003E的过程中还是有点痛苦。因为\u003Ccode\u003EWebpack\u003C\u002Fcode\u003E提供的功能方法实在是太多了，很庞大的一个体系，所以搭建完感触还是很多的，\u003Cstrong\u003E发现不能一味的从网上找，还是得看文档\u003C\u002Fstrong\u003E。\u003Cbr\u003E\n看完文档才发现原来\u003Ccode\u003EWebpack5\u003C\u002Fcode\u003E里面已经精简了很多插件了，不需要额外安装其他插件，很多以前概念比较模糊的东西，看了文档还是比较清晰的。大家有兴趣的话可以\u003Ccode\u003EFork\u003C\u002Fcode\u003E我的\u003Ca href=\"https:\u002F\u002Fgithub.com\u002Flimingcan562\u002Fwebpack5-boilerplate\"\u003E\u003Ccode\u003Ewebpack5-boilerplate\u003C\u002Fcode\u003E\u003C\u002Fa\u003E学习交流，建议大家多敲敲多试试，过程虽然有点痛苦，但是一定会有收获的。\u003Cbr\u003E\n本文讲解，需要一定\u003Ccode\u003EWebpack4\u003C\u002Fcode\u003E基础，还没有搭建过\u003Ccode\u003EWebpack4\u003C\u002Fcode\u003E的同学，可以看看这篇\u003Ca href=\"https:\u002F\u002Fitxiaohao.github.io\u002Fpassages\u002Fwebpack4-learn-introduction\u002F\"\u003E\u003Ccode\u003EWebpack4搭建\u003C\u002Fcode\u003E\u003C\u002Fa\u003E\u003Cbr\u003E\n下面的讲解，都基于\u003Ca href=\"https:\u002F\u002Fgithub.com\u002Flimingcan562\u002Fwebpack5-boilerplate\"\u003E\u003Ccode\u003Ewebpack5-boilerplate\u003C\u002Fcode\u003E\u003C\u002Fa\u003E这个项目。\u003C\u002Fp\u003E\n\u003Ch2\u003E\u003Ccode\u003EWebpack\u003C\u002Fcode\u003E大体框架\u003C\u002Fh2\u003E\n\u003Cp\u003E首先我们对\u003Ccode\u003EWebpack\u003C\u002Fcode\u003E得有一个大体的框架认识\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-javascript\"\u003E\u002F\u002F webpack.config.js\nmodule.exports = {\n    \u002F\u002F 入口\n    entry: {},\n\n    \u002F\u002F 打包输出\n    output: {},\n\n    \u002F\u002F 配置模块如何解析\n    resolve: {},\n\n    \u002F\u002F 配置各种loader\n    moudle: {},\n\n    \u002F\u002F 配置插件\n    plugins: [],\n\n    \u002F\u002F 优化（可以进行代码分割）\n    optimization: {},\n\n    \u002F\u002F webpack-dev-server 开发时的配置，一般用于development模式\n    devServer: {}\n};\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch2\u003E所需要的\u003Ccode\u003ELoader\u003C\u002Fcode\u003E\u003C\u002Fh2\u003E\n\u003Ch3\u003E\u003Ccode\u003ECSS\u003C\u002Fcode\u003E类的\u003Ccode\u003ELoader\u003C\u002Fcode\u003E\u003C\u002Fh3\u003E\n\u003Cul\u003E\n\u003Cli\u003E\u003Ccode\u003Ecss-loader\u003C\u002Fcode\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ccode\u003Ecss-minimizer-webpack-plugin\u003C\u002Fcode\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ccode\u003Emini-css-extract-plugin\u003C\u002Fcode\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ccode\u003Eless-loader\u003C\u002Fcode\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ccode\u003Eless\u003C\u002Fcode\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ccode\u003Estyle-loader\u003C\u002Fcode\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E...\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cp\u003E目前我暂时用到的就这些\u003C\u002Fp\u003E\n\u003Ch3\u003E解析\u003Ccode\u003EES6\u003C\u002Fcode\u003E类的\u003Ccode\u003ELoader\u003C\u002Fcode\u003E\u003C\u002Fh3\u003E\n\u003Cul\u003E\n\u003Cli\u003E\u003Ccode\u003E@babel\u002Fcore\u003C\u002Fcode\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ccode\u003E@babel\u002Fplugin-transform-runtime\u003C\u002Fcode\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ccode\u003E@babel\u002Fpreset-env\u003C\u002Fcode\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ccode\u003Ebabel-loader\u003C\u002Fcode\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ccode\u003Ecore-js\u003C\u002Fcode\u003E\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Ch3\u003E解析\u003Ccode\u003EHtml\u003C\u002Fcode\u003E类的\u003Ccode\u003ELoader\u003C\u002Fcode\u003E\u003C\u002Fh3\u003E\n\u003Cul\u003E\n\u003Cli\u003E\u003Ccode\u003Ehtml-webpack-plugin\u003C\u002Fcode\u003E\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Ch3\u003E\u003Ccode\u003EWebpack5\u003C\u002Fcode\u003E不需要用到的依赖\u003C\u002Fh3\u003E\n\u003Cul\u003E\n\u003Cli\u003E\u003Cs\u003E\u003Ccode\u003Eurl-loader\u003C\u002Fcode\u003E\u003C\u002Fs\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Cs\u003E\u003Ccode\u003Efile-loader\u003C\u002Fcode\u003E\u003C\u002Fs\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Cs\u003E\u003Ccode\u003Eclean-webpack-plugin\u003C\u002Fcode\u003E\u003C\u002Fs\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Cs\u003E\u003Ccode\u003E@babel\u002Fpolyfill\u003C\u002Fcode\u003E\u003C\u002Fs\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Cs\u003E\u003Ccode\u003E@babel\u002Fruntime\u003C\u002Fcode\u003E\u003C\u002Fs\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Cs\u003E\u003Ccode\u003Eoptimize-css-assets-webpack-plugin\u003C\u002Fcode\u003E\u003C\u002Fs\u003E\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Ch3\u003E最后依赖列表预览\u003C\u002Fh3\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-json\"\u003E&quot;devDependencies&quot;: {\n    &quot;@babel\u002Fcore&quot;: &quot;^7.16.12&quot;,\n    &quot;@babel\u002Fplugin-transform-runtime&quot;: &quot;^7.16.10&quot;,\n    &quot;@babel\u002Fpreset-env&quot;: &quot;^7.16.11&quot;,\n    &quot;babel-loader&quot;: &quot;^8.2.3&quot;,\n    &quot;css-loader&quot;: &quot;^6.5.1&quot;,\n    &quot;css-minimizer-webpack-plugin&quot;: &quot;^3.4.1&quot;,\n    &quot;filemanager-webpack-plugin&quot;: &quot;^6.1.7&quot;,\n    &quot;html-webpack-plugin&quot;: &quot;^5.5.0&quot;,\n    &quot;less&quot;: &quot;^4.1.2&quot;,\n    &quot;less-loader&quot;: &quot;^10.2.0&quot;,\n    &quot;mini-css-extract-plugin&quot;: &quot;^2.5.3&quot;,\n    &quot;style-loader&quot;: &quot;^3.3.1&quot;,\n    &quot;webpack&quot;: &quot;^5.67.0&quot;,\n    &quot;webpack-cli&quot;: &quot;^4.9.2&quot;,\n    &quot;webpack-dev-server&quot;: &quot;^4.7.3&quot;,\n    &quot;webpack-merge&quot;: &quot;^5.8.0&quot;\n},\n&quot;dependencies&quot;: {\n    &quot;core-js&quot;: &quot;^3.20.3&quot;\n},\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cblockquote\u003E\n\u003Cp\u003E\u003Ca href=\"https:\u002F\u002Fgithub.com\u002Flimingcan562\u002Fwebpack5-boilerplate\"\u003E\u003Ccode\u003Ewebpack5-boilerplate\u003C\u002Fcode\u003E\u003C\u002Fa\u003E这个脚手架，核心的就这些依赖，另外需要的依赖再自己装就好了。是不是觉得依赖少了很多，我是顿时觉得很舒服。接下来讲一下这些不需要用到的插件，如何在\u003Ccode\u003EWebpack5\u003C\u002Fcode\u003E里面用别的方式替代。\u003C\u002Fp\u003E\n\u003C\u002Fblockquote\u003E\n\u003Ch2\u003E使用\u003Ccode\u003EAsset Module\u003C\u002Fcode\u003E模块，来管理资源\u003C\u002Fh2\u003E\n\u003Cblockquote\u003E\n\u003Cp\u003E官方解释：资源模块(\u003Ccode\u003Easset module\u003C\u002Fcode\u003E)是一种模块类型，它允许使用资源文件（字体，图标等）而无需配置额外 loader。\u003C\u002Fp\u003E\n\u003C\u002Fblockquote\u003E\n\u003Cp\u003E以编译图片为例，所以如果我们要编译图片：\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-javascript\"\u003Econst \nmaxSize = 10 * 1024,\noutImageFileName = 'img\u002F',\nproResFileName = 'assets\u002F';\n\n\u002F**\n * @maxSize 如果图片小于10Kb，会被转为base64\n * @outImageFileName 要导出到哪个文件夹，如果写在filename配置里面，则会导出到这个文件夹上\n * @proResFileName outputPath指的也是把该资源存放到proResFileName文件夹下\n *\u002F\nmodule: {\n    rules: [\n        {\n            test: \u002F\\.(png|svg|jpg|jpeg|gif)$\u002Fi,\n            type: 'asset',\n            \u002F\u002F 设置图片导出大小，如果小于预设的值，则会被转化成base64\n            parser: {\n                dataUrlCondition: {\n                    maxSize\n                }\n            },\n\n            \u002F\u002F 设置导出的路径为 img\n            generator: {\n                filename: `${outImageFileName}[name]-[hash:2][ext][query]`,\n                outputPath: proResFileName\n            }\n        },\n    ]\n}\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E参考文章：\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E\u003Ca href=\"https:\u002F\u002Fwebpack.docschina.org\u002Fguides\u002Fasset-modules\u002F\"\u003E\u003Ccode\u003EWebpack\u003C\u002Fcode\u003E资源模块\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ca href=\"https:\u002F\u002Fwebpack.docschina.org\u002Fconfiguration\u002Fmodule\u002F\"\u003E模块\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Ch2\u003E使用\u003Ccode\u003Eoutput\u003C\u002Fcode\u003E里面配置，在生成文件之前清空\u003Ccode\u003Eoutput\u003C\u002Fcode\u003E目录的内容\u003C\u002Fh2\u003E\n\u003Cp\u003E这样我们就可以不需要安装\u003Ccode\u003Eclean-webpack-plugin\u003C\u002Fcode\u003E这个插件了\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-javascript\"\u003Eoutput: {\n    clean: true\n};\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E参考文章：\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E\u003Ca href=\"https:\u002F\u002Fwebpack.docschina.org\u002Fconfiguration\u002Foutput\u002F#outputclean\"\u003E\u003Ccode\u003Eoutput.clean\u003C\u002Fcode\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Ch2\u003E使用\u003Ccode\u003Emini-css-extract-plugin\u003C\u002Fcode\u003E插件来压缩\u003Ccode\u003Ecss\u003C\u002Fcode\u003E代码\u003C\u002Fh2\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-javascript\"\u003E\u002F\u002F Webpack5压缩配置\noptimization: {\n    minimizer: [\n        \u002F\u002F 压缩css\n        new CssMinimizerPlugin(),\n\n        \u002F\u002F '...' 来访问默认值。（不加的话，js不会压缩）\n        '...'\n    ],\n},\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-javascript\"\u003E\u002F\u002F Webpack4压缩配置\nconst OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');\n\nplugins: [\n    \u002F\u002F 压缩css\n    new OptimizeCssAssetsPlugin({\n        assetNameRegExp: \u002F\\.css$\u002Fg,\n        cssProcessor: require('cssnano'), \u002F\u002F用于优化\\最小化 CSS 的 CSS 处理器，默认为 cssnano\n        cssProcessorOptions: { safe: true, discardComments: { removeAll: true } }, \u002F\u002F传递给 cssProcessor 的选项，默认为{}\n        canPrint: true \u002F\u002F布尔值，指示插件是否可以将消息打印到控制台，默认为 true\n    }),\n]\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E\u003Ccode\u003EWebpack5\u003C\u002Fcode\u003E压缩\u003Ccode\u003Ecss\u003C\u002Fcode\u003E的配置对比起\u003Ccode\u003EWebpack4\u003C\u002Fcode\u003E的更加简单。\u003C\u002Fp\u003E\n\u003Cp\u003E参考文章：\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E\u003Ca href=\"https:\u002F\u002Fwebpack.docschina.org\u002Fplugins\u002Fcss-minimizer-webpack-plugin\u002F\"\u003E\u003Ccode\u003ECssMinimizerWebpackPlugin\u003C\u002Fcode\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Ch2\u003E\u003Ccode\u003EBabel\u003C\u002Fcode\u003E依赖配置\u003C\u002Fh2\u003E\n\u003Cul\u003E\n\u003Cli\u003E\u003Ccode\u003E@babel\u002Fpolyfill\u003C\u002Fcode\u003E在\u003Ccode\u003EBabel 7.4.0\u003C\u002Fcode\u003E就被弃用了。所以不用在安装\u003Ccode\u003E@babel\u002Fpolyfill\u003C\u002Fcode\u003E这个插件了\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ccode\u003EBabel\u003C\u002Fcode\u003E是一个个人觉得蛮复杂的体系，大家可以好好阅读下面这几篇文章，读多几遍好好理解一下\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cp\u003E参考文章：\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E\u003Ca href=\"https:\u002F\u002Fbabeljs.io\u002Fdocs\u002Fen\u002F\"\u003E\u003Ccode\u003EBabel\u003C\u002Fcode\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ca href=\"https:\u002F\u002Fitxiaohao.github.io\u002Fpassages\u002Fwebpack4-Babel7\u002F\"\u003E\u003Ccode\u003EWebpack4\u003C\u002Fcode\u003E搭建\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ca href=\"https:\u002F\u002Fblog.csdn.net\u002Fqq_15601471\u002Farticle\u002Fdetails\u002F99690530\"\u003Ebabel在\u003Ccode\u003Ewebpack\u003C\u002Fcode\u003E中使用和配置\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Ch2\u003E关于\u003Ccode\u003EdevServer\u003C\u002Fcode\u003E配置的理解\u003C\u002Fh2\u003E\n\u003Cp\u003E我想大家最懵圈的应该就是\u003Ccode\u003EdevServer.static\u003C\u002Fcode\u003E（\u003Ccode\u003EWebpack5\u003C\u002Fcode\u003E是\u003Ccode\u003Estatic\u003C\u002Fcode\u003E，\u003Ccode\u003EWebpack4\u003C\u002Fcode\u003E是\u003Ccode\u003EcontentBase\u003C\u002Fcode\u003E）这个配置了吧。是不是一直觉得，如果把里面的路径配置指向了我们打包出来的文件夹名字（\u003Ccode\u003Edist\u003C\u002Fcode\u003E），然后开启了\u003Ccode\u003Ewebpack-dev-server\u003C\u002Fcode\u003E服务器，就是访问的我们打包的那个资源（\u003Ccode\u003Edist\u003C\u002Fcode\u003E），其实并不是。这里大家可以自己建一个最简单的\u003Ccode\u003Edemo\u003C\u002Fcode\u003E，然后配置改成下面这样：\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-javascript\"\u003Eoutput: {\n    path: path.resolve(__dirname, `build`),\n},\ndevServer: {\n    static: {\n        directory: path.resolve(__dirname, `outDir`),\n    },\n}\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E此时打包出来的文件夹是\u003Ccode\u003Ebuild\u003C\u002Fcode\u003E，但是我们开启服务器访问的时候，访问是\u003Ccode\u003EoutDir\u003C\u002Fcode\u003E文件夹，结果页面显示的还是我们的开发的\u003Ccode\u003Eindex.html\u003C\u002Fcode\u003E的内容，这就说明\u003Ccode\u003EdevServer.static\u003C\u002Fcode\u003E的配置，根本就不是控制开启了\u003Ccode\u003Ewebpack-dev-server\u003C\u002Fcode\u003E服务器后访问的文件目录。这是经过本人测试，分析后的个人理解。\u003C\u002Fp\u003E\n\u003Cblockquote\u003E\n\u003Cp\u003E\u003Ccode\u003EdevServer.static\u003C\u002Fcode\u003E，实际上指的是：\u003Cstrong\u003E一个存放，不经过\u003Ccode\u003EWebpack\u003C\u002Fcode\u003E编译的静态资源目录，他是一个目录\u003C\u002Fstrong\u003E。它的功能就很像是\u003Ccode\u003Evue-cli\u003C\u002Fcode\u003E里面的\u003Ccode\u003Epublic\u003C\u002Fcode\u003E文件夹，我们开发的时候，可以通过\u003Ccode\u003E.\u002F\u003C\u002Fcode\u003E或者\u003Ccode\u003E..\u002F\u003C\u002Fcode\u003E访问到那个资源（具体看目录关系）。\u003C\u002Fp\u003E\n\u003C\u002Fblockquote\u003E\n\u003Ch3\u003E怎么访问到\u003Ccode\u003EdevServer.static.directory\u003C\u002Fcode\u003E里面的文件\u003C\u002Fh3\u003E\n\u003Cp\u003E首先，我们先清楚这几点：\u003C\u002Fp\u003E\n\u003Col\u003E\n\u003Cli\u003E开启\u003Ccode\u003Ewebpack-dev-server\u003C\u002Fcode\u003E服务器时，以\u003Ca href=\"https:\u002F\u002Fgithub.com\u002Flimingcan562\u002Fwebpack5-boilerplate\"\u003E\u003Ccode\u003Ewebpack5-boilerplate\u003C\u002Fcode\u003E\u003C\u002Fa\u003E为例，我们的代码会根据我们的配置，在内存中生成一个打包文件，保存在内存中的打包文件目录结构：\u003Cpre\u003E\u003Ccode\u003E(http:\u002F\u002Flocalhost:8080\u002F)\n├── js\n├── img\n├── font\n├── media\n├── favicon.ico\n├── index.html\n└── share.html\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003C\u002Fli\u003E\n\u003Cli\u003E开启\u003Ccode\u003Ewebpack-dev-server\u003C\u002Fcode\u003E服务器时，\u003Ccode\u003EdevServer.static.directory\u003C\u002Fcode\u003E里面的文件会直接被映射到根目录下\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ccode\u003EdevServer.static.directory\u003C\u002Fcode\u003E，默认指向的是\u003Ccode\u003Epublic\u003C\u002Fcode\u003E文件夹。\u003C\u002Fli\u003E\n\u003C\u002Fol\u003E\n\u003Cp\u003EOK，我们在根目录下新建一个\u003Ccode\u003Epublic\u003C\u002Fcode\u003E的文件夹，里面放一个\u003Ccode\u003Etest.txt\u003C\u002Fcode\u003E文件。开启\u003Ccode\u003Ewebpack-dev-server\u003C\u002Fcode\u003E，打开\u003Ccode\u003Ehttp:\u002F\u002Flocalhost:8080\u002Ftest.txt\u003C\u002Fcode\u003E，我们就可以访问到这个不经打包的静态资源了。此时保存在内存中的文件目录结构就变成了：\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode\u003E(http:\u002F\u002Flocalhost:8080\u002F)\n├── js\n├── img\n├── font\n├── media\n├── favicon.ico\n├── test.txt （直接被映射到根目录下）\n├── index.html\n└── share.html\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E所以想要访问\u003Ccode\u003EdevServer.static.directory\u003C\u002Fcode\u003E的内容就是：\u003Ccode\u003Ehttp:\u002F\u002Flocalhost:8080\u002F（文件名字）\u003C\u002Fcode\u003E。\u003C\u002Fp\u003E\n\u003Cblockquote\u003E\n\u003Cp\u003E注意：\n如果在\u003Ccode\u003Epublic\u003C\u002Fcode\u003E里面新建一个\u003Ccode\u003Eindex.html\u003C\u002Fcode\u003E，访问\u003Ccode\u003Ehttp:\u002F\u002Flocalhost:8080\u002Findex.html\u003C\u002Fcode\u003E或者\u003Ccode\u003Ehttp:\u002F\u002Flocalhost:8080\u002F\u003C\u002Fcode\u003E时，内容是我们的开发的\u003Ccode\u003Eindex.html\u003C\u002Fcode\u003E模板，这是因为我们的配置把编译后的\u003Ccode\u003Eindex.html\u003C\u002Fcode\u003E输出在\u003Ccode\u003Edist\u003C\u002Fcode\u003E文件夹根目录了，此时覆盖掉了\u003Ccode\u003Epublic\u002Findex.html\u003C\u002Fcode\u003E(可以在插件\u003Ccode\u003EHtmlWebpackPlugin\u003C\u002Fcode\u003E，把输的\u003Ccode\u003Efilename\u003C\u002Fcode\u003E，设置为\u003Ccode\u003Efilename: index2.html\u003C\u002Fcode\u003E，在\u003Ccode\u003Epublic\u003C\u002Fcode\u003E下新建一个\u003Ccode\u003Eindex.html\u003C\u002Fcode\u003E，此时访问\u003Ccode\u003Ehttp:\u002F\u002Flocalhost:8080\u002F\u003C\u002Fcode\u003E就是\u003Ccode\u003Epublic\u003C\u002Fcode\u003E里面的\u003Ccode\u003Eindex.html\u003C\u002Fcode\u003E)\u003Cbr\u003E\n所以我们在\u003Ccode\u003Epublic\u003C\u002Fcode\u003E文件夹里面，要避免与被编译的文件同名，否则会被覆盖掉。\u003C\u002Fp\u003E\n\u003C\u002Fblockquote\u003E\n\u003Ch2\u003E关于\u003Ccode\u003EdevServer.devMiddleware.publicPath\u003C\u002Fcode\u003E配置说明\u003C\u002Fh2\u003E\n\u003Cp\u003E\u003Ccode\u003EdevServer.devMiddleware.publicPath\u003C\u002Fcode\u003E对应的是\u003Ccode\u003EWebpack4\u003C\u002Fcode\u003E里面的\u003Ccode\u003EdevServer.publicPath\u003C\u002Fcode\u003E，以下简称\u003Ccode\u003EpublicPath\u003C\u002Fcode\u003E。\u003Cbr\u003E\n在没有配置\u003Ccode\u003EpublicPath\u003C\u002Fcode\u003E的时候，我们开启\u003Ccode\u003Ewebpack-dev-server\u003C\u002Fcode\u003E，访问\u003Ccode\u003Ehttp:\u002F\u002Flocalhost:8080\u002F\u003C\u002Fcode\u003E得到的是覆盖掉\u003Ccode\u003Epublic\u002Findex.html\u003C\u002Fcode\u003E的编译后的模板\u003Ccode\u003Eindex.html\u003C\u002Fcode\u003E。因为\u003Ccode\u003EpublicPath\u003C\u002Fcode\u003E默认值是：\u003Ccode\u003E''\u003C\u002Fcode\u003E指向根目录，所以我们访问\u003Ccode\u003Ehttp:\u002F\u002Flocalhost:8080\u002F\u003C\u002Fcode\u003E就是根目录，不用在后面加路径。\u003Cbr\u003E\n但是如果我们想类似以下访问我们的开发页面：\u003Ccode\u003Ehttp:\u002F\u002Flocalhost:8080\u002Ftest\u002F\u003C\u002Fcode\u003E，我们只要将配置设置成：\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-javascript\"\u003Eoutput: {\n    publicPath: '\u002Ftest\u002F',\n},\ndevServer: {\n    \u002F**\n     * 表示打包生成的静态文件所在的位置，意思是url访问的路径\n     * 改变dist访问的路径，outpath需要跟他一致，启动访问的url为http:\u002F\u002Flocalhost:8080\u002Ftest\u002Findex.html\n     *\u002F\n    devMiddleware: {\n        publicPath: '\u002Ftest\u002F',\n    },\n}\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E此时我们访问的开发页面的路径就是：\u003Ccode\u003Ehttp:\u002F\u002Flocalhost:8080\u002Ftest\u002F\u003C\u002Fcode\u003E\u003C\u002Fp\u003E\n\u003Cblockquote\u003E\n\u003Cp\u003E注意：\u003Ccode\u003Eoutput.publicPath\u003C\u002Fcode\u003E与\u003Ccode\u003EdevServer.devMiddleware.publicPath\u003C\u002Fcode\u003E要始终保持一致，不然会有问题\u003C\u002Fp\u003E\n\u003C\u002Fblockquote\u003E\n"}}],fetch:{},mutations:[]});