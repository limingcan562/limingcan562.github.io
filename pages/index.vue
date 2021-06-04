\<template>
  <div class="index_cotent">
    <Header />
    <main class="blog_content">
      <section
        v-for="(item, index) in previewData"
        :key="index"
      >
      <h2><nuxt-link class="click_btn" :to="item.path">{{item.title}}</nuxt-link></h2>
      <p class="des">📃 {{item.des}}</p>
      <p class="time">⏰ {{item.englishTime}}</p>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script>
import Header from '@/components/header/index.vue';
import Footer from '@/components/footer/index.vue';
import getMdName from '@/plugins/getMdName';

export default {
  transition: 'fadeIn',
  async asyncData({getEnglishMonth}) {
    // console.log(getEnglishMonth);
    const data = require.context('~/blog', true, /\.md$/);

    // 首页预览数据
    let previewData = data.keys().map(src => {
      // console.log(src);
      // 获取文件名字
      const filName = `/posts/${getMdName(src)}`;
      const {attributes: {createTime, title, des}} = data(src);

      const 
      year = createTime.split('-')[0],
      month = getEnglishMonth(createTime.split('-')[1]),
      day = createTime.split('-')[2],
      englishTime = `${month} ${day} ${year}`;

      return {
        title,
        des,
        createTime,
        englishTime,
        path: filName
      };
    });

    // 按照时间排序
    previewData.sort((obj1, obj2) => new Date(obj2.createTime) - new Date(obj1.createTime));
    
    return {
      previewData
    };
  },

  components: {
    Header,
    Footer
  },
}
</script>

<style lang="less" scoped>
.index_cotent{
  padding: 0 20px;
  max-width: 630px;
  margin: 0 auto;

  .blog_content{
    padding: 35px 0 40px;
    min-height: 60vh;
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
        position: relative;

        a{
          color: #f18017;
        }
      }
      .des{
        font-size: 14px;
        // color: #fff;
        // padding: 5px 8px;
        // background: rgba(255, 55, 28, .7);
        color: #333;
        display: inline-block;
        margin-top: 8px;
      }
      .time{
        // color: #be4848;
        font-family: Merriweather,Georgia,serif;
        padding-top: 5px;
        font-size: 12px;
        // text-align: right;
        // display: none;
      }
    }
  }
}
</style>