<template>
  <div class="character-avatar" @click="handleOpenDialog">
    <el-avatar :src="characterImageUrl" style="width: 80px; height: 80px;" title="点我可以进行AI对话哦"/>
  </div>
</template>

<script setup>
const characterImageUrl = 'https://takeaway-hei.oss-cn-hangzhou.aliyuncs.com/rw.jpg';

const emits = defineEmits(['open-dialog']);

const handleOpenDialog = () => {
  try {
    emits('open-dialog');
  } catch (error) {
    console.error('打开对话框时出错:', error);
  }
}
</script>

<style scoped lang="scss">
.character-avatar {
  cursor: pointer;
  z-index: 999999;
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
