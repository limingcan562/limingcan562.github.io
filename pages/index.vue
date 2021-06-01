\<template>
  <div class="index_cotent">
    <Header />
    <main class="blog_content">
      <section
        v-for="(item, index) in previewData"
        :key="index"
      >
      <h2><nuxt-link class="click_btn" :to="'/' + item.path">{{item.title}}</nuxt-link></h2>
      <p class="des">{{item.des}}</p>
      <p class="time">{{item.createTime}}</p>
      </section>
    </main>
  </div>
</template>

<script>
import Header from '@/components/header/index.vue';
import sortByBig from '@/plugins/sortByBig';

export default {
  async asyncData() {
    const data = require.context('~/blog', true, /\.md$/);
    // console.log(data.keys(), 11);
    // console.log(data.keys());

    //   // console.log(element);
    //   app.getPathName(element)
    // });

    // 首页预览数据
    let timeArr = [];
    let previewData = data.keys().map(key => {
      // console.log(key);
      const {attributes: {title, des, createTime, path}} = data(key);
      // console.log(key);

      timeArr.push(createTime);

      return {
        title,
        des,
        createTime,
        path
      };
    });

    // return {
    //   previewData
    // }
    // 按照时间排序

    timeArr = sortByBig(timeArr);
    console.log(timeArr);
    // timeArr.map(item =>　{
    //   console.log(new Date(item));
    // })

    // console.log(timeArr);

  },

  components: {
    Header
  },

  methods: {
    // 获取引入的md名字，可用来当做路由path
    getPathName(str) {
      return str.match(/\n(\S*).md/);
    }
  },

  mounted() {
    // console.log(this.previewData);
    // const s = new Date('2021-05-31').getTime();
    // const e = new Date('2021-06-01').getTime();
    // console.log(e - s);
    // let arr = [4, 51, 2, 1];
    // console.log(getMax(arr));
  }
}
</script>

<style lang="less" scoped>
.index_cotent{
  max-width: 630px;
  margin: 0 auto;
  // background: #000;

  .blog_content{
    padding: 50px 20px 40px;
  }
}
</style>

<style lang="less">
.index_cotent{
  .blog_content{
    font-family: "Montserrat",serif;
    section{
      margin-top: 20px;
      transition: all .5s;
      z-index: 100;
      position: relative;

      &:hover{
        // transform: translate3d(1%, -2%, 0);
        // text-shadow: 2px 2px 0 #999;
      }

      &:first-child{
        margin-top: 0;
      }
      

      h2{
        font-size: 24px;
        margin-bottom: 10px;
        position: relative;

        a{
          color: #f18017;
        }
      }
      .des{
        font-size: 12px;
        color: #fff;
        background: rgba(255, 55, 28, .7);
        display: inline-block;
        padding: 5px 8px;
      }
      .time{
        // color: #be4848;
        padding-top: 5px;
        font-size: 14px;
        text-align: right;
        display: none;
      }
    }
  }
}
</style>