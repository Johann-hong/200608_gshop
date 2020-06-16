import Vue from 'vue'
import VueRouter from 'vue-router'

// import Msite from '../pages/Msite/Msite.vue'
// import Search from '../pages/Search/Search.vue'
// import Order from '../pages/Order/Order.vue'
// import Profile from '../pages/Profile/Profile.vue'

const Msite = () => import('../pages/Msite/Msite.vue')            // 路由组件的懒加载，当浏览器需要此段路由JS代码的时候，给后端发送请求获取代码
const Search = () => import('../pages/Search/Search.vue')
const Order = () => import('../pages/Order/Order.vue')
const Profile = () => import('../pages/Profile/Profile.vue')

import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings.vue'

Vue.use(VueRouter)

//push 
const VueRouterPush = VueRouter.prototype.push 
VueRouter.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

//replace
const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (to) {
  return VueRouterReplace.call(this, to).catch(err => err)
}

export default new VueRouter({
    routes: [
        {
            path: '/msite',
            component: Msite,
            meta:{
                showFooter: true
            }
        },
        {
            path: '/search',
            component: Search,
            meta:{
                showFooter: true
            }
        },
        {
            path: '/order',
            component: Order,
            meta:{
                showFooter: true
            }
        },
        {
            path: '/profile',
            component: Profile,
            meta:{
                showFooter: true
            }
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/shop',
            component: Shop,
            children: [
                {
                    path: '/shop/goods',
                    component: ShopGoods
                },
                {
                    path: '/shop/info',
                    component: ShopInfo
                },
                {
                    path: '/shop/ratings',
                    component: ShopRatings
                },
                {
                    path: '/shop/',
                    redirect: '/shop/goods'
                }
            ]
        },
        {
            path: '/',
            redirect: '/msite'
        }
    ]
})
