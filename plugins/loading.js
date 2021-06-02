export default ({app}) => {
    app.router.beforeEach((to, from, next) => {
        // NProgress.start()
        console.log(app.$ref);
        next()
    })
}