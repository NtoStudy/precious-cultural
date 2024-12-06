<script setup>
import { ElMessage } from 'element-plus';
// 导入所需的组件和API
import CharacterAvatar from '@/components/CharacterAvatar.vue';
import {computed, ref, watch, nextTick} from 'vue';
import {aiAudioGetApi, aiChatGetApi, aiImageGetApi} from "@/api/common/ai/ai.js";

// 初始化聊天消息数组，包含AI的欢迎语
const messages = ref([
  { text: '你好，我是非遗文化遗产网站的客服小姐姐，有什么可以帮助您？', self: false },
]);
// 用户输入消息
const inputMessage = ref('');
// 控制对话框显示状态
const dialogVisible = ref(false);
// AI类型索引：1-文生文，2-文生图，3-文生音频
const typeIndex = ref(1)
// 滚动条引用
const scrollbarRef = ref(null);

// 计算当前AI类型的显示文本
const currentType = computed(() => {
  if (typeIndex.value === 1) {
    return '文生文';
  } else if (typeIndex.value === 2) {
    return '文生图';
  } else if (typeIndex.value === 3) {
    return '文生音频';
  }
});

// 选择ai类型
const typeSelect = (index) => {
  typeIndex.value = index
}
// 处理响应结果
const responseMessage = async() => {
  if(typeIndex.value === 1){
    // 文生文API调用
    const data = await aiChatGetApi( inputMessage.value,1)
    console.log(data)
    messages.value.push({ text: data.data, self: false });
  }else if(typeIndex.value === 2){
    // 文生图API调用
    const data = await aiImageGetApi( inputMessage.value )
    console.log(data)
    messages.value.push({ text: data.data, self: false });
  }else if(typeIndex.value === 3){
    // 文生音频API调用
    const data = await aiAudioGetApi( inputMessage.value )
    console.log(data)
    messages.value.push({ text: data.data, self: false });
  }
}

// 发送消息
const sendMessage = () => {
  const trimmedMessage = inputMessage.value.trim();
  if (trimmedMessage.length < 1) {
    ElMessage.warning('请输入有效内容');
    return;
  }
  // 添加用户消息
  messages.value.push({ text: trimmedMessage, self: true });

  responseMessage()
  // 发送消息
  inputMessage.value = ''; // 清空输入框
};

// 在消息数组变化时滚动到底部
watch(() => messages.value, async () => {
  await nextTick();
  if (scrollbarRef.value) {
    scrollbarRef.value.setScrollTop(scrollbarRef.value.wrapRef.scrollHeight);
  }
}, { deep: true });
</script>

<template>
  <router-view />
  <CharacterAvatar @open-dialog="dialogVisible = true" />

  <el-dialog
      v-model="dialogVisible"
      width="50%"
      height="400"
  >
    <template #header="{ titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">快来找我问一些跟非遗相关的问题吧
          -- 当前类型：{{ currentType }}</h4>
      </div>
    </template>
    <el-scrollbar height="300px" class="messages-container" ref="scrollbarRef">
      <div class="messages-wrapper">
        <div v-for="(message, index) in messages" 
              :key="index"
              class="message"
              :class="{ 'my-message': message.self, 'ai-message': !message.self }">
          {{ message.text }}
        </div>
      </div>
    </el-scrollbar>
    <div class="dialog-input">

      <el-input
          v-model="inputMessage"
          placeholder="有什么想问的你都可以畅所欲言！"
          @keyup.enter="sendMessage"
          size="large"
          style="width:84%"
      />
      <el-dropdown split-button type="primary" size="large" @click="sendMessage">
        发送
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="typeSelect(1)">文生文</el-dropdown-item>
            <el-dropdown-item @click="typeSelect(2)">文生图</el-dropdown-item>
            <el-dropdown-item @click="typeSelect(3)">文生音频</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.character-avatar {
  position: fixed;
  bottom: 40px;
  right: 40px;
}

.messages-container {
  margin-bottom: 10px;
}

.messages-wrapper {
  display: flex;
  flex-direction: column;
  padding: 10px;
  
  .message {
    padding: 12px;
    border-radius: 4px;
    max-width: 60%;
    word-wrap: break-word;
    margin-bottom: 5px;
  }

  .my-message {
    align-self: flex-end;
    background-color: #e6f7ff;
  }

  .ai-message {
    align-self: flex-start;
    background-color: #f0f9ff;
  }
}

.dialog-input {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

:deep(.el-scrollbar__wrap) {
  display: flex;
  flex-direction: column;
}
</style>
