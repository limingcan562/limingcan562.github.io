<template>
    <main>
        <div class="preview_tip_content">
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
                    hid: 'keywornd',
                    name: 'keywornd',
                    content: this.posts.des
                },
            ]
        }
    },


    computed: {
        ...mapState([
            'canScroll'
        ])
    },

    methods: {
        ...mapMutations([
            'resetValueEvt'
        ]),
        isMobile() {
            let flag = false;
			if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
                flag = true;
				
			}else {
                flag = false;
			}
            return flag;
		},
    },


    mounted() {
        if (!this.isMobile()) return;

        document.querySelector('#markdown-body').addEventListener('mousedown', evt => {
            // console.log(evt);
            const {target: {src}} = evt;
            // console.log(src);

            // 图片对象
            if (src) {
                this.resetValueEvt({key: 'previewPicSrc', value: src});
                this.resetValueEvt({key: 'showPreviewPop', value: 1});
                this.resetValueEvt({key: 'canScroll', value: 0});
                
            }
        });
    }
}
</script>

<style lang="less" scoped>
main{
    padding: 40px 0 40px;

    .preview_tip_content{
        position: fixed;
        right: 20px;
        top: 0;
        font-size: 12px;
        text-align: center;
        // padding: 0 20px 20px;
        // background: #fff;
        color: #fff;

        .line{
            width: 1px;
            height: 40px;
            background: #f18017;
            margin: 0 auto;
            box-shadow: 2px 2px 10px #ccc;
        }

        .line2{
            height: 10px;
        }

        .text_contnet{
            background: #f18017;
            padding: 10px;
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

</style>

