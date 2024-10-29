<script setup>
import { reactive, ref} from 'vue';
import router from "@/router/index.js";
import { ElMessage } from 'element-plus'
const activeIndex = ref('1');
import {useUserInfoStore} from "@/store/modules/user.js";

const userInfo = useUserInfoStore()
const ruleForm = reactive({
  name: userInfo.userInfo.username,
  careerPath: '',
  position: '',
  company: '',
  address: '',
  desc: '',
  date: ''
})
const rules = reactive({
  name: [
    {required: true, message: 'Please input Activity name', trigger: 'blur'},
    {min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur'},
  ],
  region: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change',
    },
  ],
  count: [
    {
      required: true,
      message: 'Please select Activity count',
      trigger: 'change',
    },
  ],
  date1: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
    },
  ],
  date2: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a time',
      trigger: 'change',
    },
  ],
  location: [
    {
      required: true,
      message: 'Please select a location',
      trigger: 'change',
    },
  ],
  type: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change',
    },
  ],
  resource: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change',
    },
  ],
  desc: [
    {required: true, message: 'Please input activity form', trigger: 'blur'},
  ],
})


// 头像上传
import {Plus} from '@element-plus/icons-vue'


const imageUrl = ref('')
const handleAvatarSuccess = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw)
}

const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

// 提交表单信息
const handleSubmit = ()=> {
  ElMessage.success('保存成功')
}
// 账号设置内容
const accountSetting = [
    {
  title: '手机',
  info: '13812345678',
      operate: '换绑'

},{
    title: '微信',
    info: '未绑定',
    operate: '绑定'
  },{
    title: '邮箱',
    info: '未绑定',
    operate: '绑定'
  },{
    title: '密码',
    info: '',
    operate: '重置'
  }]
</script>
<template>

  <div class="info-list-container">
    <el-card class="last-page" @click="router.push({name: 'userManage', params: {infoId: userInfo.userInfo.username}})">
      < 返回个人主页
    </el-card>

    <div class="info-container">
      <div class="info-left">
        <el-menu
            mode="vertical"
            :default-active="activeIndex"
            class="image-navigation"
            background-color="#fff"
            text-color="#525766"
        >
          <el-menu-item index="1" @click="activeIndex = '1'"><el-icon class="el-icon"><Avatar /></el-icon>个人资料</el-menu-item>
          <el-menu-item index="2" @click="activeIndex = '2'"><el-icon class="el-icon"><Tools /></el-icon>账号设置</el-menu-item>
        </el-menu>
      </div>
      <el-card class="info-right">
        <div v-if="activeIndex === '1'" class="info-right-one">
          <p class="info-title">个人资料</p>
          <el-divider style="margin: 16px 0;"/>
          <div class="info-form">
            <el-form
                ref="ruleFormRef"
                style="max-width: 600px"
                label-width="auto"
                :model="ruleForm"
                class="demo-ruleForm"
                status-icon
            >
              <el-form-item label="用户名" prop="name" required style="width: 600px">
                <el-input v-model="ruleForm.name"/>
              </el-form-item>
              <el-form-item label="出生日期" prop="date">
                <el-date-picker
                    v-model="ruleForm.date"
                    type="date"
                    placeholder='请选择出生日期'
                    style="width: 100%"
                />
              </el-form-item>
              <el-form-item label="职业方向" prop='careerPath'>
                <el-input v-model="ruleForm.careerPath" placeholder="请输入职业方向"></el-input>
              </el-form-item>
              <el-form-item label="职位" prop="position">
                <el-input v-model="ruleForm.position" placeholder="请输入职位" maxlength="50" show-word-limit/>
              </el-form-item>
              <el-form-item label="家庭地址" prop="address">
                <el-input v-model="ruleForm.address" placeholder="请输入家庭地址" maxlength="50" show-word-limit/>
              </el-form-item>
              <el-form-item label="公司" prop="company">
                <el-input v-model="ruleForm.company" placeholder="请输入公司" maxlength="50" show-word-limit/>
              </el-form-item>
              <el-form-item label="个人介绍" prop="desc">
                <el-input v-model="ruleForm.desc" type="textarea" placeholder="请输入个人介绍" maxlength="200"
                          show-word-limit :autosize="{ minRows: 2, maxRows: 4 }"/>
              </el-form-item>


            </el-form>
            <div class="avatar-uploader">
              <el-upload
                  class="avatar-uploader"
                  action="http://localhost:8080/upload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" alt=""/>
                <el-icon v-else class="avatar-uploader-icon">
                  <Plus/>
                </el-icon>
              </el-upload>
              <p style="margin-left: 30px; margin-top: 10px; width: 80%;">格式：支持JPG、PNG、JPEG
                大小：5M以内</p>
            </div>
          </div>
          <el-button type="primary" style="margin-left: 40px;margin-top: 20px; " @click="handleSubmit">保存</el-button>
        </div>
        <div v-if="activeIndex === '2'" class="info-right-two">
          <h2 style="margin-left: 20px; font-size: 30px; margin-top: 20px; font-weight: 500;">账号设置</h2>
          <el-divider style="margin: 16px 0;"/>
          <div v-for="item in accountSetting" :key="item">
            <div class="info-binding" >
              <div style="display: flex;">
                <p style="font-size: 17px; font-weight: 500;">{{item.title}}</p>
                <p style="font-size: 17px; font-weight: 500; margin-left: 240px;">{{item.info}}</p>
              </div>
              <p class="info-binding-btn">{{item.operate}}</p>
            </div>
            <el-divider style="margin: 16px 0;"/>
          </div>
        </div>
      </el-card>
    </div>

  </div>
</template>


<style scoped lang="scss">
.info-list-container {
  .last-page {
    margin: 0 auto;
    width: 1200px;
    color: #3f7ef7;
    cursor: pointer;
  }

  .info-container {
    max-width: 1200px;
    display: flex;
    margin: auto;
    padding: 10px;

    .info-left {
      margin: 20px 0;
      width: 20%;
      .image-navigation .el-menu-item {
        transition: background-color 0.3s, color 0.3s; /* 平滑过渡效果 */
      }

      .image-navigation .el-menu-item:hover {
        background-color: #ebf2fe; /* 悬停时的背景颜色 */
        color: #3f7ef7; /* 悬停时的文字颜色 */
      }

      .image-navigation .el-menu-item.is-active {
        background-color: #ebf2fe; /* 激活项的背景颜色 */
      }

      /* 如果你想要悬停效果也改变图标的颜色，可以添加以下样式 */
      .image-navigation .el-menu-item:hover i {
        color: #ebf2fe; /* 悬停时的图标颜色 */
      }
    }

    .info-right {
      --el-card-padding: 0px;
      margin-left: 24px;
      margin-top: 20px;
      width: 78%;

      .info-right-one{
        height: 600px;
        .info-title {
          font-size: 20px;
          margin-left: 20px;
          margin-top: 16px;
        }

        .info-form {
          display: flex;
          margin-left: 30px;
          :deep(el-form-item__label) {
            line-height: 35px;
          }
          :deep(.el-input__wrapper) {
            background-color: #f2f3f5;
            height: 35px;
          }
        }

        .avatar-uploader {
          margin-left: 40px;
          .avatar {
            width: 178px;
            height: 178px;
            display: block;
          }

          :deep(.el-upload ) {
            border: 1px dashed var(--el-border-color);
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: var(--el-transition-duration-fast);
          }

          :deep(.el-upload:hover) {
            border-color: var(--el-color-primary);
          }

          .el-icon.avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            text-align: center;
          }
        }

      }
      .info-right-two{
        height: 500px;

        .info-binding{
          display: flex;
          justify-content: space-between;
          padding: 10px 0 10px 20px;
          .info-binding-btn {
            font-size: 17px;
            font-weight: 500;
            margin-right: 24px;
            color: #3f7ef7;
            cursor: pointer;
          }
        }
      }

    }
  }
}
</style>
