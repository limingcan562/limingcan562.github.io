<template>
<header>
    <div class="t">
        <h1>
            <nuxt-link to="/"><Icon :width="30" /> lMC`s Blog</nuxt-link>
        </h1>
        <nav>
            <nuxt-link to="/">主页</nuxt-link>
            <nuxt-link class="about_btn" to="/about">关于</nuxt-link>
        </nav>
    </div>
    <p class="header_des" id="header_des">{{startDesText}}</p>
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

    mounted() {
        const 
        delay = 2,
        duration = 3.5;

        this.des_Ani = gsap.timeline({
            delay: delay - 1,
            defaults: {
                duration,
                ease: 'none'
            },
            onComplete: () => {
                setTimeout(() => this.des_Ani.reverse(), delay * 1000);
            },
            onReverseComplete: () => {
                setTimeout(() => this.des_Ani.restart(), delay * 1000);
            }
        })
        .to('#header_des', {text: this.desText});
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
            font-size: 28px;
            font-family: sans-serif;

            a{
                color: #555;
                display: flex;
                align-items: center;

                img{
                    margin-right: 5px;
                }
            }
        }

        nav{
            .about_btn{
                margin-left: 8px;
            }

            a{
                color: #666;
                font-size: 13px;
                font-weight: 500;
            }
        }   
    }

    .header_des{
        padding: 5px 8px;
        margin-top: 8px;
        font-size: 15px;
        // color: rgb(255, 73, 73, .7);
        color: #d02322;
        display: inline-block;
        font-family: Rockwell, sans-serif;
        letter-spacing: 1px;
    }
}
</style>
