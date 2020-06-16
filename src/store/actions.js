/*
vuex 的actions 模块
*/

import {
  RECEIVE_ADDRESS, 
  RECEIVE_CATEGORYS, 
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  INCREASE_FOOD_COUNT,
  DECREASE_FOOD_COUNT,
  CLEARCART,
  RECEIVE_SEARCH_SHOPS
} from './mutations-types'

import {
  reqAddress,
  reqCategorys,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopGoods,
  reqShopRatings,
  reqShopInfo,
  reqSearchShop
} from '../api'

export default {
  // 异步获取地址
  async getAddress ({commit, state}) {               // ({commit, state}, [parameters])  state 是函数中是否用到state中数据，[parameters]则是否需要组件中传参进来
    // 发送异步ajax请求
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    if (result.code === 0) {
      commit(RECEIVE_ADDRESS, {address: result.data})
    }
  },
  async getCategorys ({commit}) {
    // 发送异步ajax请求
    const result = await reqCategorys()
    if (result.code === 0) {
      commit(RECEIVE_CATEGORYS, {categorys: result.data})
    }
  },
  async getShops ({commit, state}) {
    // 发送异步ajax请求
    const {latitude, longitude} = state
    const result = await reqShops(latitude, longitude)
    if (result.code === 0) {
      commit(RECEIVE_SHOPS, {shops: result.data})
    }
  },
  // 同步获取用户信息
  recordUserInfo ({commit}, userInfo) {
    commit(RECEIVE_USER_INFO, {userInfo})
  },
  // 异步获取用户信息
  async getUserInfo ({commit}) {
    const result = await reqUserInfo()
    if (result.code === 0) {
      commit(RECEIVE_USER_INFO, {userInfo: result.data})
    }
  },
  // 异步登出
  async logout ({commit}) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RESET_USER_INFO)
    }
  },


  //mock
  // 异步获取商家信息
  async getShopInfo({commit}, cb) {
    const result = await reqShopInfo()
    if(result.code===0) {
      const info = result.data
      // info.score = 3.5
      // if (info.score > 5) {info.score = 5}
      commit(RECEIVE_INFO, {info})
      cb && cb()
    }
  },

  // 异步获取商家评价列表
  async getShopRatings({commit}, cb) {  
    const result = await reqShopRatings()
    if(result.code===0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
      cb && cb()
    }
  },
  // 异步获取商家商品列表
  async getShopGoods({commit}, cb) {
    const result = await reqShopGoods()
    if(result.code===0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
      // 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件
      cb && cb()
    }
  },
  // 同步更新foodcount
  updateFoodCount({commit}, {isAdd, food}) {
    if (isAdd) {
      commit(INCREASE_FOOD_COUNT, {food})
    }else{
      commit(DECREASE_FOOD_COUNT, {food})
    }
  },
  clearCart({commit}){
    commit(CLEARCART)
  },
  
  // 异步获取商家评价列表
  async searchShops({commit, state}, keyword, cb) {  
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqSearchShop(geohash, keyword)
    if(result.code===0) {
      commit(RECEIVE_SEARCH_SHOPS, {searchShops: result.data})
      cb && cb()
    }
  },

}