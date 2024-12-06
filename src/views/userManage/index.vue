<script setup>
import {ref} from 'vue';
import {ElCard, ElMessage} from 'element-plus';
import jiyi1 from "@/assets/lt/jiyi/1.webp";
import jiyi2 from "@/assets/lt/jiyi/2.webp";
import jiyi3 from "@/assets/lt/jiyi/3.png";
import jiyi4 from "@/assets/lt/jiyi/4.jpg";
import minsu1 from "@/assets/lt/minsu/1.jpg";
import minsu2 from "@/assets/lt/minsu/2.webp";
import minsu3 from "@/assets/lt/minsu/3.webp";
import minsu4 from "@/assets/lt/minsu/4.webp";
import xijv1 from "@/assets/lt/xijv/1.webp";
import xijv2 from "@/assets/lt/xijv/2.webp";
import xijv3 from "@/assets/lt/xijv/3.webp";
import xijv4 from "@/assets/lt/xijv/4.webp";
import wudao1 from "@/assets/lt/wudao/1.webp";
import wudao2 from "@/assets/lt/wudao/2.webp";
import wudao3 from "@/assets/lt/wudao/3.webp";
import wudao4 from "@/assets/lt/wudao/4.webp";
import quyi1 from "@/assets/lt/quyi/1.webp";
import quyi2 from "@/assets/lt/quyi/2.webp";
import quyi3 from "@/assets/lt/quyi/3.webp";
import quyi4 from "@/assets/lt/quyi/4.webp";
import {useUserInfoStore} from "@/store/modules/user.js";
import router from "@/router/index.js";
import {forumArticleGetPersonalGetApi} from "@/api/forum/forum.js";

const userStore = useUserInfoStore();
const activeIndex = ref('1')
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
    content: '春节作为中国最重要的民俗节���之一，承载了丰富的文化传统和家庭团聚的意义。随着时代的变迁，庆祝春节的方式也在不断地发展和创新。从传统的放鞭炮、贴春联到现代的网络拜年、电子红包，春节的庆祝形式更加多样化。这些新的庆祝方式不仅让春节的传统得以延续，也为年轻一代提供了新的参与和体验机会。',
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
    content: '端午节作为中国的重要民俗节日，有着悠久的历史和丰富的文化内涵。它不仅是纪念屈原的日子，也是家人团聚、驱邪避疫的��要时刻。在现代社会，端午节的传统习俗如赛龙舟、吃粽子、挂艾草等仍然被广泛传承。同时，通过各种文化活动和教育项目，端午节的文化意义得到了更广泛的传播和认识。',
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
    content: '维吾尔族舞蹈以其热情奔放和快速旋转的动作而受到人们的喜爱。现代维吾尔族舞蹈在传承中不断创新，��合现代音乐和舞蹈元素，展现出更加活力四射的舞蹈风格。',
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
const achievement = ref([
  {
    url: '#',
    text: '获得过100次点赞'
  },
  {
    url: '#',
    text: '获得过50次分享'
  },
  {
    url: '#',
    text: '被收藏20次'
  }
  ,
  {
    url: '#',
    text: '获得过200次评论'
  },
  {
    url: '#',
    text: '浏览量达到1000次'
  },
  {
    url: '#',
    text: '被标记为有用10次'
  }
])
const interest = ref(['民间文学','传统音乐','传统舞蹈','传统戏剧','曲艺','传统体育','传统美术','传统技艺','传统医药','民俗'])
const myInterest = ref(['民间文学','传统音乐','传统舞蹈','传统戏剧','曲艺','传统体育'])
const dialogTableVisible = ref(false)
// 判断用户是否登录
if (!userStore.userInfo) {
  ElMessage.error('请先登录！')
  router.push({name: 'login'})
}
const goToUserInfo = () => {
  router.push({name: 'userInfo', params: {infoId: userStore.userInfo.username}})
}
const forumArticleGetPersonalData = ref([])
const forumArticleGetPersonal = async() => {
  const res = await forumArticleGetPersonalGetApi(1,100,userStore.userInfo.id)
  forumArticleGetPersonalData.value = res.data.data.records
  console.log(forumArticleGetPersonalData.value)
}
forumArticleGetPersonal()


</script>
<template>
  <div class="container">
    <!-- 用户信息卡片 -->
    <el-card class="user-info-card">
      <div style="display: flex">
        <div class="user-avatar">
          <img src='https://takeaway-hei.oss-cn-hangzhou.aliyuncs.com/tx.png' alt="用户头像"/>
        </div>
        <div>
          <div class="user-info">
            <p>用户名：{{ userStore.userInfo.username }}</p>
            <div class="manageBtn">
              <el-button @click="goToUserInfo">
                <el-icon>
                  <Edit/>
                </el-icon>
                编辑资料
              </el-button>
              <el-button>
                <el-icon>
                  <MessageBox/>
                </el-icon>
                管理文章
              </el-button>
              <el-button>
                <el-icon>
                  <Setting/>
                </el-icon>
                设置
              </el-button>
            </div>
          </div>
          <div class="user-info-number">
            <p>39299 总访问量</p>
            <p>45 原创</p>
            <p>503 粉丝</p>
            <p>0 铁粉</p>
          </div>
          <p style="margin-left: 24px; margin-top: 10px">IP属地：江西省</p>
        </div>
      </div>
    </el-card>
    <div class="article-container">
      <div class="article-left">
        <el-card class="interest-card">
          <div class="interest-title">
            <p>兴��领域</p>
            <p style="cursor: pointer" @click="dialogTableVisible = true">管理></p>
          </div>
          <el-divider style="margin: 16px 0;"/>
          <div v-for="(item, index) in myInterest" :key="index">
            <p style="line-height: 25px;margin-bottom: 4px;">{{item}}</p>
          </div>
        </el-card>
        <el-card class="achievement-card">
          <p>个人成就</p>
          <el-divider style="margin: 16px 0;"/>
          <div class="achievement-card-list" v-for="(item, index) in achievement" :key="index">
            <img :src=item.url alt="" width="25px" height="25px"/>
            <p style="line-height: 25px; margin-left: 10px;">{{item.text}}</p>
          </div>
        </el-card>
      </div>
      <div class="article-right">
        <el-card class="article-card">
          <template #header>
            <el-menu
                :default-active="activeIndex"
                mode="horizontal"
            >
              <el-menu-item index="1">我的文章</el-menu-item>
              <el-menu-item index="2">关注列表</el-menu-item>
              <el-menu-item index="3">粉丝列表</el-menu-item>
              <el-menu-item index="4">收藏列表</el-menu-item>
            </el-menu>
          </template>
          <div class="article-list" v-for="(item, index) in forumArticleGetPersonalData" :key="index">
            <h2 class="article-title">{{item.title}}</h2>
            <p class="article-content">
              {{item.content}}</p>
            <div class="article-footer">
              <p>{{item.articleCountDTO.commentCount}}阅读 ·</p>
              <p>{{item.articleCountDTO.likeCount}}点赞 ·</p>
              <p>{{item.articleCountDTO.commentCount}}评论 ·</p>
              <p>{{item.articleCountDTO.commentCount}}收藏</p>
            </div>
          </div>
        </el-card>
      </div>
    </div>

    <el-dialog v-model="dialogTableVisible" title="选择喜欢的兴趣领域" width="600" >
       <ul style="display: flex;flex-wrap: wrap;">
         <li v-for="(item, index) in interest" :key="index" style="margin-bottom: 18px;margin-right: 20px; cursor: pointer;font-size: 16px; border: 1px solid #ccc;padding: 6px">{{item}}<i style="margin-left: 10px;" @click="myInterest.push(item)">x</i></li>
       </ul>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;

  .user-info-card {

    height: 140px;

    .user-avatar {
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
    }

    .user-info {
      display: flex;
      width: 1050px;
      height: 35px;
      line-height: 35px;
      justify-content: space-between;

      p {
        margin-left: 24px;
        font-weight: 500;
        font-size: 20px;
      }

      button, [type=button], [type=reset], [type=submit] {
        -webkit-appearance: button;
        appearance: button;
        border-radius: 50px;
      }
    }

    .user-info-number {
      display: flex;
      font-size: 18px;
      width: 600px;
      height: 30px;
      line-height: 30px;

      p {
        margin-left: 24px;
      }
    }
  }

  .article-container {
    display: flex;

    .article-left {
      width: 300px;

      .interest-card {
        margin: 20px 20px 20px 0;
        .interest-title {
          display: flex;
          justify-content: space-between;
        }


      }

      .achievement-card {
        margin: 20px 20px 20px 0;
        .achievement-card-list {
          display: flex;
          margin-bottom: 10px;
        }
      }
    }

    .article-right {
      width: 900px;

      .article-card {
        margin-top: 20px;
        height: 1200px;
        overflow-y: auto;

        .article-list {
          margin-bottom: 25px;

          .article-title {
            font-size: 22px;
          }

          .article-content {
            font-size: 16px;
            margin-top: 6px;
            margin-bottom: 12px;
          }

          .article-footer {
            display: flex;

            p {
              margin-right: 20px;
            }
          }
        }
      }
    }
  }
}

.el-menu--horizontal.el-menu {
  border-bottom: none;
}

.el-menu--horizontal {
  --el-menu-horizontal-height: 35px;
}


</style>
