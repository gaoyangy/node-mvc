import Vue from 'vue'
import VueRouter from 'vue-router'

//首页
import Home from './views/home/Home'
import Top from './views/top/Top'
import Sign from './views/sign/Sign'
import User from './views/user/User'
import addArticle from './views/article/AddArticle'
import editArticle from './views/article/EditArticle'
import recent from './views/article/Recent'

//内容组件 右侧内容
Vue.use(VueRouter)
const router = new VueRouter({
    history: true,
    hashbang: false,
    routes: [{
            path: '/home',
            name: 'home',
            components: {
                default: Home,
                top: Top
            }
        },
        {
            path: '/sign',
            name: 'Sign',
            component: Sign
        },
        {
            path: '/user/:id?',
            name: 'User',
            component: User

        },
        {
            path: '/addArticle/list',
            name: 'addArticle',
            component: addArticle

        },
        {
            path: '/editArticle',
            name: 'editArticle',
            component: editArticle

        },
        {
            path: '/recent',
            name: 'recent',
            component: recent

        },
        {
            path: '*',
            redirect: '/home'
        }
    ]
})

router.beforeEach((to, from, next, transition) => {
    const token = sessionStorage.getItem('access-token');
    if (to.path == '/sign') { //如果是跳转到登录页的
        if (token != 'null' && token != null) {
            next() //如果有token就转向todolist不返回登录页
        }
        next(); //否则跳转回登录页
    } else if (token != 'null' && token != null) {
        Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        //注意Bearer后有个空格
        next() //如果有token就正常转向
    } else {
        next('/sign') //否则跳转回登录页

    }
})
export default router;