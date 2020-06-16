/*
  使用mockjs提供mock数据接口
*/
import Mock from 'mockjs'
import apiData from './data.json'

// 返回goods的接口
Mock.mock('/goods', {code:0, data: apiData.goods})
// 返回ratings的接口
Mock.mock('/ratings', {code:0, data: apiData.ratings})
// 返回info的接口
Mock.mock('/info', {code:0, data: apiData.info})

// 不需要向外暴露任何数据，只需要保证能执行