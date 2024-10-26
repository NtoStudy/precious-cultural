<script setup>
import {ref, watchEffect} from 'vue';
import { useNavStore } from '@/store/modules/nav.js'
import MarkdownIt from 'markdown-it';
import MarkdownItAnchor from 'markdown-it-anchor';
import MarkdownItToc from 'markdown-it-toc-done-right';
import MarkdownItHighLightJs from "markdown-it-highlightjs";
import hljs from "highlight.js";
const store = useNavStore()

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
    .use(MarkdownItAnchor, {
      permalink: true,
      permalinkBefore: true,
      permalinkClass: 'header-anchor',
      permalinkSymbol: '#',
    })
    .use(MarkdownItToc, {
      containerClass: 'toc',
      containerId: 'toc',
      listType: 'ul',
      linkClass: 'toc-link',
      itemClass: 'toc-item',
      callback: (html, ast) => {
        tocHtml.value = html;
      }
    })
    .use(MarkdownItHighLightJs)

const compiledMarkdown = ref('');
const tocHtml = ref('');

watchEffect(() => {
  compiledMarkdown.value = markdown.render(props.source);
  store.setTocHtml(tocHtml.value)
});
</script>

<template>
  <div class="markdown-container">
<!--    <div class="sidebar">-->
<!--      <nav v-html="tocHtml"></nav>-->
<!--    </div>-->
    <div class="content" v-html="compiledMarkdown"></div>
  </div>
</template>


<style scoped>
.markdown-container {
  display: flex;
}

.sidebar {
  width: 200px;
  margin-right: 20px;

  display: inline-block;
  margin-left: 10px; /* 锚点和文本之间的距离 */
  font-size: 16px; /* 锚点的字体大小 */
  cursor: pointer; /* 鼠标悬停时的光标样式 */

  ::v-deep(ul) {
    list-style-type: none;
    a {
      text-decoration: none;
      color: #262932; /* 默认链接颜色 */
    }
    a:hover {
      color: #3f8ef9; /* 鼠标悬停时的链接颜色 */
    }
  }
}
.content {
  flex-grow: 1;
}


</style>
