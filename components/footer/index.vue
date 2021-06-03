<template>
<footer>
    <nav>
        <ul>
            <li
                v-for="(item, index) in navData"
                :key="index"
            >
            <nuxt-link :to="item.path">{{item.txt}}</nuxt-link>
            </li>
        </ul>
    </nav>
    <p class="des">written by 🍁lMC</p>
</footer>
</template>

<script>
export default {
    data() {
        return {
            navData: [
                {
                    txt: 'home',
                    path: '/'
                },
                {
                    txt: 'about',
                    path: '/about'
                }
            ]
        }
    },

    mounted() {
        
    },
}
</script>

<style lang="less" scoped>
footer{
    padding: 30px 0 35px;
    font-size: 13px;
    color: #666;
    font-family: Merriweather,Georgia,serif;
    // text-align: right;

    nav{
        padding-bottom: 10px;
    }

    ul{
        display: flex;
        align-items: center;
        // justify-content: flex-end;
    }

    li{
        &:first-child{
            &::before{
                display: none;
            }
        }
        &::before{
            content: "";
            display: inline-block;
            margin: 0 8px;
            width: 5px;
            height: 5px;
            border-top: 1px solid #666;
            border-right: 1px solid #666;
            transform: rotate(45deg);
        }
    }

    a{
        text-decoration: underline;
        color: #444;
    }

    .des{
        font-size: 12px;
        transform: scale(.85);
        transform-origin: 0 center;
    }
}
</style>
