/*
vuex 的mutations 模块
*/
import Vue from 'vue'

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

export default {
  [RECEIVE_ADDRESS](state, {address}) {
    state.address = address
  },
  [RECEIVE_CATEGORYS](state, {categorys}) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPS](state, {shops}) {
    state.shops = shops
  },
  [RECEIVE_USER_INFO](state, {userInfo}) {
    state.userInfo = userInfo
  },
  [RESET_USER_INFO](state) {
    state.userInfo = {}
  },

  // mock
  [RECEIVE_INFO](state, {info}) {
    state.info = info
  },
  [RECEIVE_RATINGS](state, {ratings}) {
    state.ratings = ratings
  },
  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods
  },

  // foodcount
  [INCREASE_FOOD_COUNT](state, {food}) {
    if (!food.count){
      // food.count = 1     // 新增属性（没有数据绑定）
      // 对象，属性名，属性值
      Vue.set(food, 'count', 1)   // 增加绑定
      state.cartFoods.push(food)
    }else{
      food.count++
    }
  },
  [DECREASE_FOOD_COUNT](state, {food}) {
    if (food.count > 0){ // 只在有值的时候做减法
      food.count--
      if (food.count === 0) {  // 将food从cartFoods中移除
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      } 
    }
  },
  //清空cartFoods
  [CLEARCART](state){
    state.cartFoods.forEach(food => food.count = undefined)
    state.cartFoods = []
  },

  [RECEIVE_SEARCH_SHOPS](state, {searchShops}){
    state.searchShops = searchShops
  }
}