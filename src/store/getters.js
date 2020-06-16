export default {                   // 计算属性，不需要组件参数的，直接在getters中设置
  totalCount (state) {
    return state.cartFoods.reduce((preTotal, food) => preTotal + food.count, 0)
  },
  totalPrice (state) {
    return state.cartFoods.reduce((preTotal, food) => preTotal + food.count * food.price, 0)
  },
  positiveSize (state) {
    return state.ratings.reduce((preTotal, rating) => preTotal + (rating.ratetype===0?1:0), 0)
  }
}