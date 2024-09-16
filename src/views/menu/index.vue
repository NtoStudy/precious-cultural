<script setup>
import {onMounted, onUnmounted, reactive, ref} from 'vue'
// 实现router切换路由信息
const activeIndex = ref('home')
// 实现默认头像
const state = reactive({
  circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
})
// 用来实现只有主页有背景图片
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const hasBackground = computed(() => route.meta.hasBackground);
// 用来实现背景图的轮播
const images = ref([
  '/src/assets/home.jpg',
]);
const currentBackground = ref(images.value[0]);

</script>

<template>
  <div class="common-layout"
       :style="{ backgroundImage: hasBackground ?`url(${currentBackground})` : '' }"
       style="background-size: cover; height: 100vh;"
  >
    <el-container>
      <el-header class="header">
        <div class="left-header">遗珍非往</div>
        <div class="right-header">
          <el-menu
              :default-active="activeIndex"
              class="el-menu-demo"
              mode="horizontal"
              :ellipsis="false"
              active-text-color="#ffd04b"
              router
          >
            <el-sub-menu index="home">
              <template #title>首页</template>
              <el-menu-item index="home">首页</el-menu-item>
              <el-menu-item index="heritage">文化遗产</el-menu-item>
              <el-menu-item index="route">旅游路线</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="fictitious">vr展厅</el-menu-item>
            <el-menu-item index="forum">论坛</el-menu-item>
            <el-menu-item index="about">关于</el-menu-item>
            <el-menu-item index="shopping">购物</el-menu-item>
          </el-menu>
          <div class="header-right-content">
            <el-icon :size="24">
              <ChatLineSquare/>
            </el-icon>
            <el-avatar :size="24" :src="state.circleUrl"/>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                设置
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>设置账号</el-dropdown-item>
                  <el-dropdown-item>更改头像</el-dropdown-item>
                  <el-dropdown-item>退出登录</el-dropdown-item>
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
  </div>

</template>

<style lang="scss" scoped>
.common-layout {
  transition: background-image 0.5s ease-in-out;
}
.carousel-image {
  /* 轮播图每个项目的样式 */
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
}
.el-header{
  --el-header-padding: 0;
  --el-header-height: 70px;
  --el-menu-text-color : rgb(104, 109, 139);
  --el-menu-active-color: rgb(201, 176, 154);
  --el-menu-bg-color:  rgb(201, 176, 154);
}
.header{
  display: flex;
  justify-content: space-between;
  background-color: rgba(204, 204, 204,0.6) !important;
  .left-header{
    line-height: 70px;
    font-size: 23px;
    margin-left: 80px;
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
  --el-menu-horizontal-height: 70px;
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
