<template>
<!-- <transition name="fade"> -->
    <div class="loading_content"
        v-if="loading"
        ref="loading"
    >
        <div class="main">
            loading...
        </div>
    </div>
<!-- </transition> -->
</template>

<script>

export default {
    data() {
        return {
            loading: false
        }
    },
    methods: {
        start() {
            this.loading = true;
        },
        finish() {
            this.loading = false;
        }
    }
}
</script>

<style lang="less" scoped>
.loading_content{
    width: 100%;
    height: 100%;
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;

    display: flex;
    align-items: center;
    justify-content: center;

    // color: #fff;
}
.fade-enter, .fade-leave-to {
	opacity: 0
}
.fade-leave, .fade-enter-to {
	opacity: 1
}
.fade-enter-active, .fade-leave-active {
	transition: all .3s linear;
}
</style>

