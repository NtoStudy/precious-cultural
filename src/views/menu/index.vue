<script setup>
import {
  Menu as IconMenu,
  Location as location,
} from '@element-plus/icons-vue'

import {reactive} from 'vue'

const state = reactive({
  circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
})
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <div class="title">遗珍非往</div>
        <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
        >
          <el-menu-item index="1">
            <el-icon>
              <icon-menu/>
            </el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon>
              <icon-menu/>
            </el-icon>
            <span>第二页</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon>
              <icon-menu/>
            </el-icon>
            <span>第三页</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon>
              <icon-menu/>
            </el-icon>
            <span>第四页</span>
          </el-menu-item>
          <el-sub-menu index="5">
            <template #title>
              <el-icon>
                <location/>
              </el-icon>
              <span>Navigator One</span>
            </template>
            <el-menu-item-group title="Group One">
              <el-menu-item index="5-1">item one</el-menu-item>
              <el-menu-item index="5-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
              <el-menu-item index="5-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="5-4">
              <template #title>item four</template>
              <el-menu-item index="5-4-1">item one</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
        </el-menu>


      </el-aside>
      <el-container>
        <el-header>
          <span class="header-left-content">
            尊敬的 xx 欢迎您登录本系统
          </span>
          <div class="header-right-content">
            <el-icon :size="20">
              <ChatLineSquare/>
            </el-icon>
            <el-avatar :size="24" :src="state.circleUrl"/>
            <el-dropdown>
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
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.el-aside {
  height: 100vh;
  background: #2b303b;
  overflow-x: hidden;
  width: 210px;

  .el-menu {
    background: #2b303b;
    width: 210px;
    border-right: 0;
  }

  .title {
    padding: 20px;
    display: flex;
    justify-content: center;
    color: #fff;
    background: #2b303b;
  }

  .el-menu-item {
    color: #fff
  }

  :deep(.el-sub-menu__title) {
    color: #fff
  }


}
.el-header {
  display: flex;
  height: 55px;
  justify-content: space-between;
  background: #262f3e;
  color: #c1c6c8;
  align-items: center;
  .header-left-content {
    font-size: 14px;
  }
  .header-right-content {
    width: 160px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
.el-menu-item:hover {
  background: #006eff;
}

:deep(.el-sub-menu__title:hover) {
  background: #006eff;
}

:deep(.el-menu--inline) {
  background: #2b303b;
}
</style>
