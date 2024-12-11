<script setup>
import { ElMessage } from 'element-plus';
// 导入所需的组件和API
import CharacterAvatar from '@/components/CharacterAvatar.vue';
import {computed, ref, watch, nextTick} from 'vue';
import {aiAudioGetApi, aiChatGetApi, aiImageGetApi} from "@/api/common/ai/ai.js";

// 初始化聊天消息数组，包含AI的欢迎语
const messages = ref([
  { text: '你好，我是非遗文化遗产网站的客服小姐姐，有什么可以帮助您？', self: false , type: 'text' },
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
// const responseMessage = async() => {
//   try {
//     if(typeIndex.value === 1){
//       const data = await aiChatGetApi(inputMessage.value, 1);
//       messages.value.push({ text: data.data, self: false, type: 'text' });
//     } else if(typeIndex.value === 2){
//       const data = await aiImageGetApi(inputMessage.value);
//       messages.value.push({ text: data.data, self: false, type: 'image' });
//     } else if(typeIndex.value === 3){
//       const data = await aiAudioGetApi(inputMessage.value);
//       messages.value.push({ text: data.data, self: false, type: 'audio' });
//     }
//   } catch (error) {
//     ElMessage.error('消息发送失败，请稍后再试。');
//     console.error(error); // 记录错误信息
//   }
//
// }

const responseMessage = async() => {
  try {
    const userMessage = inputMessage.value.toLowerCase(); // 将用户输入的消息转换为小写

    // 自定义回复逻辑
    if (userMessage.includes('你好')) {
       setTimeout(() => {
         messages.value.push({ text: '你好！很高兴见到你。', self: false, type: 'text' });
       }, 1000)
    } else if (userMessage.includes('帮助')) {
      setTimeout(() => {
        messages.value.push({ text: '当然可以！请告诉我你需要什么帮助。', self: false, type: 'text' });
      },1000)
    } else if(userMessage.includes('这个网址有什么功能')){
      setTimeout(() => {
        messages.value.push({ text: '这个网站主要提供非遗文化遗产的查询、收藏、分享,非遗全景图以及论坛交流等功能。', self: false, type: 'text' });
      },1000)
    }
  } catch (error) {
    ElMessage.error('消息发送失败，请稍后再试。');
    console.error(error); // 记录错误信息
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
  messages.value.push({ text: trimmedMessage, self: true , type: 'text' });

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
