<template>
    <div class="posts_content">
        <PostsHeader />
        <main>
            <div class="md_content markdown-body"
                v-html="posts.html"
            >
            </div>
        </main>
    </div>
</template>

<script>
import PostsHeader from '@/components/header/PostsHeader.vue';
import prism from 'prismjs';
import 'prismjs/themes/prism-solarizedlight.css';
import 'github-markdown-css';

export default {
    components: {
        PostsHeader
    },

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
                }
            ]
        }
    },

    mounted() {

        prism.highlightAll();
    }
}
</script>

<style lang="less" scoped>
.posts_content{
    padding: 0 20px;
    max-width: 630px;
    margin: 0 auto;
}
main{
    padding: 40px 0 40px;
    font-family: "Montserrat",serif;
}
</style>

