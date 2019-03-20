<template>
  <div class="login-container">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <h3 class="title">ZONE</h3>
      <el-form-item prop="userName">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user"/>
        </span>
        <el-input name="userName" type="text" v-model="loginForm.userName" autoComplete="on" placeholder="userName"/>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
                  placeholder="password"></el-input>
        <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye"/></span>
      </el-form-item>
      <div>
        <el-checkbox  label="1">记住我</el-checkbox>
        <a class="forgetpwd" @click="forgetPwd">忘记密码</a>
      </div>
      <el-form-item style="margin-top: 10px">
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          Sign in
        </el-button>
      </el-form-item>
      <div class="tips">
        <a @click="register">立即注册</a>
      </div>
    </el-form>
  </div>
</template>

<script>
  import { isvalidUsername } from '@/utils/validate'
  import { getTokenStr } from '@/api/token'
  import { setToken } from '@/utils/auth'

  export default {
    name: 'login',
    data() {
      const validateusername = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value.length < 5) {
          callback(new Error('密码不能小于5位'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          userName: 'admin',
          password: 'admin'
        },
        loginRules: {
          userName: [{required: true, trigger: 'blur', validator: validateusername}],
          password: [{required: true, trigger: 'blur', validator: validatePass}]
        },
        loading: false,
        pwdType: 'password'
      }
    },
    methods: {
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      // 调用登陆方法前先获取token并保存
      getTokenStr() {
        var that = this
        getTokenStr().then(response => {
          const token = response.data
          setToken(token)
          console.log(token)
          that.$router.push({ path: '/' })
        }).catch(error => {
          console.log(error)
        })
      },
      loginByNameAndPwd() {
        var that = this
        that.$refs.loginForm.validate(valid => {
          if (valid) {
            that.loading = true
            that.$store.dispatch('Login', this.loginForm).then(() => {
              that.loading = false
              that.getTokenStr()
              console.log(that)

            }).catch((error) => {
              that.loading = false
              console.log(error)
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      handleLogin() {
        this.loginByNameAndPwd()
      },
      forgetPwd() {
        this.$message({
          message: '',
          type: 'success'
        })
      },
      register() {
        this.$router.push({
          path: '../register/register',
          name: 'register',
          component: () => import('@/views/register/register'),
          redirect: 'noredirect'
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg: #2d3a4b;
  $light_gray: #eee;

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;
  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: $bg;
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 520px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .forgetpwd {
      font-size: 14px;
      color: $dark_gray;
      margin-left: 316px;
    }
  }
</style>
