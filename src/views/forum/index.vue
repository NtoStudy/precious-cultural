<script setup>
import {ref} from 'vue';
import Pagination from "@/components/Pagination.vue";
const articles = ref([
  {
    id: 1,
    image: 'https://via.placeholder.com/150',
    title: '标题',
    content: '内容  在科研的道路上，研究生们常常面临着巨大的压力和挑战。为了给这个充满挑战的群体带来一些鼓励和温暖，我借助百度文心智能体平台开发了一个独特的智能体《萌猫科研加油喵》。',
    liked: false,
    category:'传承',
    likeNumber:'0',
    author: 'smileNicky'
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/150',
    title: '萌猫科研加油喵',
    content: '在科研的道路上，研究生们常常面临着巨大的压力和挑战。为了给这个充满挑战的群体带来一些鼓励和温暖，我借助百度文心智能体平台开发了一个独特的智能体《萌猫科研加油喵》。',
    liked: false,
    author: 'smileNicky'
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/150',
    title: '萌猫科研加油喵',
    content: '在科研的道路上，研究生们常常面临着巨大的压力和挑战。为了给这个充满挑战的群体带来一些鼓励和温暖，我借助百度文心智能体平台开发了一个独特的智能体《萌猫科研加油喵》。',
    liked: false,
    author: 'smileNicky'
  },
]);

function likeArticle(article) {
  article.liked = !article.liked;
}

const activeIndex = ref('1');
</script>
<template>

  <div class="article-list-container">
    <div class="article-left">
      <el-menu
          mode="vertical"
          :default-active="activeIndex"
          class="image-navigation"
          background-color="#fff"
          text-color="##3f7ef7"
      >
        <el-menu-item index="1">一</el-menu-item>
        <el-menu-item index="2">二</el-menu-item>
        <el-menu-item index="3">三</el-menu-item>
        <el-menu-item index="4">四</el-menu-item>
        <el-menu-item index="5">五</el-menu-item>
        <el-menu-item index="6">六</el-menu-item>
      </el-menu>
    </div>
    <div class="article-right">
      <el-row :gutter="20" justify="center">
        <el-col :span="22">
          <el-card v-for="article in articles" :key="article.id" class="article-card">
            <div class="article-content">
              <img :src="article.image" alt="Article Image" class="article-image">
              <div class="article-info">
                <h2 class="article-title">{{ article.title }}</h2>
                <p class="article-content">{{ article.content }}</p>
                <div class="article-actions">
                  <el-button type="primary" @click="likeArticle(article)" :icon="article.liked ? 'el-icon-like-filled' : 'el-icon-like'">{{ article.liked ? '已赞' : '点赞' }}</el-button>
                  <span class="article-author">作者: {{ article.author }}</span>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <Pagination/>
    </div>
  </div>
</template>



<style scoped lang="scss">
.article-list-container {
  max-width: 1200px;
  display: flex;
  margin: auto;
  padding: 20px;
  .article-left{
    margin: 20px 0;
    width: 20%;
    .image-navigation .el-menu-item {
      transition: background-color 0.3s, color 0.3s; /* 平滑过渡效果 */
    }

    .image-navigation .el-menu-item:hover {
      background-color: #f5f5f5; /* 悬停时的背景颜色 */
      color: #3f7ef7; /* 悬停时的文字颜色 */
    }
    .image-navigation .el-menu-item.is-active {
      background-color: #ebf2fe; /* 激活项的背景颜色 */
    }
    /* 如果你想要悬停效果也改变图标的颜色，可以添加以下样式 */
    .image-navigation .el-menu-item:hover i {
      color: #3f7ef7; /* 悬停时的图标颜色 */
    }
  }
  .article-right {
    .article-card {
      display: flex;
      align-items: center;
      margin: 20px 0;

      .article-content {

        display: flex;

        .article-image {
          width: 200px;
          height: 150px;
          object-fit: cover;
          margin-right: 20px;
        }

        .article-info {
          position: relative;
          flex: 1;
          .article-title {
            margin: 10px 0;
          }

          .article-content {
            margin-bottom: 10px;

          }
          .article-actions {
            display: flex;
            align-items: center;
            position: absolute;
            justify-content: space-between;
            bottom: 0;
            left: 0; /* 定位到左边界 */
            right: 0; /* 定位到右边界 */
            .article-author {
              margin-left: 10px;
            }
          }
        }
      }
    }
  }

}

</style>
