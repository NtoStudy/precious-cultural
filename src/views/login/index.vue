<script setup>
import { ref} from "vue";
import {userLoginPostApi, userRegisterPostApi} from "@/api/login.js";
import router from "@/router/index.js";
import {useUserInfoStore} from "@/store/modules/user.js";
import {ElMessage} from "element-plus";
import {setLocalStorage} from "@/utils/catch.js";
// 选项卡切换 默认为登录页面
const activeName = ref('Login')
// 登录表单验证规则
const LoginRuleForm = ref({
  LoginUserName: '1234',
  LoginPassword: '1234',
  isAgree: false
})
const LoginRules = ref({
  LoginUserName: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
    {min: 2, max: 10, message: '名字长度在 2 到 10 个字符', trigger: 'blur'},
  ],
  LoginPassword: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 4, max: 10, message: '密码长度在 4 到 10 个字符', trigger: 'blur'},
  ]
})
// 跳转到注册页面
const switchToRegister = () => {
  activeName.value = 'Register';
}
// 注册表单验证规则
const RegisterRuleForm = ref({
  RegisterUserName: '',
  RegisterPassword: '',
  RegisterPasswordAgain: '',
  isAgree: false
})
const RegisterRules = ref({
  RegisterUserName: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
    {min: 2, max: 6, message: '名字长度在 2 到 6 个字符', trigger: 'blur'},
  ],
  RegisterPassword: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 4, max: 10, message: '密码长度在 4 到 10 个字符', trigger: 'blur'},
  ],
  RegisterPasswordAgain: [
    {required: true, message: '请再次输入密码', trigger: 'blur'},
    {min: 4, max: 10, message: '密码长度在 4 到 10 个字符', trigger: 'blur'},
    {
      validator: (rule, value, callback) => {
        if (value !== RegisterRuleForm.value.RegisterPassword) {
          callback(new Error('两次输入的密码不一致!'));
        } else {
          callback();
        }
      }, trigger: 'blur'
    }
  ]
})
// 切换到登录页面
const switchToLogin = () => {
  activeName.value = 'Login';
}
// 用于控制登录信息的持久化处理

// 登录
const login = async () => {
  const UserLogin = await userLoginPostApi(LoginRuleForm.value.LoginUserName, LoginRuleForm.value.LoginPassword)
  if(UserLogin.data.code === 1){
    const userStore = useUserInfoStore()
    setLocalStorage('token', UserLogin.data.data.token)
    userStore.setUserInfo(UserLogin.data.data)
    ElMessage.success('登录成功')
    router.push('/menu')
  }
}

// 注册
const register = async () => {
  const UserRegister = await userRegisterPostApi(RegisterRuleForm.value.RegisterUserName, RegisterRuleForm.value.RegisterPassword)
  console.log(UserRegister)
  if(UserRegister.data.code === 1){
    ElMessage.success('注册成功')
    switchToLogin()
    // 登录页面的账户和密码变成注册页面的账户和密码
    LoginRuleForm.value.LoginUserName = RegisterRuleForm.value.RegisterUserName
    LoginRuleForm.value.LoginPassword = RegisterRuleForm.value.RegisterPassword
  }
}

</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-container_left">
        <img src="../../assets/login/bg.jpg" alt=""/>
      </div>
      <div class="login-container_right">
        <el-tabs class="top-tab" v-model="activeName" :stretch="true">
          <!-- 这里是登录的选项卡 -->
          <el-tab-pane label="登录" name="Login">
            <el-card shadow="never">
              <h1 class="user-name">登录</h1>
              <el-form ref="loginForm" :rules="LoginRules" status-icon :model="LoginRuleForm">
                <el-form-item prop="LoginUserName" class="user-Count">
                  <el-input
                      v-model="LoginRuleForm.LoginUserName"
                      placeholder="请输入用户名"
                  />
                </el-form-item>
                <el-form-item prop="LoginPassword" style="margin-top: 40px">
                  <el-input
                      v-model="LoginRuleForm.LoginPassword"
                      placeholder="请输入密码"
                      type="password"
                      show-password
                  >
                  </el-input>

                </el-form-item>
                <el-form-item
                    prop="isAgree"
                    class="userAgree"
                    style="display: flex; align-items: center"
                >
                  <el-checkbox class="check-item" v-model="LoginRuleForm.isAgree"
                  >平台使用协议
                  </el-checkbox
                  >
                  <el-link
                      class="link-item"
                      :underline="false"
                      style="margin-left: 80px"
                      @click="switchToRegister"
                  >还没有账号？请先注册->
                  </el-link
                  >
                </el-form-item>
                <el-form-item style="margin-top: 40px">
                  <el-button type="primary" @click="login">登录</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-tab-pane>
          <!-- 这里是注册的选项卡 -->
          <el-tab-pane label="注册" name="Register">
            <el-card shadow="never">
              <el-form ref="registerForm" :rules="RegisterRules" status-icon :model="RegisterRuleForm">
                <h1 class="user-name">注册</h1>
                <el-form-item prop="RegisterUserName" class="user-Count">
                  <el-input
                      v-model="RegisterRuleForm.RegisterUserName"
                      placeholder="请输入用户名"
                  />
                </el-form-item>
                <el-form-item prop="RegisterPassword" style="margin-top: 30px">
                  <el-input
                      type="password"
                      placeholder="请输入密码"
                      v-model="RegisterRuleForm.RegisterPassword"
                      show-password
                  />
                </el-form-item>
                <el-form-item prop="RegisterPasswordAgain" style="margin-top: 30px">
                  <el-input
                      type="password"
                      placeholder="再次确认密码"
                      v-model="RegisterRuleForm.RegisterPasswordAgain"
                      show-password
                  />
                </el-form-item>
                <el-form-item
                    prop="isAgree"
                    class="userAgree"
                    style="display: flex; align-items: center"
                >
                  <el-checkbox
                      class="check-item"
                      v-model="RegisterRuleForm.isAgree"
                  >平台使用协议
                  </el-checkbox
                  >
                  <el-link
                      class="link-item"
                      :underline="false"
                      style="margin-left: 80px"
                      @click="switchToLogin"
                  >已有账号？请直接登录 &lt;-</el-link>
                </el-form-item>
                <el-form-item style="margin-top: 40px">
                  <el-button type="primary" @click="register">注册</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-image: url('@/assets/aboutbg.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  .login-box {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 500px;
    width: 1200px;

    .login-container_left {
      height: 600px;
      width: 400px;
      flex: 3;

      img {
        object-fit: cover;
        height: 100%;
        width: 100%;
      }
    }
  }

  .login-container_right {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 600px;
    flex: 2;
    right: 100px;
    top: 50%;
    border: 1px solid #ccc;
    background-color: #fff;

    .user-name {
      text-align: center;
      font-size: 25px;
      margin-top: 10px;
      font-weight: 600;
      margin-bottom: 30px;
    }

    .top-tab {
      font-size: 30px;
      margin: 70px 20px 20px;
    }

    .el-card {
      border: none;

      :deep(.el-card__body) {
        padding: 0;
      }

      .el-input {
        width: 350px;
        border-left: none;

        :deep(.el-input__inner) {
          background: #fff;
        }

      }

      input.el-input__inner {
        border-left: none;

      }

      .el-checkbox {
        color: #606266;
      }

      .el-button {
        width: 350px;
      }

      .user-Count {
        border: none;
        background-color: #ffffff;
      }
    }
  }
}
</style>
