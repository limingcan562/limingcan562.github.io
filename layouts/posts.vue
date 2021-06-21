<template>
    <div class="posts_content"
        @mousewheel="controlScrollEvt"
        @touchmove="controlScrollEvt"
    >
        <PostsHeader />
        <Nuxt />
        <Footer />
        <!-- <PreviewImagePop /> -->
    </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex';

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

    computed: {
        ...mapState([
            'canScroll'
        ])
    },

    methods: {
        controlScrollEvt(e) {
            !this.canScroll && e.preventDefault();
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
</style>
