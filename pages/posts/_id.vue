<template>
    <main>
        <article class="md_content markdown-body"
            v-html="posts.html"
        >
        </article>
    </main>
</template>

<script>

export default {
    layout: 'posts',

    async asyncData({params}) {
        // console.log(params);
        const allData = await require.context('~/blog', true, /\.md$/);
        // console.log(allData.keys());
        // const mdData = allData.keys()[params];
        let posts;
        allData.keys().forEach(item => {
            // console.log(allData(item));
            if (item.includes(params.id)) {
                posts = allData(item);
                return;
            }
        });
        
        return {
            posts
        }
        // console.log(data);
    },

    head() {
        return {
            title:'lMC`s Blog | posts',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.posts.title
                }
            ]
        }
    },
}
</script>

<style lang="less" scoped>
main{
    padding: 40px 0 40px;
}
</style>

