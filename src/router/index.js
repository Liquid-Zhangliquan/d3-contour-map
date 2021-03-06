import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
let base = `${process.env.BASE_URL}` // 动态获取二级目录
const router =  new Router({
    mode: "history",
    base: base,
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/ol/lc-aqi')
        },
        {
            path: '/gx',
            name: 'gx',
            component: () => import('../views/ol/gx-tem')
        },
        {
            path: '/gx-cluster',
            name: 'gx-cluster',
            component: () => import('../views/ol/gx-cluster-tem')
        }
    ]
})

router.beforeEach((to, from, next) => {
    // 做些什么，通常权限控制就在这里做哦

    // 必须写next()哦，不然你的页面就会白白的，而且不报错，俗称"代码下毒"
    next();
});

export default router