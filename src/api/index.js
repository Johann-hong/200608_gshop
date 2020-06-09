/*
包含n个接口请求函数的模块
函数返回值：promise对象
*/
import ajax from './ajax'

// const BASE_URL = 'http://localhost:4000'
const BASE_URL = '/api'

export const reqAddress = geohash => ajax(BASE_URL + '/position/' + geohash)

export const reqCategorys = () => ajax(BASE_URL + '/index_category')

export const reqShops = (latitude, longitude) => ajax(BASE_URL + '/shop', {latitude, longitude})  // 键值对名字相同，缩写

export const reqPwdLogin = (name, pwd, captcha) => ajax(BASE_URL + '/login_pwd', {name, pwd, captcha}, "post")

export const reqSendCode = phone => ajax(BASE_URL + '/sendcode', {phone})

export const reqSmsLogin = (phone, code) => ajax(BASE_URL + '/login_sms', {phone, code}, "post")

export const reqUser = () => ajax(BASE_URL + '/userinfo')

export const reqLogout = () => ajax(BASE_URL + '/logout')