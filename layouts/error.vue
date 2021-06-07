<template>
    <div class="error_content">
        <div class="not_found" v-if="error.statusCode === 404">
            <div class="text" v-if="error.statusCode === 404">
                <p>404</p>
                <p>你浏览的页面不存在</p>
            </div>
            <div v-else>
                <p>500</p>
                <p>服务器繁忙，请稍后重试</p>
            </div>
            <NuxtLink class="back_btn" to="/" title="走近我">
                <img :class="{floatAni: load}" src="~/assets/img/leaves.png">
                <p>走近我</p>
            </NuxtLink>
        </div>
    </div>
</template>

<script>
export default {
    transitions: 'fadeIn',
    props: ['error'],
    data() {
        return {
            load: 0
        } 
    },

    mounted() {
        this.load = 1;
    }
}
</script>

<style lang="less" scoped>
.error_content{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    .not_found{
        margin-top: -50px;
        
        .text{
            text-align: center;
            color: #f18017;

            p{
                &:first-child{
                    font-size: 90px;
                    font-weight: bolder;
                    padding-bottom: 20px;
                }
                &:last-child{
                    font-size: 16px;
                    font-weight: bolder;
                }
            }
        }

        .back_btn{
            color: #d02322;
            text-align: center;
            display: block;
            font-weight: 500;
            margin-top: 30px;

            img{
                width: 35px;
                margin: 0 auto 5px;
            }

            p{
                font-size: 12px;
            }
        }
    }
}

@keyframes floatAni {
    0% {
        transform: translate3d(0, 0, 0);
    }
    50% {
        transform: translate3d(0, -5px, 0);
    }
    100% {
        transform: translate3d(0, 0, 0);
    }
}
.floatAni{
    -webkit-animation: floatAni 1s linear infinite;
}
</style>