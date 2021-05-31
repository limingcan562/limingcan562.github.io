<template>
  <div class="main_cotent">
    <Header />
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
