<script setup>
import { reactive, ref} from 'vue'
// 导入pinia的useStore
import { useUserInfoStore } from '@/store/modules/user'
const userStore = useUserInfoStore()
// 实现router切换路由信息
const activeIndex = ref('home')
// 实现默认头像
const state = reactive({
  circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
})
const isDropdownVisible = ref(false);
const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value;
};
// 调用pinia的clearUserInfo方法实现退出登录
const logout = () => {
  userStore.clearUserInfo()
}
</script>

<template>
  <el-container>
    <el-header class="header">
      <div class="left-header">遗珍非往</div>
      <div class="left-header-text" v-if="userStore.userInfo">尊敬的 {{ userStore.userInfo.username }} ，欢迎来到遗珍非往！</div>
      <div class="left-header-text" v-else>欢迎来到遗珍非往！点这里进行
        <router-link to="/login">登录</router-link>
      </div>
      <div class="right-header">
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            :ellipsis="false"
            active-text-color="#ffd04b"
            router
        >
          <el-menu-item index="home">首页</el-menu-item>
          <el-menu-item index="heritage">文化遗产</el-menu-item>
          <el-menu-item index="route">旅游路线</el-menu-item>
          <el-menu-item index="forum">论坛</el-menu-item>
          <el-menu-item index="about">关于</el-menu-item>
          <el-menu-item index="shopping">购物</el-menu-item>
        </el-menu>
        <div class="header-right-content">
          <el-icon :size="24">
            <ChatLineSquare/>
          </el-icon>
          <el-avatar :size="24" :src="state.circleUrl"/>
          <el-dropdown trigger="click" :visible.sync="isDropdownVisible" @visible-change="toggleDropdown">
              <span class="el-dropdown-link">
                设置
              </span>
            <template #dropdown>
              <el-dropdown-menu :aria-hidden="!isDropdownVisible">
                <el-dropdown-item>设置账号</el-dropdown-item>
                <el-dropdown-item>更改头像</el-dropdown-item>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>

</template>

<style lang="scss" scoped>
.carousel-image {
  /* 轮播图每个项目的样式 */
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
}
.el-header{
  --el-header-padding: 0;
  --el-header-height: 60px;
  --el-menu-text-color : rgb(104, 109, 139);
  --el-menu-active-color: rgb(201, 176, 154);
  --el-menu-bg-color:  rgb(201, 176, 154);
}
.header{
  display: flex;
  justify-content: space-between;
  background-color: rgba(255, 255, 255) !important;
  .left-header{
    line-height: 60px;
    font-size: 23px;
    margin-left: 80px;
  }
  .left-header-text{
    line-height: 60px;
  }
  .right-header{
    display: flex;
    font-weight: 550;
    .header-right-content {
      margin-left: 100px;
      margin-right: 20px;
      width: 150px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .el-dropdown-link{
        font-size: 16px;
      }
    }
  }
}
.el-main{
  --el-main-padding:0
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
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  background-color: transparent !important;
  color: rgb(201, 176, 154);
}
.el-menu--horizontal>.el-sub-menu .el-sub-menu title:hover{
  background-color:rgb(201, 176, 154) !important;
}

</style>
