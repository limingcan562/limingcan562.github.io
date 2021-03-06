const path = require('path');
const tool = require('./tool/index');

export default {
  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'lMC`s Blog',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1,user-scalable=no' },
      { name: 'keywords', content: '李明灿的博客, lMC`s Blog'},
      { hid: 'description', name: 'description', content: '李明灿的博客，用来记录李明灿平时项目的一些总结，复盘' },
      { name: 'author', content: '804666207@qq.com'},
      { name: 'renderer', content: 'webkit'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: './lMC.ico' }
    ]
  },

  watch: [
    '~/blog/*.md'
  ],

  generate: {
    subFolders: false,
    fallback: true
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/less/global.less',
    '~/assets/less/routerAni.less'
  ],

  plugins: [
    '~/plugins/getEnglishMonth.js',
    '~/plugins/getMdName.js',
    {src: '~/plugins/hammer.js', ssr: false},
  ],
  
  layoutTransition: 'slide',
  
  server: {
    port: tool.devPort, // default: 3000
    host: tool.getIpAddress()
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    transpile: [
      'gsap',
      'prismjs'
    ],
    /*
    ** You can extend webpack config here
    */
    extend (config) {
      config.module.rules.push({
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader',
        include: path.resolve(__dirname, 'blog'),
        options: {}
      })
    }
  },
}
