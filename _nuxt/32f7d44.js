(window.webpackJsonp=window.webpackJsonp||[]).push([[7,3,4],{203:function(t,e,n){"use strict";n.r(e);n(44);var o=n(211),r=n(212);o.a.registerPlugin(r.a);var d={data:function(){return{startDesText:"Success",desText:"Work hard + Lucky ? Success : Nothing"}},mounted:function(){var t=this;this.des_Ani=o.a.timeline({delay:1,defaults:{duration:3.5,ease:"none"},onComplete:function(){setTimeout((function(){return t.des_Ani.reverse()}),2e3)},onReverseComplete:function(){setTimeout((function(){return t.des_Ani.restart()}),2e3)}}).to("#header_des",{text:this.desText})}},l=(n(207),n(35)),component=Object(l.a)(d,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("header",[o("div",{staticClass:"t"},[o("h1",[o("nuxt-link",{attrs:{to:"/"}},[o("img",{attrs:{src:n(156),width:"30"}}),t._v("lMC`s Blog")])],1),t._v(" "),o("nav",[o("nuxt-link",{attrs:{to:"/"}},[t._v("主页")]),t._v(" "),o("nuxt-link",{staticClass:"about_btn",attrs:{to:"/about"}},[t._v("关于")])],1)]),t._v(" "),o("p",{staticClass:"header_des",attrs:{id:"header_des"}},[t._v(t._s(t.startDesText))])])}),[],!1,null,"97d2db92",null);e.default=component.exports;installComponents(component,{Header:n(203).default})},204:function(t,e,n){var content=n(208);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(59).default)("49e591a5",content,!0,{sourceMap:!1})},205:function(t,e,n){"use strict";n.r(e);var o={data:function(){return{navData:[{txt:"home",path:"/"},{txt:"about",path:"/about"}]}},mounted:function(){}},r=(n(209),n(35)),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("footer",[n("nav",[n("ul",t._l(t.navData,(function(e,o){return n("li",{key:o},[n("nuxt-link",{attrs:{to:e.path}},[t._v(t._s(e.txt))])],1)})),0)]),t._v(" "),n("p",{staticClass:"des"},[t._v("written by 🍁lMC")])])}),[],!1,null,"093dfaa2",null);e.default=component.exports;installComponents(component,{Footer:n(205).default})},206:function(t,e,n){var content=n(210);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(59).default)("2495a960",content,!0,{sourceMap:!1})},207:function(t,e,n){"use strict";n(204)},208:function(t,e,n){var o=n(58)(!1);o.push([t.i,"header[data-v-97d2db92]{padding:35px 0 0}header .t[data-v-97d2db92]{display:flex;justify-content:space-between;align-items:center}header .t h1[data-v-97d2db92]{font-size:28px;font-family:sans-serif}header .t h1 a[data-v-97d2db92]{color:#555;display:flex;align-items:center}header .t h1 a img[data-v-97d2db92]{margin-right:5px}header .t nav .about_btn[data-v-97d2db92]{margin-left:8px}header .t nav a[data-v-97d2db92]{color:#666;font-size:13px;font-weight:500}header .header_des[data-v-97d2db92]{padding:5px 8px;margin-top:8px;font-size:15px;color:#d02322;display:inline-block;font-family:Rockwell,sans-serif;letter-spacing:1px}",""]),t.exports=o},209:function(t,e,n){"use strict";n(206)},210:function(t,e,n){var o=n(58)(!1);o.push([t.i,'footer[data-v-093dfaa2]{padding:30px 0 35px;font-size:13px;color:#666;font-family:Merriweather,Georgia,serif}footer nav[data-v-093dfaa2]{padding-bottom:10px}footer ul[data-v-093dfaa2]{display:flex;align-items:center}footer li[data-v-093dfaa2]:first-child:before{display:none}footer li[data-v-093dfaa2]:before{content:"";display:inline-block;margin:0 8px;width:5px;height:5px;border-top:1px solid #666;border-right:1px solid #666;transform:rotate(45deg)}footer a[data-v-093dfaa2]{text-decoration:underline;color:#444}footer .des[data-v-093dfaa2]{font-size:12px;transform:scale(.88);transform-origin:0 center}',""]),t.exports=o},224:function(t,e,n){var content=n(241);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(59).default)("43d760d3",content,!0,{sourceMap:!1})},225:function(t,e,n){var content=n(243);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(59).default)("6c5e5914",content,!0,{sourceMap:!1})},240:function(t,e,n){"use strict";n(224)},241:function(t,e,n){var o=n(58)(!1);o.push([t.i,'.about_content[data-v-115845e2]{padding:0 20px;max-width:630px;margin:0 auto}main[data-v-115845e2]{padding:35px 0;font-family:"Montserrat",serif}main h3[data-v-115845e2]{font-size:20px;padding-bottom:10px;margin-top:20px;color:#f18017}main li[data-v-115845e2]{line-height:35px;font-size:14px;display:flex;align-items:center}main li[data-v-115845e2]:before{content:"";background:#000;width:5px;height:5px;display:inline-block;border-radius:50%;margin-right:10px;margin-left:20px}main .about h3[data-v-115845e2]{margin-top:0}',""]),t.exports=o},242:function(t,e,n){"use strict";n(225)},243:function(t,e,n){var o=n(58)(!1);o.push([t.i,"",""]),t.exports=o},260:function(t,e,n){"use strict";n.r(e);var header=n(203),footer=n(205),o={transition:"slide",head:function(){return{title:"lMC`s Blog | about",meta:[{hid:"description",name:"description",content:"关于李明灿的兴趣，爱好，联系方式"}]}},components:{Header:header.default,Footer:footer.default},data:function(){return{aboutData:{title:"关于我",des:["一位“不务正业”的程序员","对事物充满好奇","求知欲旺盛","没有能别说服的理由，一定会坚持自我","..."]},favoriteData:{title:"兴趣爱好",des:["💻 编程","🎬 电影","🎵 音乐","🏸 羽毛球"]},contactData:{title:"联系我",des:["📮E-mail：leemimgcan@gmail.com","🐧QQ：804666207"]}}}},r=(n(240),n(242),n(35)),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"about_content"},[n("Header"),t._v(" "),n("main",[n("section",{staticClass:"about"},[n("h3",[t._v(t._s(t.aboutData.title))]),t._v(" "),n("ul",t._l(t.aboutData.des,(function(e,o){return n("li",{key:o},[t._v(t._s(e))])})),0)]),t._v(" "),n("section",{staticClass:"favorite"},[n("h3",[t._v(t._s(t.favoriteData.title))]),t._v(" "),n("ul",t._l(t.favoriteData.des,(function(e,o){return n("li",{key:o},[t._v(t._s(e))])})),0)]),t._v(" "),n("section",{staticClass:"contact"},[n("h3",[t._v(t._s(t.contactData.title))]),t._v(" "),n("ul",t._l(t.contactData.des,(function(e,o){return n("li",{key:o},[t._v(t._s(e))])})),0)])]),t._v(" "),n("Footer")],1)}),[],!1,null,"115845e2",null);e.default=component.exports;installComponents(component,{Header:n(203).default,Footer:n(205).default})}}]);