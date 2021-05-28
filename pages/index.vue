<template>
  <div class="main_container">
    <nuxt-link to="/">主页</nuxt-link>
    <nuxt-link to="/about">关于</nuxt-link>
  </div>
</template>

<script>
import md from './index.md';
console.log(md);

export default {
  async asyncData() {
    // const md =  await import('./index.md');
    // console.log(md);
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
