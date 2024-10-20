<script setup>
import {onMounted, ref} from 'vue';
import router from '@/router/index.js';
import {userPanoramaPageApi} from "@/api/index.js";
const currentPage = ref(1);
const pageSize = ref(6);
const total = ref(0);
function handlePageChange(newPage) {
  currentPage.value = newPage;
}
// const fictitiousList = [
//   {
//     id: 1,
//     imgUrl: 'https://takeaway-hei.oss-cn-hangzhou.aliyuncs.com/qjt.jpg',
//     description: '贵州大娄山'
//   },
//   {
//     id: 2,
//     imgUrl: 'https://web-frame-spring.oss-cn-hangzhou.aliyuncs.com/1.jpg',
//     description: '北京故宫'
//   },
//   {
//     id: 3,
//     imgUrl: 'https://web-frame-spring.oss-cn-hangzhou.aliyuncs.com/2.jpg',
//     description: '湖南吊脚楼'
//
//   },
//   {
//     id: 4,
//     imgUrl: 'https://web-frame-spring.oss-cn-hangzhou.aliyuncs.com/3.jpg',
//     description: '内蒙古乌兰察布'
//   },
//   {
//     id: 5,
//     imgUrl: 'https://web-frame-spring.oss-cn-hangzhou.aliyuncs.com/4.jpg',
//     description: '贵州乌蒙山'
//   },
//   {
//     id: 6,
//     imgUrl: 'https://web-frame-spring.oss-cn-hangzhou.aliyuncs.com/5.jpg',
//     description: '广西壮族自治区'
//   }
// ]

const fictitiousList = ref([])
// 点击跳转到景点详情页
function goToDetail(item) {
  router.push({
    name: 'fictitiousDetail',
    params: { fictitiousId: encodeURIComponent(item.id) },
    query: { url: item.url } // 将 imgUrl 作为 query 参数传递
  });
}
// 获取用户的景点列表
const userPanoramaPage = async ()=>{
  const res = await userPanoramaPageApi(currentPage.value, pageSize.value)
  const data = res.data.data
  total.value = data.total
  fictitiousList.value = data.records
  console.log(fictitiousList.value)
}
onMounted(()=>{
  userPanoramaPage()
})
</script>
<template>
  <div class="fictitious-container">
    <h2 class="header-title">vr展厅</h2>
    <div class="fictitious-container-list">
      <div class="elCard">
        <el-card
            class="elCard-item"
            v-for="item in fictitiousList"
            :key="item.id"
            @click="goToDetail(item)"
        >
          <img :src="item.url" alt="image" />
          <div class="overlay">
            <div class="text">项目介绍：{{ item.description }}</div>
          </div>
        </el-card>
      </div>
    </div>
    <div class="pagination-container">
      <el-pagination
          :page-size="pageSize"
          :current-page="currentPage"
          @current-change="handlePageChange"
          background
          layout="prev, pager, next"
          :total="total"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.fictitious-container {
  background-image: url('@/assets/img_1.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  padding: 20px 0;

  .header-title {
    text-align: center;
    font-weight: bold;
    font-size: 22px;
    margin-bottom: 20px;
  }

  .fictitious-container-list {
    padding: 0 100px;

    .elCard {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      width: 100%;
      .overlay{
        position: absolute;
        bottom: 10px;
        left: 25%;
        font-size: 18px;
        font-weight: bold;
      }
      .el-card {
        --el-card-padding: 0px;
      }


      .elCard-item {
        width: 28%;
        height: 210px;
        border-radius: 20px;
        margin-bottom: 20px;
        cursor: pointer;
        position: relative;

        img {
          width: 100%;
          height: 100%;
          transition: transform 0.5s ease;
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
}
</style>
