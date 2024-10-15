<script setup>
import CharacterAvatar from '@/components/CharacterAvatar.vue';
import {ref} from 'vue';

const messages = ref([]);
const inputMessage = ref('');
const dialogVisible = ref(false);
const sendAIMessage = async () => {
  const aiResponse = `AI 回复：${inputMessage.value}`;
  messages.value.push({text: aiResponse, self: false});
  inputMessage.value = '';
};
const sendMessage = () => {
  if (inputMessage.value.trim() === '') return;
  messages.value.push({text: inputMessage.value, self: true});
  inputMessage.value = '';
};
</script>

<template>
  <router-view/>
  <CharacterAvatar @open-dialog="dialogVisible = true" />
  <el-dialog
      title="快来找我问一些跟非遗相关的问题吧！"
      v-model="dialogVisible"
      width="50%"

  >
    <div class="messages-container">
      <div v-for="message in messages" :key="message.id"
           class="message"
           :class="{ 'my-message': message.self, 'ai-message': !message.self }">
        {{ message.text }}
      </div>
    </div>
    <div class="dialog-input">
      <el-input
          v-model="inputMessage"
          placeholder="请输入消息"
          @keyup.enter="sendMessage"
      />
      <el-button @click="sendMessage">发送</el-button>
      <el-button @click="sendAIMessage">AI回复</el-button>
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
  margin-bottom: 10px;
  .message {
    padding: 8px;
    border-radius: 4px;
    max-width: 60%;
    word-wrap: break-word;
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
  align-items: center;
  margin-top: 10px;
}
</style>
