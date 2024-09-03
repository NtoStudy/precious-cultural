<script setup>
import {
  Menu as IconMenu,
} from '@element-plus/icons-vue'
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

        </el-menu>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>

</style>
