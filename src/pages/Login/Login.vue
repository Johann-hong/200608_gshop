<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: loginWay}" @click="loginWay = true">短信登录</a>
          <a href="javascript:;" :class="{on: !loginWay}" @click="loginPWD">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on: loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!rightPhone" class="get_verification" :class='{rightPhone}' @click.prevent="getCode"
                >{{computeTime? `已发送（${computeTime}s）` : '获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <input type="text" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !loginWay}">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="password" maxlength="8" placeholder="密码" v-model="pwd" v-show="!showPWD">
                <input type="text" maxlength="8" placeholder="密码" v-model="pwd" v-show="showPWD">
                <div class="switch_button" :class="showPWD ? 'on' : 'off'" @click="showPWD = !showPWD">
                  <div class="switch_circle" :class="{right: showPWD}"></div>
                  <span class="switch_text">{{showPWD ? 'abc' : '...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="changeCaptcha"
                  ref="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <AlertTip :alertText='alertText' v-show="alertShow" @closeTip='closeTip'/>
  </section>
</template>

<script>
  import AlertTip from '../../components/AlertTip/AlertTip.vue'
  import {reqSendCode, reqSmsLogin, reqPwdLogin} from '../../api'     // 在路由组件中发送请求（另一种是在actions中发送请求）
  export default {
    data() {
      return {
        loginWay: true,   // true 表示短信登陆， false表示密码登陆
        showPWD: false,   // 密码显示开关
        alertShow: false, // 错误提示显示与否
        computeTime: 0,    // 验证码发送后计时
        phone: '',        // 手机号
        pwd: '',          // 密码
        code: '',          // 验证码
        name: '',           // 用户名
        captcha: '',         // 图形验证码
        alertText: ''       // 错误提示内容
      }
    },
    computed: {
      rightPhone() {
        return /^1\d{10}$/.test(this.phone)
      }
    },
    methods: {
      // 异步获取短信验证码
      async getCode() {
        //如果没启动，启动
        if (!this.computeTime) {
          // 启动计时器
          this.computeTime = 30
          this.intervalId = setInterval(()=>{
            this.computeTime--
            if (this.computeTime === 0) {
              clearInterval(this.intervalId)
            }
          }, 1000)
          // 发送ajax请求（向指定的手机发送验证码）
          const result = await reqSendCode(this.phone)
          if (result.code === 1) {
            //显示提示
            this.showAleart(result.msg)
            // 停止计时
            if (this.computeTime) {
              this.computeTime = 0
              clearInterval(this.intervalId)
              this.intervalId = undefined
            }            

          }

        }
      },
      showAleart(alertText) {
        this.alertShow = true
        this.alertText = alertText
      },
      // 异步登陆
      async login() {
        let result
        //前台表单验证
        if (this.loginWay) { // 短信登陆
          const {rightPhone, phone, code} = this
          if (!rightPhone) {
            this.showAleart('手机号码不正确')
            return
          }else if (!/^\d{6}$/.test(code)) {
            this.showAleart('验证码必须是6位数字')
            return
          }
          // 发送ajax请求短信登陆
          result = await reqSmsLogin(phone, code)
        }else{  // 密码登陆
          const {name, pwd, captcha} = this
          if (!name) {
            return
          }else if (!pwd) {
            return            
          }else if (!captcha) {
            return
          }
          // 发送ajax请求密码登陆
          result = await reqPwdLogin({name, pwd, captcha})
        }
        // 点击登陆后停止计时
        if (this.computeTime) {
          this.computeTime = 0
          clearInterval(this.intervalId)
          this.intervalId = undefined
        }

        if (result.code === 0) {
          //获取用户信息传递给state
          const userInfo = result.data
          this.$store.dispatch('recordUserInfo', userInfo)
          this.$router.replace('/profile')
        }else{  
          // 提示登陆失败
          const msg = result.msg
          this.showAleart(msg)
          //显示新的验证码
          this.changeCaptcha()
        }
      },
      closeTip(){
        this.alertShow = false
        this.alertText = ''
      },
      changeCaptcha() {
        this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now()
      },
      loginPWD(){
        this.loginWay = false
        //显示新的验证码
        this.changeCaptcha()
      }
    },
    components: {
      AlertTip
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixins.styl'
  *
    touch-action none   // 解决 Unable to preventDefault inside passive event listener due to target being treated as passive 报错
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.rightPhone
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(30px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>