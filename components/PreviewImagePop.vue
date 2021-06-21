<template>
<transition name="fadeIn"
    @after-leave="afterLeave"
>
    <section class="preview_content" v-show="showPreviewPop"></section>
</transition>
</template>

<script>
import {mapMutations, mapState} from 'vuex';
export default {
    computed: {
        ...mapState([
            'showPreviewPop'
        ])
    },

    methods: {
        ...mapMutations([
            'resetValueEvt'
        ]),
        afterLeave() {
            // console.log(1);
            this.resetValueEvt({key: 'canScroll', value: 0});
        }
    }
}
</script>

<style lang="less" scoped>
.preview_content{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background: rgba(0, 0, 0, .75);
}
</style>