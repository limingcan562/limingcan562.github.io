<template>
    <div class="posts_content">
        <PostsHeader />
        <Nuxt />
        <Footer />
    </div>
</template>

<script>
import PostsHeader from '@/components/header/PostsHeader.vue';
import Footer from '@/components/footer/index.vue';
import prism from 'prismjs';

import 'prismjs/themes/prism.css';
import '@/assets/less/github-markdown.less';
import '@/assets/less/markdown.less';

export default {
    components: {
        PostsHeader,
        Footer
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
</style>
