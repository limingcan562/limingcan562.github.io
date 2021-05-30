<template>
<header>
    <div class="l">
        <h1>
            <nuxt-link to="/">🍁lMC`s Blog</nuxt-link>
            <p class="des">work hard + lucky ? success : null</p>
        </h1>
    </div>
    <div class="r">
        <nuxt-link to="/">主页</nuxt-link>
        <nuxt-link class="about_btn" to="/about">关于</nuxt-link>
    </div>
</header>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
header{
    max-width: 630px;
    margin: 0 auto;
    // border-bottom: 1px solid rgb(238, 238, 238);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40px 20px 0;

    a{
        color: #000;
    }

    .l{
        h1{
            font-size: 28px;
            color: #666;
        }

        .des{
            padding: 5px 8px;
            margin-top: 5px;
            font-size: 18px;
            background: rgba(0, 0, 0, .2);
        }
    }

    .r{
        .about_btn{
            margin-left: 12px;
        }

        a{
            color: #666;
            font-size: 14px;
            font-weight: 500;
        }
    }
}
</style>
