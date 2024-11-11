<script setup>
import CharacterAvatar from '@/components/CharacterAvatar.vue';
import {computed, ref} from 'vue';
import {aiAudioGetApi, aiChatGetApi, aiImageGetApi} from "@/api/common/ai/ai.js";

const messages = ref([
  { text: '你好，我是非遗文化遗产网站的客服小姐姐，有什么可以帮助您？', self: false },
]);
const inputMessage = ref('');
const dialogVisible = ref(false);
const typeIndex = ref(1)

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
    const data = await aiChatGetApi( inputMessage.value,1)
    console.log(data)
    messages.value.push({ text: data.data, self: false });
  }else if(typeIndex.value === 2){
    const data = await aiImageGetApi( inputMessage.value )
    console.log(data)
    messages.value.push({ text: data.data, self: false });
  }else if(typeIndex.value === 3){
    const data = await aiAudioGetApi( inputMessage.value )
    console.log(data)
    messages.value.push({ text: data.data, self: false });
  }
}

const sendMessage = () => {
  const trimmedMessage = inputMessage.value.trim();
  if (trimmedMessage === '') return; // 输入为空直接返回

  // 添加用户消息
  messages.value.push({ text: trimmedMessage, self: true });

  responseMessage()
  // 发送消息
  inputMessage.value = ''; // 清空输入框
};
</script>

<template>
  <router-view/>
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
    <div class="messages-container">
      <div v-for="(message, index) in messages" :key="index"
           class="message"
           :class="{ 'my-message': message.self, 'ai-message': !message.self }">
        {{ message.text }}
      </div>
    </div>
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
  display: flex;
  flex-direction: column;
  height: 300px;
  margin-bottom: 10px;
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
</style>
