<script setup>
// 引入 Vue 相关的响应式 API
import { ref, watch, nextTick } from "vue";
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from 'element-plus';
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue';
import router from "@/router/index.js";
import { forumArticlePostApi } from "@/api/forum/forum.js";
import { forumLabelGetApi } from "@/api/forum/label.js";

// 初始化变量
const content = ref('');
const length = ref(0);
const dialogTableVisible = ref(false);
const disabled = ref(false);
const dynamicTags = ref([]); // 存储所有标签名称
const labelIds = ref([]); // 存储选中的标签名称

// 表单数据
const blogForm = ref({
  title: '',
  titleMap: ''
});

// Markdown配置
const markdownOption = {
  bold: true, italic: true, header: true, underline: true, strikethrough: true,
  mark: true, superscript: true, subscript: true, quote: true, ol: true,
  ul: true, link: true, imagelink: true, code: true, table: true,
  fullscreen: true, readmodel: true, htmlcode: true, help: true,
  undo: true, redo: true, trash: true, save: true, navigation: true,
  alignleft: true, aligncenter: true, alignright: true, subfield: true, preview: true
};

// 提交表单
const submitForm = async () => {
  if (!blogForm.value.title) {
    ElMessage.error('请填写文章标题!');
    return;
  }
  const { title, titleMap } = blogForm.value;
  const res = await forumArticlePostApi(title , titleMap ,content.value , labelIds.value[0].id);
  if(res.data.code === 1){
    ElMessage.success('发布成功');
    // 清空属性
    content.value = '';
    blogForm.value = {
      title: '',
      titleMap: ''
    };
    labelIds.value = [];
    dialogTableVisible.value = false;
    disabled.value = false;

  }

};

// 保存草稿
const saveDraft = () => {
  if (!content.value) {
    ElMessage.warning('没有内容可以保存草稿！');
    return;
  }
  console.log('保存草稿', blogForm.value);
  ElMessage.info('草稿保存成功！');
};

// 监控内容变化
watch(content, () => {
  length.value = content.value.length
});

// 标签处理
const handleClose = (tag) => {
  const index = labelIds.value.indexOf(tag);
  if (index !== -1) {
    labelIds.value.splice(index, 1);
  }
};

// 添加标签到文章标签
const addTagToArticle = (tag) => {
  if (!labelIds.value.includes(tag)) {
    labelIds.value.push(tag);
  }
};

// 图片处理
const dialogImageUrl = ref('');
const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url;
};

const handleRemove = (file) => {
  console.log(file);
};

const handleDownload = (file) => {
  console.log(file);
};

// 跳转到上一页
const toLastPage = () => {
  router.push('/menu');
};

// 获取论坛标签列表
const forumLabelGet = async () => {
  const res = await forumLabelGetApi();
  // 将获取到的标签数据的 labelName 添加到 dynamicTags 中
  const labels = res.data.data.map(item => ({
    id: item.id, // 或者使用 item 的实际 id，如果它提供了 id
    labelName: item.labelName
  }))
  dynamicTags.value = labels;
};
forumLabelGet();
</script>

<template>
  <div id="editor">
    <mavon-editor :toolbars="markdownOption" v-model="content" style="height: 80vh;"/>
    <div class="blog-post">
      <div class="foot-left">
        <p style="margin-right: 40px; cursor: pointer" @click="toLastPage"> &lt; 返回首页</p>
        <p style="margin-right: 40px">共 {{ length }} 个字</p>
        <el-button size="large" type="primary" round @click="dialogTableVisible = true">发文设置</el-button>
      </div>
      <div class="foot-right">
        <el-button size="large" round @click="saveDraft">保存草稿</el-button>
        <el-button size="large" type="primary" round @click="submitForm">发布博客</el-button>
      </div>
    </div>
  </div>

  <el-dialog v-model="dialogTableVisible" width="800">
    <el-form :model="blogForm" label-width="auto" style="max-width: 600px">
      <el-form-item label="文章标题">
        <el-input v-model="blogForm.title"/>
      </el-form-item>
      <el-form-item label="添加封面">
        <el-upload action="#" list-type="picture-card" :auto-upload="false">
          <el-icon>
            <Plus/>
          </el-icon>
          <template #file="{ file }">
            <div>
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt=""/>
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                  <el-icon><ZoomIn/></el-icon>
                </span>
                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                  <el-icon><Download/></el-icon>
                </span>
                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                  <el-icon><Delete/></el-icon>
                </span>
              </span>
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章标签">
        <el-tag
            v-for="tag in labelIds"
            :key="tag.id"
            closable
            @close="handleClose(tag)"
            style="margin-right: 10px;margin-bottom: 10px; cursor: pointer"
        >
          {{ tag.labelName }}
        </el-tag>
      </el-form-item>
      <el-form-item label="全部标签">
        <el-tag
            v-for="tag in dynamicTags"
            :key="tag.id"
            @click="addTagToArticle(tag)"
            style="margin-right: 10px;margin-bottom: 10px; cursor: pointer"
        >
          {{ tag.labelName }}
        </el-tag>
      </el-form-item>
      <el-form-item label="文章来源">
        <el-radio-group v-model="blogForm.resource">
          <el-radio value="1">原创</el-radio>
          <el-radio value="2">转载</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="文章摘要">
        <el-input v-model="blogForm.desc" type="textarea"/>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="dialogTableVisible = false">保存</el-button>
  </el-dialog>
</template>

<style scoped lang="scss">
#editor {
  margin: auto;
  width: 100%;

  .blog-post {
    display: flex;
    margin-top: 20px;
    height: 40px;
    justify-content: space-around;

    .foot-left {
      display: flex;
      line-height: 40px;
    }
  }
}
</style>
