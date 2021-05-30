<template>
  <div class="main_container">
    <Header />
    <!-- <nuxt-link to="/">主页</nuxt-link>
    <nuxt-link to="/about">关于</nuxt-link> -->
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

  }
}
</script>

<style>
