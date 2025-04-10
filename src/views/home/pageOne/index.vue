<template>
  <div class="background-image">
    <!-- 搜索框 -->
    <div class="search-box">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="搜索：打开新世界大门"
        class="search-input"
        @keyup.enter="handleSearch"
      />
      <el-button class="search-button" type="primary" @click="handleSearch">
        <el-icon><Search /></el-icon>
      </el-button>
    </div>

    <!-- 内容展示框 -->
    <div class="intro-box">
      <h2>{{ currentTitle }}</h2>
      <el-divider />
      <p ref="introText" class="intro-text">
        {{ currentText }}
      </p>
    </div>

    <!-- 控制按钮 -->
    <el-button class="control-button prev-button" @click="prevItem">
      <el-icon><ArrowLeft /></el-icon>
    </el-button>
    <el-button class="control-button next-button" @click="nextItem">
      <el-icon><ArrowRight /></el-icon>
    </el-button>

    <!-- 统计数据 -->
    <div class="footer">
      <div class="stat-item">
        <el-icon><User /></el-icon>
        活跃用户：<span ref="userCount"></span>
      </div>
      <div class="stat-item">
        <el-icon><View /></el-icon>
        访问量：<span ref="writeCount"></span>
      </div>
      <div class="stat-item">
        <el-icon><Document /></el-icon>
        帖子发布量：<span ref="viewCount"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
// 导入Vue的功能和计数库
import { onMounted, ref,  onUnmounted } from 'vue';
import { CountUp } from "countup.js";
import { Search, ArrowLeft, ArrowRight, User, View, Document } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const searchQuery = ref('');

// 处理搜索
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    console.log('1233')
  }
};

// 标题和文字数据
const data = [
  {
    title: '传统艺术的现代复兴',
    text: '岩彩画，一种以矿物颜料为主要材料、具有悠久历史的中国传统绘画艺术形式，曾在唐代达到鼎盛。它以其丰富的色彩、独特的技法和多样的形式，展现了极高的艺术价值。尽管在元代以后逐渐边缘化，但近现代以来，岩彩画再次受到重视并逐渐复兴。通过艺术家们的探索和创新，岩彩画不仅传承了中华优秀传统文化，还为人们提供了宝贵的审美享受，成为传统艺术在现代社会中璀璨夺目的瑰宝。'
  },
  {
    title: '山水画的自然之美',
    text: '中国山水画，以自然景观为主要描绘对象，强调意境与气韵，追求与自然的和谐共生。山水画家通过笔墨的运用，表现山川的雄伟与细腻，水的流动与静谧，展现了中国传统文化中对自然的敬畏与热爱。在现代，山水画依然受到人们的喜爱，成为连接人与自然的精神桥梁。'
  },
  {
    title: '书法艺术的韵律之美',
    text: '中国书法，以其独特的书写工具和笔墨技巧，展现了文字的韵律美和节奏感。书法艺术家通过不同的字体和风格，如行书、草书、楷书等，传达了文字的内涵和情感。书法不仅是书写艺术，更是修身养性的方式。在现代社会，书法艺术依然被人们珍视，是传承中华文化的重要载体。'
  },
  {
    title: '陶瓷艺术的火与土之歌',
    text: '中国陶瓷艺术，以其精湛的工艺和多样的装饰手法，展现了火与土的完美结合。从古代的青花瓷到现代的现代陶艺，陶瓷艺术家们不断探索材料和技术的边界，创作出既有传统韵味又具有现代感的作品。陶瓷艺术不仅是生活用品，更是艺术品，体现了人们对美的追求和生活的热爱。'
  }
];

// 控制标题的文字内容的更改
let currentIndex = 0;
const currentTitle = ref(data[currentIndex].title);
const currentText = ref(data[currentIndex].text);

// 添加自动轮播功能
let autoPlayInterval = null;
const autoPlayDuration = 5000; // 5秒切换一次

const startAutoPlay = () => {
  autoPlayInterval = setInterval(() => {
    nextItem();
  }, autoPlayDuration);
};

const stopAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
  }
};

// 更新当前标题和文本内容
function updateContent() {
  currentTitle.value = data[currentIndex]?.title || '未知标题';
  currentText.value = data[currentIndex]?.text || '未知内容';
}

// 显示下一个内容项
function nextItem() {
  currentIndex = (currentIndex + 1) % data.length;
  updateContent();
}

// 显示上一个内容项
function prevItem() {
  currentIndex = (currentIndex - 1 + data.length) % data.length;
  updateContent();
}

// 用于引用用户计数、写作计数和查看计数的响应式变量
const userCount = ref();
const writeCount = ref();
const viewCount = ref();

// 组件挂载后初始化计数动画和自动轮播
onMounted(() => {
  try {
    // 初始化计数动画
    new CountUp(userCount.value, 13212).start();
    new CountUp(writeCount.value, 12312).start();
    new CountUp(viewCount.value, 52331231).start();

    // 启动自动轮播
    startAutoPlay();
  } catch (error) {
    console.error('初始化失败:', error);
  }
});

// 组件卸载前清除自动轮播
onUnmounted(() => {
  stopAutoPlay();
});
</script>

<style lang="scss" scoped>
.background-image {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/home/bg1.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.8;
  display: flex;
  flex-direction: column;
  align-items: center;

  .search-box {
    position: absolute;
    top: 16%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    display: flex;
    align-items: center;
    width: 600px;

    .search-input {
      width: 100%;
      height: 30px;
      padding: 10px 15px;
      border: 2px solid #ccc;
      border-radius: 10px 0 0 10px;
      flex-grow: 1;
      outline: none;
      opacity: 0.8;
      font-size: 16px;

      &:focus {
        border-color: #007bff;
        box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
      }
    }

    .search-button {
      height: 54px;
      border-radius: 0 10px 10px 0;
      margin-left: -1px;
    }
  }

  .intro-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 15px;
    width: 600px;
    height: 300px;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.8);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    }

    h2 {
      font-size: 36px;
      margin: 10px 0 20px;
      font-family: '华文新魏', sans-serif;
      text-align: center;
      color: #333;
    }

    .intro-text {
      font-size: 17px;
      text-indent: 2em;
      padding: 0 10px;
      letter-spacing: 1px;
      line-height: 1.6;
      color: #333;
      font-family: '等线', 'sans-serif';
      max-height: 200px;
      overflow-y: auto;
    }
  }

  .control-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    padding: 15px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    background-color: rgba(255, 255, 255, 0.6);

    &:hover {
      background-color: rgba(255, 255, 255, 0.9);
      transform: translateY(-50%) scale(1.1);
    }

    &.prev-button {
      left: 20px;
    }

    &.next-button {
      right: 20px;
    }
  }

  .footer {
    position: absolute;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-around;
    width: 80%;
    background-color: rgba(255, 255, 255, 0.7);
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    .stat-item {
      display: flex;
      align-items: center;
      font-size: 18px;
      color: #333;

      .el-icon {
        margin-right: 8px;
        font-size: 20px;
        color: #409EFF;
      }
    }
  }
}

</style>
