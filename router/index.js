import VueRouter from "vue-router";

import Login from '../src/view/Login'
import Home from '../src/view/home'
import Welcome from '../src/view/Welcome'
import Users from '../src/view/Users'
import Perlist from '../src/view/Perlist'
import Roles from '../src/view/roles'
import Power from '../src/view/power'
import Param from '../src/view/param'
import Sort from '../src/view/sort'
import Listes from '../src/view/listes'
import Dates from '../src/view/dates'
const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: Login,
            meta: { title: '登录' }
        },
        {
            path: '/home',
            name:'home',
            component: Home,
            meta: { isAbout: true },
            redirect:'/welcome',
            children:[
                {
                    path:'/welcome',
                    component:Welcome
                },
                {
                    path:'/users',
                    component:Users
                },
                {
                    path:'/rights',
                    component:Perlist
                },
                {
                    path:'/roles',
                    component:Roles
                }
                ,
                {
                    path:'/power',
                    component:Power
                },
                {
                    path:'/param',
                    component:Param
                },
                {
                    path:'/sort',
                    component:Sort
                }
                ,
                {
                    path:'/listes',
                    component:Listes
                },
                {
                    path:'/dates',
                    component:Dates
                }
            ]
        }
    ]
})
//前置路由守卫
router.beforeEach((to, from, next) => {
    if (to.meta.isAbout) {
        //判断是否有token值
        if (sessionStorage.getItem('token')) {
            //判断token值shif和服务器传递的一直
            const key = window.atob(sessionStorage.getItem('key'))
            const token = sessionStorage.getItem('token')
            if (key !== token) {
                next('/login')
                return
            }
                next()
            
           
        } else {
            next('/login')
        }

    } else {
        next()
    }

})
//后置路由守卫

router.afterEach((to) => {
    document.title = to.meta.title || '后台管理系统'

})

export default router