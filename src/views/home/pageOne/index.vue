<template>
  <div class="background-image">
    <div class="search-box">
      <input
          type="text"
          placeholder="搜索：打开新世界大门"
          class="search-input"
      />
    </div>
    <div class="intro-box">
      <h2>{{currentTitle}}</h2>
      <el-divider />
      <p ref="introText" class="intro-text">
        {{ currentText }}
      </p>
    </div>
    <!-- 添加两个按钮来控制标题的文字内容的更改 -->
    <el-button class="control-button" @click="prevItem"> < </el-button>
    <el-button class="control-button" @click="nextItem"> > </el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

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

/**
 * 控制标题的文字内容的更改
 */
let currentIndex = 0;
const currentTitle = ref(data[currentIndex].title);
const currentText = ref(data[currentIndex].text);
function nextItem() {
  currentIndex = (currentIndex + 1) % data.length;
  currentTitle.value = data[currentIndex].title;
  currentText.value = data[currentIndex].text;
}
function prevItem() {
  currentIndex = (currentIndex - 1 + data.length) % data.length;
  currentTitle.value = data[currentIndex].title;
  currentText.value = data[currentIndex].text;
}



</script>

<style lang="scss" scoped>
.background-image {
  top: 0;
  left: 0;
  width: 100%;
  background-image: url('@/assets/home/bg1.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.8;
  z-index: -1;
  & .search-box {
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    display: flex;
    align-items: center;

    & .search-input {
      width: 580px;
      height: 30px;
      padding: 10px;
      border: 2px solid #ccc;
      border-radius: 10px;
      flex-grow: 1;
      outline: none;
      opacity: 0.8;

      &:focus {
        border-color: #007bff;
        box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
      }
    }
  }

  & .intro-box {
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    width: 600px;
    height: 300px;

    h2 {
      font-size: 36px;
      margin-top: 10px;
      margin-bottom: 20px;
      font-family: '华文新魏', sans-serif;
      text-align: center;
    }

    & .intro-text {
      font-size: 17px;
      text-indent: 2em; // 控制首行缩进两个字符
      padding: 0 10px;
      letter-spacing: 1px;
      line-height: 1.5;
      color: #333;
      font-family: '等线', 'sans-serif';
    }
  }

  & .control-button {
    position: absolute;
    top: 60%;
    transform: translateY(-50%);
    z-index: 1;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #a7a4b1;
    }

    &:first-of-type {
      left: 10px;
    }

    &:last-of-type {
      right: 10px;
    }
  }
}
</style>
