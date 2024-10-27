<script setup>
import {ref, watchEffect} from 'vue';
import MarkdownIt from 'markdown-it';
import MarkdownItAnchor from 'markdown-it-anchor';
import MarkdownItToc from 'markdown-it-toc-done-right';
import MarkdownItHighLightJs from "markdown-it-highlightjs";
import hljs from "highlight.js";

const props = defineProps({
  source: {
    type: String,
    default: ''
  }
});
const markdown = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
            hljs.highlight(lang, str, true).value +
            '</code></pre>';
      } catch (__) {
      }
    }
    return '<pre class="hljs"><code>' + this.utils.escapeHtml(str) + '</code></pre>';
  }
})
    .use(MarkdownItAnchor)
    .use(MarkdownItToc)
    .use(MarkdownItHighLightJs)

const compiledMarkdown = ref('');
const tocHtml = ref('');

watchEffect(() => {
  compiledMarkdown.value = markdown.render(props.source);
  console.log(compiledMarkdown.value); // 检查渲染后的 HTML
});
</script>

<template>
  <div class="markdown-container">
    <div class="content" v-html="compiledMarkdown"></div>
  </div>
</template>


<style lang="scss" scoped>
.markdown-container {
  display: flex;
  .content {
    :deep(h1, h2, h3, h4, h5, h6) {
      margin-top: 0.5em; /* 上边距 */
      margin-bottom: 0.5em; /* 下边距 */
    }
    :deep(h1){
      font-size: 20px ;
      line-height: 30px ;
    }
    :deep(h2){
      font-size: 20px;
      line-height: 30px;
    }
    :deep(h3){
      font-size: 1.75em; /* 28px */
    }
    :deep(h4){
      font-size: 1.5em; /* 24px */
    }
    :deep(h5){
      font-size: 1.25em; /* 20px */
    }
    :deep(h2){
      font-size: 1em; /* 16px */
    }
    :deep(p) {
      margin-top: 1em; /* 上边距 */
      margin-bottom: 1em; /* 下边距 */
      line-height: 1.5; /* 行高 */
    }
    :deep(ul, ol) {
      list-style-type: disc; /* ul为实心圆点，ol根据类型而定 */
      margin-top: 1em;       /* 上边距 */
      margin-bottom: 1em;     /* 下边距 */
      padding-left: 40px;     /* 左边距，用于缩进列表项 */
    }
    :deep(ol){
      list-style-type: decimal; /* 有序列表的默认符号是数字 */
    }
    :deep(ul ul, ul ol, ol ul, ol ol) {
      margin-top: 0; /* 嵌套列表的上边距 */
      margin-bottom: 0; /* 嵌套列表的下边距 */
    }
    :deep(li) {
      margin-bottom: 0.5em; /* 列表项之间的间隔 */
    }
  }
}

</style>
