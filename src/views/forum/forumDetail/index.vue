<script setup>
import { ref } from "vue";
import comment from "./comment/index.vue"
import articleContent from '@/components/articleContent.vue'

// 定义反应式数据，用于存储文章信息以及目录内容
const data = ref({
  title: '陶瓷艺术的创新之路',
  author: 'CulturalHeritage',
  date: '2024-10-14',
  like: 66,
  isLiked: false,
});

const contents = ref(['这是第一个大标题', '这是第二个大标题', '这是第三个大标题', '这是第四个大标题', '这是第五个大标题']);
const judgeContent = ref(true);

// 点赞功能的方法
const AddLike = () => {
  try {
    data.value.isLiked ? data.value.like-- : data.value.like++;
    data.value.isLiked = !data.value.isLiked; // 切换状态
  } catch (error) {
    console.error("点赞操作失败:", error);
    alert("点赞操作失败，请重试。");
  }
};

// 更新目录内容的方法
const updateContent = () => {
  try {
    judgeContent.value ? contents.value = [] : contents.value = [...contents.value];
    judgeContent.value = !judgeContent.value; // 切换状态
  } catch (error) {
    console.error("更新目录内容失败:", error);
    alert("更新目录内容失败，请重试。");
  }
};

</script>

<template>
  <div class="layout-container">
    <div style="width: 74%;">
      <el-card class="article-card">
        <h1 class="article-title">{{ data.title }}</h1>
        <p class="article-meta">作者: {{ data.author }} · {{ data.date }}</p>
        <articleContent />
      </el-card>
      <comment moment-id="123" post-add-comment-form="[{wq:123},{wq:123},{wq:123}]"/>
    </div>
    <div class="author-container" style="width: 24%;">
      <el-card class="author-card" style="width: 100%;">
        <div class="author-info">
          <img src="https://via.placeholder.com/50" alt="Avatar" class="author-avatar"/>
          <div>
            <h3 style="margin-bottom: 5px;">{{ data.author }}</h3>
            <p>年度资深创作者</p>
          </div>
        </div>
        <div class="author-stats">
          <div class="author-content">
            <p>8 文章</p>
            <p>10k 阅读</p>
            <p>{{ data.like }} 粉丝</p>
          </div>
          <div class="buttons">
            <el-button type="primary" @click="AddLike" style="height: 40px; width: 120px;">
              {{ data.isLiked ? '取消关注' : '关注' }}
            </el-button>
            <el-button size="large" style="height: 40px; width: 120px;">私信</el-button>
          </div>
        </div>
      </el-card>
      <el-card class="contents-card" style="margin-top: 30px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h2>目录</h2>
          <div @click="updateContent()" style="cursor: pointer;">
            <p>{{ judgeContent ? '收起' : '展开' }}
              <el-icon>
                <component :is="judgeContent ? 'ArrowUp' : 'ArrowDown'"/>
              </el-icon>
            </p>
          </div>
        </div>
        <el-divider style="margin: 16px 0"/>
        <div v-for="(item, index) in contents" :key="index" style="margin-bottom: 16px; margin-left: 5px;">
          <p>{{ item }}</p>
        </div>
      </el-card>
      <el-card class="contents-card" style="margin-top: 30px;">
        <div>
          <h2>相关文章</h2>
        </div>
        <el-divider style="margin: 16px 0"/>
        <div v-for="(item, index) in 5" :key="index" style="margin-bottom: 16px; margin-left: 5px; cursor: pointer;">
          <h3 style="margin-bottom: 10px;">这是文章标题</h3>
          <div style="display: flex; color: #666;">
            <p style="margin-right: 16px;">阅读量123 · </p>
            <p>点赞量31</p>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout-container {
  display: flex;
  padding: 0 100px;
  justify-content: space-between;
  margin-top: 30px;

  .article-card {
    .article-title {
      justify-content: center;
      display: flex;
      font-size: 24px;
      font-weight: bold;
    }
    .article-meta {
      justify-content: center;
      display: flex;
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }

  .author-container {
    .author-card {
      height: 200px;
      .author-info {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .author-avatar {
          border-radius: 50%;
          margin-right: 12px;
        }
        h3 {
          margin: 0;
          font-size: 18px;
        }
        p {
          color: #666;
        }
      }
      .author-stats {
        .author-content {
          display: flex;
          justify-content: space-between;
          font-size: 16px;
        }
        p {
          margin: 5px 0;
          font-weight: bold;
        }
        .buttons {
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
        }
      }
    }
    .contents-card {
      margin-top: 30px;
    }
  }
}
</style>
