/*
包含n个接口请求函数的模块
函数返回值：promise对象
*/
import ajax from './ajax'

export const reqAddress = geohash => ajax('/position/' + geohash)

export const reqCategorys = () => ajax('/index_category')

export const reqShops = (latitude, longitude) => ajax('/shop', {latitude, longitude})  // 键值对名字相同，缩写

export const reqPwdLogin = (name, pwd, captcha) => ajax('/login_pwd', {name, pwd, captcha}, "post")

export const reqSendCode = phone => ajax('/sendcode', {phone})

export const reqSmsLogin = (phone, code) => ajax('/login_sms', {phone, code}, "post")

export const reqUser = () => ajax('/userinfo')

export const reqLogout = () => ajax('/logout')