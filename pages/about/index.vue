<template>
    <div class="about_content">
        <Header />

        <main>
            关于我
        </main>
    </div>
</template>

<script>
import Header from '@/components/header/index.vue';

export default {
    async asyncData() {
    // const md =  await import('./index.md');
    // console.log(md);
    },

    components: {
        Header
    }
}
</script>

<style>
main{
    width: 630px;
    padding: 40px 20px 0;
    margin: 0 auto;
}
</style>
