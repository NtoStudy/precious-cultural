<template>
  <div class="character-avatar" @click="openDialog">
    <el-avatar :src=characterImageUrl style="width: 80px; height: 80px;" title="点我可以进行AI对话哦"/>
  </div>
</template>

<script setup>
const characterImageUrl = 'https://takeaway-hei.oss-cn-hangzhou.aliyuncs.com/rw.jpg';

const emits = defineEmits(['open-dialog'])
const openDialog = () => {
  emits('open-dialog')
}
</script>

<style scoped lang="scss">
.character-avatar {
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
}

.dialog-input {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.message {
  padding: 10px;
  border-radius: 5px;
  background-color: #f0f0f0;
  margin-bottom: 10px;

  &.my-message {
    background-color: #d0e8f2;
  }
}
</style>
