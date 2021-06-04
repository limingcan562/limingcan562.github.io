<template>
    <div class="error_content">
        <div class="not_found" v-if="error.statusCode === 404">
            <div class="text">
                <p>404</p>
                <p>你浏览的页面不存在</p>
            </div>
            <NuxtLink class="back_btn" to="/" title="走近我">
                <img :class="{floatAni: load}" src="~/assets/img/leaves.png">
            </NuxtLink>
        </div>

        <div class="busy_content" v-else></div>
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
        .text{
            text-align: center;
            color: #f18017;

            p{
                &:first-child{
                    font-size: 100px;
                    font-weight: bolder;
                    padding-bottom: 20px;
                }
                &:last-child{
                    font-size: 18px;
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
            display: flex;
            align-items: center;
            justify-content: center;

            img{
                width: 30px;
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