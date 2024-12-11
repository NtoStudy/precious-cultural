<script setup>
import { reactive, ref, computed } from 'vue'
import { useUserInfoStore } from '@/store/modules/user'
import { useRoute } from "vue-router";
import {ChatLineSquare} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import { removeLocalStorage } from "@/utils/catch.js";

// 使用状态管理获取用户信息
const userStore = useUserInfoStore()
const route = useRoute()
const activeIndex = computed(() => route.path)
// 初始化激活的菜单索引
activeIndex.value = route.path || ''

// 定义响应式状态
const state = reactive({
  circleUrl: 'https://takeaway-hei.oss-cn-hangzhou.aliyuncs.com/tx.png',
})

// 控制下拉菜单的可见性
const isDropdownVisible = ref(false);

// 切换下拉菜单的可见性
const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value;
};

// 退出登录
const logout = () => {
  try {
    userStore.clearUserInfo()
    removeLocalStorage('token')
    ElMessage.success('退出登录成功！')
  } catch (error) {
    console.error('退出登录失败：', error);
  }
}

// 导航到用户管理页面
const goToUserManage = () => {
  try {
    const { userInfo } = userStore
    if (!userInfo) {
      console.log('未登录');
      router.push({ name: 'login' });
    } else {
      router.push({ name: 'userManage', params: { infoId: userInfo.username } });
    }
  } catch (error) {
    console.error('导航到个人中心失败：', error);
  }
}

// 导航到编辑页面
const goToEdit = () => router.push('/menu/editor')
</script>

<template>
  <el-container>
    <el-header class="header">
      <div class="left-header">遗珍非往</div>
      <div class="left-header-text" v-if="userStore.userInfo">
        尊敬的 {{ userStore.userInfo.username }} ，欢迎来到到遗珍非往！
      </div>
      <div class="left-header-text" v-else>
        欢迎来到遗珍非往！点这里进行
        <router-link to="/login">登录</router-link>
      </div>
      <div class="right-header">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          :ellipsis="false"
          active-text-color="#ffd04b"
        >
          <el-menu-item @click="$router.push({ name: 'home' })" class="menu-item">首页</el-menu-item>
          <el-menu-item @click="$router.push({ name: 'heritage' })" class="menu-item">文化遗产</el-menu-item>
          <el-menu-item @click="$router.push({ name: 'fictitious' })" class="menu-item">vr展厅</el-menu-item>
          <el-menu-item @click="$router.push({ name: 'forum' })" class="menu-item">论坛</el-menu-item>
          <el-menu-item @click="$router.push({ name: 'about' })" class="menu-item">关于</el-menu-item>
        </el-menu>
        <div class="header-right-content">
          <el-button type="primary" round @click="goToEdit">
            <el-icon style="margin-right: 10px;"><Plus /></el-icon>
            发布
          </el-button>
          <el-icon :size="24">
            <ChatLineSquare />
          </el-icon>
          <el-popover placement="bottom" :width="220" trigger="hover">
            <template #reference>
              <el-avatar :size="26" :src="state.circleUrl" />
            </template>
            <template #default>
              <div class="header" style="text-align: center; font-size: 16px;">
                <p>{{ userStore.userInfo ? userStore.userInfo.username : '未登录' }}</p>
              </div>
              <el-divider style="margin: 10px 0;" />
              <div class="body" style="display: flex; justify-content: space-around;">
                <div>
                  <p style="font-weight: bold; font-size: 18px;">100</p>
                  <p style="text-align: center; font-size: 14px;">粉丝</p>
                </div>
                <div>
                  <p style="font-weight: bold; font-size: 18px;">100</p>
                  <p style="text-align: center; font-size: 14px;">关注</p>
                </div>
                <div>
                  <p style="font-weight: bold; font-size: 18px;">100</p>
                  <p style="text-align: center; font-size: 14px;">获赞</p>
                </div>
              </div>
              <el-divider style="margin: 10px 0;" />
              <div class="footer" @click="goToUserManage()">
                <div style="display: flex; cursor: pointer;">
                  <el-icon size="20" style="margin-left: 20px; margin-right: 10px;"><User /></el-icon>
                  <p style="font-size: 16px;">个人中心</p>
                </div>
              </div>
            </template>
          </el-popover>
          <el-dropdown trigger="click" v-model:visible="isDropdownVisible" @visible-change="toggleDropdown">
            <span class="el-dropdown-link" style="cursor: pointer;">
              设置
            </span>
            <template #dropdown>
              <el-dropdown-menu :aria-hidden="!isDropdownVisible">
                <el-dropdown-item>设置账号</el-dropdown-item>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
.carousel-image {
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
}
.el-header {
  --el-header-padding: 0;
  --el-header-height: 60px;
  --el-menu-text-color: rgb(104, 109, 139);
  --el-menu-active-color: rgb(201, 176, 154);
  --el-menu-bg-color: rgb(201, 176, 154);
}
.header {
  display: flex;
  justify-content: space-between;
  background-color: rgba(255, 255, 255) !important;
  .left-header {
    line-height: 60px;
    font-size: 28px;
    margin-left: 80px;
    font-family: "STXingkai", "华文行楷", "Xingkai SC", "KaiTi", serif;
  }
  .left-header-text {
    line-height: 60px;
    font-size: 16px;
  }
  .right-header {
    display: flex;
    font-weight: 550;
    .header-right-content {
      margin-left: 140px;
      margin-right: 20px;
      width: 300px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      .el-dropdown-link {
        font-size: 16px;
      }
      .user-info {
        display: flex;
      }
    }
  }
}
.el-main {
  --el-main-padding: 0;
}
.el-menu--horizontal {
  --el-menu-horizontal-height: 60px;
}
.el-menu--horizontal.el-menu {
  border-bottom: 0 solid var(--el-menu-border-color);
}
.el-menu {
  background-color: transparent !important;
}
.el-menu--horizontal .el-menu-item {
  position: relative; 
}
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {

  transition: color 0.3s; 
}


</style>
