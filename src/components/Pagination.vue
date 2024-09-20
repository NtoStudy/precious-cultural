<script setup>

</script>

<template>
  <div class="pagination-container">
    <el-pagination
        :page-size="6"
        :pager-count="5"
        background
        layout="prev, pager, next"
        :total="66"
    />
  </div>
</template>

<style lang="scss" scoped>
.pagination-container {
  display: flex;
  justify-content: center;
  margin: 40px auto;
  width: 100%;
}
</style>
