<template>
    <div class="about_content">
        <Header :headerText="'About me'" />
        <main>
            <section class="about">
                <h3>{{aboutData.title}}</h3>
                <ul>
                    <li
                        v-for="(item, index) in aboutData.des"
                        :key="index"
                    >{{item}}</li>
                </ul>
            </section>

            <section class="favorite">
                <h3>{{favoriteData.title}}</h3>
                <ul>
                    <li
                        v-for="(item, index) in favoriteData.des"
                        :key="index"
                    >{{item}}</li>
                </ul>
            </section>

            <section class="contact">
                <h3>{{contactData.title}}</h3>
                <ul>
                    <li
                        v-for="(item, index) in contactData.des"
                        :key="index"
                    >{{item}}</li>
                </ul>
            </section>
        </main>
        <Footer />
    </div>
</template>

<script>
export default {
    transition: 'slide',
    head() {
        return {
            title:'lMC`s Blog | about',
            meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                {
                    hid: 'description',
                    name: 'description',
                    content: '关于李明灿的兴趣，爱好，联系方式'
                }
            ]
        }
    },

    data() {
        return {
            aboutData: {
                title: '关于我',
                des: [
                    '一位“不务正业”的程序员',
                    '对事物充满好奇',
                    '求知欲旺盛',
                    '没有能别说服的理由，一定会坚持自我',
                    '...'
                ]
            },
            favoriteData: {
                title: '兴趣爱好',
                des: [
                    '💻 编程', 
                    '🎬 电影', 
                    '🎵 音乐', 
                    '🏸 羽毛球'
                ]
            },
            contactData: {
                title: '联系我',
                des: [
                    '📮E-mail：leemimgcan@gmail.com',
                    '🐧QQ：804666207',
                ]
            },
        };
    },
}
</script>

<style lang="less" scoped>
.about_content{
    padding: 0 20px;
    max-width: 630px;
    margin: 0 auto;
}
main{
    padding: 35px 0;
    font-family: "Montserrat",serif;

    h3{
        font-size: 20px;
        padding-bottom: 10px;
        margin-top: 20px;
        color: #f18017;
    }

    li{
        line-height: 35px;
        font-size: 14px;
        display: flex;
        align-items: center;

        &::before{
            content: "";
            background: #000;
            width: 5px;
            height: 5px;
            display: inline-block;
            border-radius: 50%;
            margin-right: 10px;
            margin-left: 20px;
        }
    }

    .about{
        h3{
            margin-top: 0;
        }
    }
}
// .md_content{
//     font-size: 13px;
// }

</style>

// <style lang="less">
// .about_content{
//     .md_content{
//         h3{
//             font-size: 20px;
//             padding-bottom: 10px;
//         }
//     }
// }
// </style>
