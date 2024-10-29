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
function goToDetail(item) {
  router.push(`/menu/fictitious/fictitiousDetail/${item.id}`);
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
            v-for="item in fictitiousList"
            :key="item.id"
            @click="goToDetail(item)"
        >
          <img :src="item.url" alt="image" style="width: 100%; height: 175px;"/>
          <div class="overlay">
            <div class="text">项目介绍：{{ item.description }}</div>
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
      .overlay{
        position: absolute;
        bottom: 10px;
        left: 80px;
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
