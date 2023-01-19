<template>
<header>
    <div class="t">
        <h1>
            <nuxt-link to="/"><Icon :width="30" /> {{headerText ? headerText : 'lMC`s Blog'}}</nuxt-link>
        </h1>
        <nav>
            <nuxt-link to="/">主页</nuxt-link>
            <nuxt-link class="about_btn" to="/about">关于</nuxt-link>
            <a target="_blank" :href="githubHomePage">
                <svg width="18" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 16 16" version="1.1"  data-view-component="true" class="octicon octicon-mark-github v-align-middle">
                    <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                </svg>
            </a>
        </nav>
    </div>
    <p class="header_des" id="header_des">{{startDesText}}</p>
</header>
</template>

<script>
import {mapState} from 'vuex';
import {gsap}  from 'gsap';
import TextPlugin from 'gsap/TextPlugin';
gsap.registerPlugin(TextPlugin);


export default {
    props: [
        'headerText'
    ],
    computed: {
        ...mapState([
            'githubHomePage'
        ])
    },
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

            a{
                // color: #555;
                color: #f54747;
                display: flex;
                align-items: center;

                img{
                    margin-right: 5px;
                }
            }
        }

        nav{
            display: flex;
            align-items: center;


            .about_btn{
                margin-left: 8px;
            }

            a{
                color: #666;
                font-size: 13px;
                font-weight: 500;
                margin-left: 8px;
                display: block;

                &:first-child{
                    margin-left: 0;
                }
            }
        }   
    }

    .header_des{
        padding: 5px 8px 0;
        margin-top: 8px;
        font-size: 15px;
        // color: rgb(255, 73, 73, .7);
        color: #d02322;
        display: inline-block;
        font-family: Rockwell, sans-serif;
        letter-spacing: 1px;
        // min-height: 20px;
        height: 35px;
    }
}
</style>
