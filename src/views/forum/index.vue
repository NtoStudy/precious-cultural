<script setup>
import {computed, ref} from 'vue';

import jiyi1 from '@/assets/lt/jiyi/1.webp';
import jiyi2 from '@/assets/lt/jiyi/2.webp';
import jiyi3 from '@/assets/lt/jiyi/3.png';
import jiyi4 from '@/assets/lt/jiyi/4.jpg';
import minsu1 from '@/assets/lt/minsu/1.jpg';
import minsu2 from '@/assets/lt/minsu/2.webp';
import minsu3 from '@/assets/lt/minsu/3.webp';
import minsu4 from '@/assets/lt/minsu/4.webp';
import xijv1 from '@/assets/lt/xijv/1.webp';
import xijv2 from '@/assets/lt/xijv/2.webp';
import xijv3 from '@/assets/lt/xijv/3.webp';
import xijv4 from '@/assets/lt/xijv/4.webp';
import wudao1 from '@/assets/lt/wudao/1.webp';
import wudao2 from '@/assets/lt/wudao/2.webp';
import wudao3 from '@/assets/lt/wudao/3.webp';
import wudao4 from '@/assets/lt/wudao/4.webp';
import quyi1 from '@/assets/lt/quyi/1.webp';
import quyi2 from '@/assets/lt/quyi/2.webp';
import quyi3 from '@/assets/lt/quyi/3.webp';
import quyi4 from '@/assets/lt/quyi/4.webp';

const articles = ref([
  {
    id: 1,
    image: jiyi1,
    title: '非遗论坛聚焦：保护、传承与创新',
    content: '随着人工智能技术的飞速发展，它在各个领域的应用越来越广泛。在本次论坛中，专家们围绕人工智能的未来发展进行了深入的讨论。他们探讨了AI在医疗、教育、交通等领域的潜在影响，以及如何确保技术的伦理和安全。此外，还讨论了人工智能可能带来的社会变革和就业问题。',
    liked: false,
    category: '传统技艺',
    likeNumber: 23,
    author: 'CulturalHeritage'
  },
  {
    id: 2,
    image: jiyi2,
    title: '传统技艺的现代传承：刺绣艺术',
    content: '刺绣艺术作为中国传统技艺之一，历史悠久，技艺精湛。在现代社会，刺绣不仅是一种文化遗产，更是一种生活艺术。现代设计师将传统刺绣技艺与现代时尚元素相结合，创作出既具有传统韵味又符合现代审美的作品。这种融合不仅让传统技艺焕发新生，也为刺绣艺术的传承与发展开辟了新的道路。',
    liked: false,
    category: '传统技艺',
    likeNumber: 16,
    author: 'CulturalHeritage'
  },
  {
    id: 3,
    image: jiyi3,
    title: '陶瓷艺术的创新之路',
    content: '陶瓷艺术是中国传统文化的重要组成部分，其独特的制作工艺和审美价值深受人们喜爱。在当代，陶瓷艺术家们不断探索新技术和新材料，将传统陶瓷技艺与现代设计理念相融合，创作出具有现代感的作品。这些作品不仅在国内外艺术市场上受到追捧，也为传统陶瓷艺术的传承与创新提供了新的思路。',
    liked: false,
    category: '传统技艺',
    likeNumber: 41,
    author: 'CulturalHeritage'
  },
  {
    id: 4,
    image: jiyi4,
    title: '传统木雕艺术的保护与发展',
    content: '木雕艺术是中国的传统手工艺术，以其精美的雕刻技艺和深厚的文化内涵著称。面对现代化的挑战，木雕艺术家们致力于保护和传承这一传统技艺，同时也在探索新的表现形式和应用领域。通过与现代设计的结合，木雕艺术在家居装饰、公共艺术等领域展现出新的活力，为传统技艺的现代传承提供了有益的尝试。',
    liked: false,
    category: '传统技艺',
    likeNumber: 34,
    author: 'CulturalHeritage'
  },
  {
    id: 5,
    image: minsu1,
    title: '民俗文化节庆：春节的传承与创新',
    content: '春节作为中国最重要的民俗节日之一，承载了丰富的文化传统和家庭团聚的意义。随着时代的变迁，庆祝春节的方式也在不断地发展和创新。从传统的放鞭炮、贴春联到现代的网络拜年、电子红包，春节的庆祝形式更加多样化。这些新的庆祝方式不仅让春节的传统得以延续，也为年轻一代提供了新的参与和体验机会。',
    liked: false,
    category: '民俗',
    likeNumber: 42,
    author: 'FolkloreNicky'
  },
  {
    id: 6,
    image: minsu2,
    title: '民俗艺术的现代表达：剪纸的新生命',
    content: '剪纸是中国传统的民俗艺术形式，具有深厚的文化底蕴和艺术价值。在当代，剪纸艺术家们通过创新的设计理念和技巧，将传统剪纸艺术带入现代生活。现代剪纸作品不仅在艺术展览中展出，也被广泛应用于室内装饰、时尚设计等领域。这种传统与现代的结合，为剪纸艺术的发展注入了新的活力。',
    liked: false,
    category: '民俗',
    likeNumber: 23,
    author: 'FolkloreNicky'
  },
  {
    id: 7,
    image: minsu3,
    title: '民俗节日的保护：端午节的文化意义',
    content: '端午节作为中国的重要民俗节日，有着悠久的历史和丰富的文化内涵。它不仅是纪念屈原的日子，也是家人团聚、驱邪避疫的重要时刻。在现代社会，端午节的传统习俗如赛龙舟、吃粽子、挂艾草等仍然被广泛传承。同时，通过各种文化活动和教育项目，端午节的文化意义得到了更广泛的传播和认识。',
    liked: false,
    category: '民俗',
    likeNumber: 29,
    author: 'FolkloreNicky'
  },
  {
    id: 8,
    image: minsu4,
    title: '民俗信仰与现代社会：庙会的变迁',
    content: '庙会作为中国传统的民俗活动，是民间信仰、商贸交流和文化娱乐的重要场所。随着城市化的发展，庙会的形式和内容也在发生变化。现代庙会不仅保留了传统的宗教仪式和文化表演，也融入了更多的现代元素，如美食节、手工艺品市集等。这些变化使得庙会活动更加丰富多彩，也吸引了更多年轻人的参与。',
    liked: false,
    category: '民俗',
    likeNumber: 52,
    author: 'FolkloreNicky'
  },
  {
    id: 9,
    image: xijv1,
    title: '京剧的现代转型',
    content: '京剧作为中国传统戏剧的代表，近年来在舞台设计、服装造型以及表演风格上进行了大胆的创新。现代京剧在保留传统精髓的同时，融入了现代元素，吸引了更多年轻观众的关注。',
    liked: false,
    category: '传统戏剧',
    likeNumber: 13,
    author: 'DramaHeritage'
  },
  {
    id: 10,
    image: xijv2,
    title: '越剧的文化传承',
    content: '越剧以其婉转的唱腔和细腻的表演风格深受江南地区人民的喜爱。现代越剧在继承传统的基础上，尝试与现代戏剧理念相结合，推出了一系列反映现代生活题材的新剧目。',
    liked: false,
    category: '传统戏剧',
    likeNumber: 28,
    author: 'DramaHeritage'
  },
  {
    id: 11,
    image: xijv3,
    title: '黄梅戏的创新发展',
    content: '黄梅戏起源于安徽，以其明快的曲调和朴实的表演风格著称。现代黄梅戏在传承中不断创新，尝试将现代音乐、舞蹈等元素融入传统剧目，使之更加丰富多彩。',
    liked: false,
    category: '传统戏剧',
    likeNumber: 42,
    author: 'DramaHeritage'
  },
  {
    id: 12,
    image: xijv4,
    title: '川剧的变脸艺术',
    content: '川剧变脸是中国传统戏剧中的一项独特技艺，通过快速变换面具来展现角色的内心变化。现代川剧在保持这一传统技艺的同时，也在剧情和表演形式上进行了创新，使之更加吸引现代观众。',
    liked: false,
    category: '传统戏剧',
    likeNumber: 38,
    author: 'DramaHeritage'
  },
  {
    id: 13,
    image: wudao1,
    title: '藏族舞蹈的现代演绎',
    content: '藏族舞蹈以其独特的舞步和深厚的文化内涵著称。现代藏族舞蹈在保留传统风格的基础上，融入了现代舞蹈技巧，展现了更加丰富多彩的艺术形象。',
    liked: false,
    category: '传统舞蹈',
    likeNumber: 34,
    author: 'DanceHeritage'
  },
  {
    id: 14,
    image: wudao2,
    title: '蒙古舞蹈的传承与创新',
    content: '蒙古舞蹈以其雄浑的气势和粗犷的动作风格闻名。现代蒙古舞蹈在继承传统的基础上，尝试与现代舞蹈融合，创作出一系列展现现代蒙古族人民生活和情感的新作品。',
    liked: false,
    category: '传统舞蹈',
    likeNumber: 26,
    author: 'DanceHeritage'
  },
  {
    id: 15,
    image: wudao3,
    title: '傣族舞蹈的优雅风姿',
    content: '傣族舞蹈以其柔美的舞姿和优雅的身段著称。现代傣族舞蹈在保持传统韵味的同时，引入现代舞蹈编排手法，使舞蹈更加生动和富有表现力。',
    liked: false,
    category: '传统舞蹈',
    likeNumber: 19,
    author: 'DanceHeritage'
  },
  {
    id: 16,
    image: wudao4,
    title: '维吾尔族舞蹈的热情奔放',
    content: '维吾尔族舞蹈以其热情奔放和快速旋转的动作而受到人们的喜爱。现代维吾尔族舞蹈在传承中不断创新，结合现代音乐和舞蹈元素，展现出更加活力四射的舞蹈风格。',
    liked: false,
    category: '传统舞蹈',
    likeNumber: 28,
    author: 'DanceHeritage'
  },
  {
    id: 17,
    image: quyi1,
    title: '相声的新时代',
    content: '相声作为中国传统曲艺的一种，以其幽默诙谐和讽刺时弊的特点深受人们喜爱。现代相声在继承传统的基础上，尝试与现代喜剧元素相结合，创作出一系列反映现代生活题材的新作品。',
    liked: false,
    category: '曲艺',
    likeNumber: 52,
    author: 'QuYiHeritage'
  },
  {
    id: 18,
    image: quyi2,
    title: '评书的艺术魅力',
    content: '评书是一种传统的口头表演艺术，通过讲述历史故事和民间传说来吸引听众。现代评书在保持传统讲述方式的同时，尝试加入现代音效和视觉元素，使表演更加生动有趣。',
    liked: false,
    category: '曲艺',
    likeNumber: 34,
    author: 'QuYiHeritage'
  },
  {
    id: 19,
    image: quyi3,
    title: '快板的快节奏',
    content: '快板是一种以快速击打竹板为节奏的曲艺形式，以其明快的节奏和活泼的表演风格受到欢迎。现代快板在传承中不断创新，结合现代音乐和舞蹈元素，展现出更加活力四射的表演风格。',
    liked: false,
    category: '曲艺',
    likeNumber: 21,
    author: 'QuYiHeritage'
  },
  {
    id: 20,
    image: quyi4,
    title: '大鼓书的深沉韵味',
    content: '大鼓书是一种以大鼓伴奏的曲艺形式，以其深沉的唱腔和丰富的表现力著称。现代大鼓书在继承传统的基础上，尝试与现代音乐元素相结合，创作出一系列展现现代生活和情感的新作品。',
    liked: false,
    category: '曲艺',
    likeNumber: 27,
    author: 'QuYiHeritage'
  }
]);

// 点赞按钮。
function likeArticle(article) {
  article.liked = !article.liked;
  if (article.liked === false) {
    article.likeNumber--
  } else {
    article.likeNumber++
  }
}

// 当前在第几个分类
const activeIndex = ref('1');

// 增加一个方法来处理菜单项的点击事件
function handleMenuClick(index) {
  activeIndex.value = index;
}

const forumLabelGetData = ref([])
// 文章列表分类
const getForumLabel = async () => {
  const res = await forumLabelGetApi()
  forumLabelGetData.value = res.data.data
}
getForumLabel()

// 根据分类过滤文章
const filteredArticles = computed(() => {
  switch (activeIndex.value) {
    case '1':
      return articles.value.filter(article => article.category === '传统技艺');
    case '2':
      return articles.value.filter(article => article.category === '民俗');
    case '3':
      return articles.value.filter(article => article.category === '传统戏剧');
    case '4':
      return articles.value.filter(article => article.category === '传统舞蹈');
    case '5':
      return articles.value.filter(article => article.category === '曲艺');
    case '6':
      return articles.value.filter(article => article.category === '传统体育');
    case '7':
      return articles.value.filter(article => article.category === '传统美术');
    case '8':
      return articles.value.filter(article => article.category === '传统技艺');
    case '9':
      return articles.value.filter(article => article.category === '传统医药');
    case '10':
      return articles.value.filter(article => article.category === '民俗');
    default:
      return articles.value;
  }
});

// 分页器相关
// 当前页码
const currentPage = ref(1);
// 每页显示的文章数量
const pageSize = ref(6);

// 总文章数量
function handlePageChange(newPage) {
  currentPage.value = newPage;
}

// 处理点击事件并跳转到文章详情页
import router from "@/router/index.js";
import {forumLabelGetApi} from "@/api/forum/label.js";

const goToArticleDetail = (article, event) => {
  event.stopPropagation(); // 阻止事件冒泡
  // 跳转到文章详情页
  router.push(`/menu/forum/forumDetail/${article.id}`)
}


</script>
<template>

  <div class="article-list-container">
    <div class="article-container">
      <div class="article-left">
        <el-menu
            mode="vertical"
            :default-active="activeIndex"
            class="image-navigation"
            background-color="#fff"
            text-color="#3f7ef7"
        >
          <el-menu-item index="1" @click="handleMenuClick('1')">民间文学</el-menu-item>
          <el-menu-item index="2" @click="handleMenuClick('2')">传统音乐</el-menu-item>
          <el-menu-item index="3" @click="handleMenuClick('3')">传统舞蹈</el-menu-item>
          <el-menu-item index="4" @click="handleMenuClick('4')">传统戏剧</el-menu-item>
          <el-menu-item index="5" @click="handleMenuClick('5')">曲艺</el-menu-item>
          <el-menu-item index="6" @click="handleMenuClick('6')">传统体育</el-menu-item>
          <el-menu-item index="7" @click="handleMenuClick('7')">传统美术</el-menu-item>
          <el-menu-item index="8" @click="handleMenuClick('8')">传统技艺</el-menu-item>
          <el-menu-item index="9" @click="handleMenuClick('9')">传统医药</el-menu-item>
          <el-menu-item index="10" @click="handleMenuClick('10')">民俗</el-menu-item>
        </el-menu>
      </div>
      <div class="article-right">
        <el-row :gutter="20" justify="center">
          <el-col :span="22">
            <el-card v-for="article in filteredArticles"
                     :key="article.id"
                     @click="goToArticleDetail(article, $event)"
                     class="article-card"
            >
              <div class="article-content">
                <img :src="article.image" alt="Article Image" class="article-image">
                <div class="article-info">
                  <h2 class="article-title">{{ article.title }}</h2>
                  <p class="article-content">{{ article.content }}</p>
                  <div class="article-actions">
                    <el-button
                        type="primary"
                        :class="{'liked': article.liked, 'unliked': !article.liked}"
                        @click.stop="likeArticle(article)"
                    >
                      {{ article.liked ? '已赞' : '点赞' }} {{ article.likeNumber }}
                    </el-button>
                    <span class="article-author">作者: {{ article.author }}</span>
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <div class="pagination-container">
          <el-pagination
              :page-size="pageSize"
              :current-page="currentPage"
              @current-change="handlePageChange"
              background
              layout="prev, pager, next"
              :total="66"
          />
        </div>
      </div>
    </div>

  </div>
</template>


<style scoped lang="scss">
.article-list-container {
  background-image: url('@/assets/img_1.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  .article-container {
    max-width: 1200px;
    display: flex;
    margin: auto;
    padding: 20px;
    text-align: center;

    .article-left {
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
        width: 900px;

        .article-content {
          max-height: 150px; /* 设置最大高度为100px，你可以根据需要调整这个值 */
          overflow: hidden; /* 隐藏超出部分 */
          text-overflow: ellipsis; /* 添加省略号 */
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
              font-size: 18px;
              font-weight: 600;
            }

            p {
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
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin: 40px auto;
  width: 100%;
}

/* 未点赞状态 */
.unliked {
  background-color: white;
  color: black;
}

/* 已点赞状态 */
.liked {
  background-color: #3f7ef7;
  color: white;
}
</style>
