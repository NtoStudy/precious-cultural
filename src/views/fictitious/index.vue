<script setup>
import { ref } from 'vue';
import router from '@/router/index.js';

const currentPage = ref(1);
const pageSize = ref(6);
const total = ref(66);

function handlePageChange(newPage) {
  currentPage.value = newPage;
}

const fictitiousList = [
  {
    id: 1,
    imgUrl: 'https://takeaway-hei.oss-cn-hangzhou.aliyuncs.com/qjt.jpg',
  },
  {
    id: 2,
    imgUrl: 'https://takeaway-hei.oss-cn-hangzhou.aliyuncs.com/qjt.jpg',
  },
  {
    id: 3,
    imgUrl: 'https://takeaway-hei.oss-cn-hangzhou.aliyuncs.com/qjt.jpg',
  },
  {
    id: 4,
    imgUrl: 'https://takeaway-hei.oss-cn-hangzhou.aliyuncs.com/qjt.jpg',
  },
  {
    id: 5,
    imgUrl: 'https://takeaway-hei.oss-cn-hangzhou.aliyuncs.com/qjt.jpg',
  },
  {
    id: 6,
    imgUrl: 'https://takeaway-hei.oss-cn-hangzhou.aliyuncs.com/qjt.jpg',
  }
]
function goToDetail(item) {
  router.push({
    name: 'fictitiousDetail',
    params: { fictitiousId: encodeURIComponent(item.id) },
    query: { imgUrl: item.imgUrl } // 将 imgUrl 作为 query 参数传递
  });
}


</script>

<template>
  <div class="fictitious-container">
    <h2 class="header-title">这里是vr展厅，点击图片进入全景图</h2>
    <div class="fictitious-container-list">
      <div class="elCard">
        <el-card
            class="elCard-item"
            v-for="item in fictitiousList"
            :key="item.id"
            @click="goToDetail(item)"
        >
          <img :src="item.imgUrl" alt="image" />
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

      .el-card {
        --el-card-padding: 0px;
      }

      .elCard-item {
        width: 30%;
        height: 200px;
        border-radius: 20px;
        margin-top: 20px;
      }

      img {
        width: 100%;
        height: 100%;
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
