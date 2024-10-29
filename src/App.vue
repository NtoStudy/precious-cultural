<script setup>
import CharacterAvatar from '@/components/CharacterAvatar.vue';
import { ref } from 'vue';

const messages = ref([]);
const inputMessage = ref('');
const dialogVisible = ref(false);

// 预定义问答对
const QAS = {
  '该网站有哪些功能？': '网站功能包括：1. 非遗文化遗产的介绍；2. 在线使用vr虚拟体验展厅和；3. 非遗文献分享；4. 论坛讨论非遗相关内容；5. 介绍团队。',
  '我想了解非遗文化遗产，应该去哪个页面？': '您可以到“文化遗产”页面了解。',
  '好的谢谢你': '不客气，有什么问题都可以随时联系我们！',
};

const sendMessage = () => {
  const trimmedMessage = inputMessage.value.trim();
  if (trimmedMessage === '') return; // 输入为空直接返回

  // 添加用户消息
  messages.value.push({ text: trimmedMessage, self: true });

  // 检查是否有预定义的回复
  if (QAS[trimmedMessage]) {
    setTimeout(() => {
      messages.value.push({ text: QAS[trimmedMessage], self: false });
    }, 200);
  } else {
    // 处理未知问题
    setTimeout(() => {
      messages.value.push({ text: '抱歉，我不太明白您的问题，请您换个问法。', self: false });
    }, 200);
  }

  inputMessage.value = ''; // 清空输入框
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
      <div v-for="(message, index) in messages" :key="index"
           class="message"
           :class="{ 'my-message': message.self, 'ai-message': !message.self }">
        {{ message.text }}
      </div>
    </div>
    <div class="dialog-input">
      <el-input
          v-model="inputMessage"
          placeholder="请输入你的问题"
          @keyup.enter="sendMessage"
      />
      <el-button @click="sendMessage">发送</el-button>
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
  align-items: center;
  margin-top: 10px;
}
</style>
