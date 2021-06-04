<template>
<header>
    <div class="t">
        <h1>
            <nuxt-link to="/"><img src="~/assets/img/leaves.png" width="30">Posts</nuxt-link>
        </h1>
        <nav>
            <nuxt-link to="/">主页</nuxt-link>
            <nuxt-link class="about_btn" to="/about">关于</nuxt-link>
        </nav>
    </div>
</header>
</template>

<script>
import {gsap}  from 'gsap';
import TextPlugin from 'gsap/TextPlugin';
gsap.registerPlugin(TextPlugin);


export default {
    data() {
        return {
            startDesText: 'Success',
            desText: 'Work hard + Lucky ? Success : Nothing'
        }
    },
}
</script>

<style lang="less" scoped>
header{
    padding: 35px 0 0;
    

    .t{
        display: flex;
        justify-content: space-between;
        align-items: center;

        h1{
            font-size: 22px;

            a{
                color: #f54747;
                display: flex;
                align-items: center;

                img{
                    margin-right: 5px;
                }
            }
        }

        nav{
            .about_btn{
                margin-left: 12px;
            }

            a{
                color: #666;
                font-size: 13px;
                font-weight: 500;
            }
        }   
    }
}
</style>
