<script setup>
import {ref,defineProps} from "vue";
import comment from "./comment/index.vue"
import articleContent from "./articleContent/index.vue"
const props = defineProps({
  articleId: {
    type: Number,
    required: false
  }
});

const data = ref({
  title: '陶瓷艺术的创新之路',
  author: 'CulturalHeritage',
  date: '2024-10-14',
  like: 66,
  isLiked: false,
  Content: [
{
  smaTitle: '陶瓷艺术的创新之路',
  content: '陶瓷艺术作为中国传统文化的重要组成部分，其独特的制作工艺和审美价值深受人们喜爱。从古代的青花瓷到现代的抽象陶艺，陶瓷艺术一直是中国文化的重要载体。在当代，陶瓷艺术家们不断探索新技术和新材料，将传统陶瓷技艺与现代设计理念相融合，创作出具有现代感的作品。这些变革不仅为陶瓷艺术带来了新的生命力，也使得这一传统艺术形式更加贴近现代生活，让更多人能够欣赏和拥有陶瓷艺术作品。'
},
{
  smaTitle: '传统与现代的融合',
  content: '陶瓷艺术的创新之路，是一条既尊重传统又勇于创新的道路。艺术家们在继承传统陶瓷技艺的基础上，不断尝试新的制作方法和技术，如3D打印、新材料的运用等，使得陶瓷作品呈现出前所未有的形态和质感。这些创新不仅丰富了陶瓷艺术的表现形式，也为传统工艺注入了新的活力。同时，这种融合也促进了陶瓷艺术的国际化交流，让更多的国家和地区能够理解和欣赏到中国陶瓷艺术的魅力。'
},
{
  smaTitle: '艺术市场的新宠',
  content: '随着互联网的发展，艺术市场也在蓬勃发展。艺术家们通过网络平台、社交媒体等方式，将自己的作品推向市场，吸引更多的粉丝。在这个过程中，艺术家们也需要不断创新，提升自己的艺术水平。此外，艺术市场对于新兴艺术家来说，提供了一个展示才华和获得认可的平台，使得陶瓷艺术的创作更加多元化和活跃。'
},
{
  smaTitle: '传承与创新的平衡',
  content: '陶瓷艺术的创新之路，是一条既尊重传统又勇于创新的道路。艺术家们在继承传统陶瓷技艺的基础上，不断尝试新的制作方法和技术，如3D打印、新材料的运用等，使得陶瓷作品呈现出前所未有的形态和质感。这些创新不仅丰富了陶瓷艺术的表现形式，也为传统工艺注入了新的活力。在追求创新的同时，艺术家们也意识到保护和传承传统技艺的重要性，努力在创新与传统之间找到平衡点。'
},
{
  smaTitle: '公共艺术的新领域',
  content: '陶瓷艺术不仅仅局限于个人收藏或展览，它也在公共艺术领域展现出新的可能性。艺术家们开始探索如何将陶瓷艺术融入城市空间和公共环境，创作出能够与公众互动的作品。这种趋势不仅为陶瓷艺术提供了更广阔的展示平台，也为城市文化建设增添了新的维度。'
},
{
  smaTitle: '结语',
  content: '在陶瓷艺术的创新过程中，如何平衡传承与创新是一个重要的课题。艺术家们在创新的同时，也注重对传统工艺的保护和传承。通过与现代设计的结合，陶瓷艺术在家居装饰、公共艺术等领域展现出新的活力，为传统技艺的现代传承提供了有益的尝试。未来，我们期待陶瓷艺术能够在更多的领域和层面上实现创新，继续作为中国文化的重要代表，走向世界。'
}],
})
const AddLike = () => {
  if(data.value.isLiked){
    data.value.like--; // 取消关注时减少点赞数
  }else{
    data.value.like++; // 关注时增加点赞数
  }
  data.value.isLiked = !data.value.isLiked; // 切换状态
}
const contents = ref(['这是第一个大标题','这是第二个大标题','这是第三个大标题','这是第四个大标题','这是第五个大标题'])
const judgeContent = ref(true)
const updateContent = () => {
  if(judgeContent.value){
    contents.value = []
  }else{
    contents.value = ['这是第一个大标题','这是第二个大标题','这是第三个大标题','这是第四个大标题','这是第五个大标题']
  }
  judgeContent.value = !judgeContent.value; // 切换状态
}

</script>
<template>
  <div class="layout-container">
    <div style="width: 74%;">
      <el-card class="article-card">
        <h1 class="article-title">{{data.title}}</h1>
        <p class="article-meta">作者: {{data.author}} · {{data.date}}</p>
        <article-content />
      </el-card>
      <comment moment-id="123" post-add-comment-form="[{wq:123},{wq:123},{wq:123}]"/>
    </div>
    <div class="author-container" style="width: 24%;">
      <el-card class="author-card" style="width: 100%;">
        <div class="author-info">
          <img src="https://via.placeholder.com/50" alt="Avatar" class="author-avatar" />
          <div>
            <h3 style="margin-bottom: 5px;">{{data.author}}</h3>
            <p>年度资深创作者</p>
          </div>
        </div>
        <div class="author-stats">
          <div class="author-content">
            <p>8 文章</p>
            <p>10k 阅读</p>
            <p>{{data.like}} 粉丝</p></div>
          <div class="buttons">
            <el-button type="primary" @click="AddLike" style="height: 40px; width: 100px;">{{data.isLiked ? '取消关注' : '关注'}}</el-button>
            <el-button size="large" style="height: 40px; width: 100px;">私信</el-button>
          </div>
        </div>
      </el-card>
      <el-card calss="contents-card" style="margin-top: 30px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h2>目录</h2>
          <div @click="updateContent()" style="cursor: pointer;">
            <p v-if="judgeContent">收起 <el-icon><ArrowUp /></el-icon></p>
            <p v-else>展开 <el-icon><ArrowDown /></el-icon></p>
          </div>
        </div>
        <el-divider style="margin: 16px 0"/>
        <div v-for="(item,index) in contents" :key="index" style="margin-bottom: 16px; margin-left: 5px;">
          <p>{{item    }}</p>
        </div>
      </el-card>
      <el-card calss="contents-card" style="margin-top: 30px;">
        <div>
          <h2>相关文章</h2>
        </div>
        <el-divider style="margin: 16px 0"/>
        <div v-for="(item,index) in contents" :key="index" style="margin-bottom: 16px; margin-left: 5px; cursor: pointer;">
          <h3 style="margin-bottom: 10px; ">这是文章标题</h3>
          <div style="display: flex; color: #666;">
            <p style="margin-right: 16px;">阅读量123 · </p>
            <p>点赞量31</p>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>


<style scoped lang="scss">
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
    .article-content{
      font-size: 16px;
      h3{
        text-align: center;
        font-size: 26px;
        font-weight: 580;
        margin-bottom:8px;
        font-family: '华文新魏', sans-serif;
      }
      p{
        font-size: 17px;
        text-indent: 2em; /* 控制首行缩进两个字符 */
        margin-bottom:18px;
        font-family: '华文中宋', sans-serif;
        letter-spacing: 2px; /* 字母间距 */
      }
    }
  }
  .author-container{
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
        .author-content{
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
    .contents-card{
      margin-top: 30px;
    }
  }

}



</style>
