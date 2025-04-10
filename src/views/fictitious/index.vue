<script setup>
import {onMounted, ref} from 'vue';
import router from '@/router/index.js';
import {hallPanoramaPageGetApi} from "@/api/heritage/panorama.js";
const currentPage = ref(1);
const pageSize = ref(6);
const total = ref(0);
function handlePageChange() {
  userPanoramaPage()
}

const fictitiousList = ref([])
// 点击跳转到景点详情页
function goToDetail(index) {
  router.push(`/menu/fictitious/fictitiousDetail/${index + 1}`);
}
// 获取用户的景点列表
const userPanoramaPage = async ()=>{
  const res = await hallPanoramaPageGetApi(currentPage.value, pageSize.value)
  const data = res.data.data
  total.value = data.total
  fictitiousList.value = data.records
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
            v-for="(item,index) in fictitiousList"
            :key="item.id"
            @click="goToDetail(index)"
        >
          <img :src="item.url" alt="image"/>
          <div class="overlay">
            <p class="text">项目介绍：{{ item.description }}</p>
          </div>
        </el-card>
      </div>
    </div>
    <div class="pagination-container">
      <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
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
  height: 100%;
  padding: 20px 0;

  .header-title {
    text-align: center;
    font-weight: bold;
    font-size: 22px;
    margin-bottom: 30px;
    margin-top: 10px;
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
        width: 28%;
        height: 230px; // 调整高度以适应内容
        border-radius: 20px;
        margin-bottom: 20px;
        cursor: pointer;
        position: relative;
        img {
          width: 100%;
          height: 180px;
          transition: transform 0.5s ease;
        }
        .overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          font-size: 18px;
          font-weight: bold;
          text-align: center;
          line-height: 30px;
          padding: 10px;
          background: rgba(0, 0, 0, 0.5);
          color: white;
          border-radius: 0 0 20px 20px;
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
