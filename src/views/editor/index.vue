<script setup>
// 引入 Vue 相关的响应式 API
import { reactive, ref, watch, nextTick } from "vue";
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from 'element-plus';
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue';

// 初始化变量
const content = ref('');
const length = ref(0);
const dialogTableVisible = ref(false);
const dialogVisible = ref(false);
const disabled = ref(false);
const inputValue = ref('');
const dynamicTags = ref([]);
const inputVisible = ref(false);
const InputRef = ref();

// Markdown配置
const markdownOption = {
  bold: true, italic: true, header: true, underline: true, strikethrough: true,
  mark: true, superscript: true, subscript: true, quote: true, ol: true,
  ul: true, link: true, imagelink: true, code: true, table: true,
  fullscreen: true, readmodel: true, htmlcode: true, help: true,
  undo: true, redo: true, trash: true, save: true, navigation: true,
  alignleft: true, aligncenter: true, alignright: true, subfield: true, preview: true
};

// 表单数据
const blogForm = ref({
  title: '',
  imgUrl:'',
  tags: [],
  resource: '',
  desc: ''
});

// 提交表单
const submitForm = () => {
  if (!blogForm.title || !blogForm.desc) {
    ElMessage.error('请填写文章标题和摘要！');
    return;
  }
  console.log('提交博客', blogForm.value);
  ElMessage.success('博客发布成功！');
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
  length.value = content.value.length;
});

// 标签处理
const handleClose = (tag) => {
  const index = dynamicTags.value.indexOf(tag);
  if (index !== -1) {
    dynamicTags.value.splice(index, 1);
  }
};

// 显示输入框
const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value.input.focus();
  });
};

// 确认输入标签
const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value);
    inputValue.value = '';
    inputVisible.value = false;
  }
};

// 图片处理
const dialogImageUrl = ref('');
const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url;
  dialogVisible.value = true;
};

const handleRemove = (file) => {
  console.log(file);
};

const handleDownload = (file) => {
  console.log(file);
};

</script>

<template>
  <div id="editor">
    <mavon-editor :toolbars="markdownOption" v-model="content" style="height: 80vh;" />
    <div class="blog-post">
      <div class="foot-left">
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
        <el-input v-model="blogForm.title" />
      </el-form-item>
      <el-form-item label="添加封面">
        <el-upload action="#" list-type="picture-card" :auto-upload="false" >
          <el-icon><Plus /></el-icon>
          <template #file="{ file }">
            <div>
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                  <el-icon><ZoomIn /></el-icon>
                </span>
                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                  <el-icon><Download /></el-icon>
                </span>
                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                  <el-icon><Delete /></el-icon>
                </span>
              </span>
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章标签">
        <el-tag
          v-for="tag in dynamicTags"
          v-model="blogForm.tags"
          :key="tag"
          closable
          @close="handleClose(tag)"
          style="margin-right: 5px"
        >
          {{ tag }}
        </el-tag>
        <el-input
          v-if="inputVisible"
          ref="InputRef"
          v-model="inputValue"
          class="w-20"
          size="small"
          @keyup.enter="handleInputConfirm"
          @blur="handleInputConfirm"
        />
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
      </el-form-item>
      <el-form-item label="文章来源">
        <el-radio-group v-model="blogForm.resource">
          <el-radio value="1">原创</el-radio>
          <el-radio value="2">转载</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="文章摘要">
        <el-input v-model="blogForm.desc" type="textarea" />
      </el-form-item>
    </el-form>
  </el-dialog>
  <el-dialog v-model="dialogVisible">
    <img :src="dialogImageUrl" alt="Preview Image" style="width: 400px; height: 400%; "/>
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
    justify-content: space-evenly;
    .foot-left {
      display: flex;
      line-height: 40px;
    }
  }
}
</style>
