<template>
    <main>
        <div 
            :class="['preview_tip_content', {init: init}, {bounceAni: bounceAni && !bounceOut}, {bounceOut: bounceOut}]" 
            v-if="!viewClickTip"
            @mousedown="closeEvt"
        >
            <div class="line"></div>
            <div class="text_contnet">
                <p class="tip">点击图片可以预览喔</p>
            </div>
            <div class="line line2"></div>
            <p class="btn">知道了</p>
            
        </div>
        <article 
            class="md_content markdown-body"
            id="markdown-body"
            v-html="posts.html"
        >
        </article>
    </main>
</template>

<script>
import {mapMutations, mapState} from 'vuex';
export default {
    layout: 'posts',
    async asyncData({params}) {
        // console.log(params);
        const allData = await require.context('~/blog', true, /\.md$/);
        // console.log(allData.keys());
        // const mdData = allData.keys()[params];
        let posts;
        allData.keys().forEach(item => {
            // console.log(allData(item));
            if (item.includes(params.id)) {
                posts = allData(item);
                return;
            }
        });
        
        return {
            posts
        }
        // console.log(data);
    },

    head() {
        return {
            title:'lMC`s Blog | posts',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.posts.title
                },
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: this.posts.des
                },
            ]
        }
    },

    data() {
        return {
            init: 1,
            bounceAni: 0,
            bounceOut: 0,
            isMobile: 0,
        };
    },

    created() {
        if (process.client) this.isMobile = this.isMobileEvt();
    },

    computed: {
        ...mapState([
            'canScroll',
            'viewClickTip'
        ])
    },

    methods: {
        ...mapMutations([
            'resetValueEvt'
        ]),
        isMobileEvt() {
            let flag = false;
			if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
                flag = true;
				
			}else {
                flag = false;
			}
            return flag;
		},
        closeEvt() {
            this.init = 0;
            this.bounceOut = 1;
            setTimeout(() => {
                this.resetValueEvt({key: 'viewClickTip', value: 1});
            }, 1000);
        }
    },


    mounted() {
        // if (!this.isMobileEvt()) return;

        this.bounceAni = 1;
        document.querySelector('#markdown-body').addEventListener('click', evt => {
            const {target: {src}} = evt;
            // 图片对象
            if (src) {
                this.resetValueEvt({key: 'previewPicSrc', value: src});
                this.resetValueEvt({key: 'showPreviewPop', value: 1});
                this.resetValueEvt({key: 'canScroll', value: 0});
            }
        });
    }
}

// 定义一个父类
function Animal(name, sex) {
  this.name = name;
  this.sex = sex;
  this.like = ['eat', 'drink', 'sleep'];
}

// 定义一个子类
function Cat(name, sex, age) {
  // 第一次调用Animal构造函数
  Animal.call(this, name, sex);
  this.age = age;
}

// 定义一个利用原型式继承方式，跟寄生式继承思想来实现继承
function inheritObj(parentClass, childClass) {
  const finalProperty = Object.create(parentClass.prototype);

  finalProperty.constructor = childClass;

  childClass.prototype = finalProperty;
}

// 为父类的原型添加一个run方法
Animal.prototype.run = function() {
  console.log('跑步');
}

// 实现寄生组合继承
inheritObj(Animal, Cat);

// 给子类的原型添加一个方法
Cat.prototype.catwalk = function() {
  console.log('走猫步');
}

// 实例一个由子类new 出来的对象
const cat = new Cat('limingcan', 'man', 27);


setTimeout(() => {
    console.log(cat);
}, 1000);

</script>

<style lang="less" scoped>
main{
    padding: 40px 0 40px;

    .preview_tip_content{
        position: fixed;
        right: 20px;
        top: -30px;
        font-size: 12px;
        text-align: center;
        color: #fff;
        cursor: pointer;

        &.init{
            opacity: 0;
            -webkit-transform: translate3d(0, -3000px, 0) scaleY(3);
            transform: translate3d(0, -3000px, 0) scaleY(3);
        }
        
        .line{
            width: 1px;
            height: 60px;
            background: #f18017;
            margin: 0 auto;
            box-shadow: 2px 2px 10px #ccc;
        }

        .line2{
            height: 10px;
        }

        .text_contnet{
            background: #f18017;
            padding: 8px;
            box-shadow: 2px 2px 10px #ccc;
        }

        .btn{
            padding-top: 5px;
            background: #f18017;
            padding: 5px;
            box-shadow: 2px 2px 10px #ccc;
            width: 50%;
            margin: 0 auto;
        }
    }
}
@keyframes bounceIn {
    0%,
    60%,
    75%,
    90%,
    to {
        -webkit-animation-timing-function: cubic-bezier(.215, .61, .355, 1);
        animation-timing-function: cubic-bezier(.215, .61, .355, 1)
    }

    0% {
        opacity: 0;
        -webkit-transform: translate3d(0, -3000px, 0) scaleY(3);
        transform: translate3d(0, -3000px, 0) scaleY(3)
    }

    60% {
        opacity: 1;
        -webkit-transform: translate3d(0, 25px, 0) scaleY(.9);
        transform: translate3d(0, 25px, 0) scaleY(.9)
    }

    75% {
        -webkit-transform: translate3d(0, -10px, 0) scaleY(.95);
        transform: translate3d(0, -10px, 0) scaleY(.95)
    }

    90% {
        -webkit-transform: translate3d(0, 5px, 0) scaleY(.985);
        transform: translate3d(0, 5px, 0) scaleY(.985)
    }

    to {
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        opacity: 1;
    }
}
.bounceAni{
    animation: bounceIn 1s forwards;
}

@keyframes bounceOut {
    20% {
        -webkit-transform: translate3d(0, -10px, 0) scaleY(.985);
        transform: translate3d(0, -10px, 0) scaleY(.985)
    }

    40%,
    45% {
        opacity: 1;
        -webkit-transform: translate3d(0, 20px, 0) scaleY(.9);
        transform: translate3d(0, 20px, 0) scaleY(.9)
    }

    to {
        opacity: 0;
        -webkit-transform: translate3d(0, -2000px, 0) scaleY(3);
        transform: translate3d(0, -2000px, 0) scaleY(3)
    }
}
.bounceOut{
    animation: bounceOut 1s forwards;
}


</style>

