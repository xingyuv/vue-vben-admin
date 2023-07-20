<template>
  <PageWrapper title="MarkDown组件示例">
    <div>
      <a-button class="mb-2" type="primary" @click="toggleTheme"> 黑暗主题 </a-button>
      <a-button class="mb-2" type="default" @click="clearValue"> 清空内容 </a-button>
      <MarkDown
        ref="markDownRef"
        v-model:value="value"
        placeholder="这是占位文本"
        @change="handleChange"
      />
    </div>
    <div class="mt-2">
      <a-card title="Markdown Viewer 组件演示">
        <MarkdownViewer :value="value" />
      </a-card>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { type Nullable } from '@vben/types';
  import { Card } from 'ant-design-vue';
  import { defineComponent, ref, unref } from 'vue';

  import { MarkDown, MarkDownActionType, MarkdownViewer } from '@/components/Markdown';
  import { PageWrapper } from '@/components/Page';

  export default defineComponent({
    components: { MarkDown, PageWrapper, MarkdownViewer, ACard: Card },
    setup() {
      const markDownRef = ref<Nullable<MarkDownActionType>>(null);
      const valueRef = ref(`
# 标题h1

##### 标题h5

**加粗**
*斜体*
~~删除线~~
[链接](https://github.com/vbenjs/vue-vben-admin)
↓分割线↓

---


* 无序列表1
  * 无序列表1.1

1. 有序列表1
2. 有序列表2

* [ ] 任务列表1
* [x] 任务列表2

> 引用示例

\`\`\`js
// 代码块:
(() => {
  var htmlRoot = document.getElementById('htmlRoot');
  var theme = window.localStorage.getItem('__APP__DARK__MODE__');
  if (htmlRoot && theme) {
    htmlRoot.setAttribute('data-theme', theme);
    theme = htmlRoot = null;
  }
})();
\`\`\`

| 表格 | 示例 | 🎉️ |
| --- | --- | --- |
| 1 | 2 | 3 |
| 4 | 5 | 6 |
`);

      function toggleTheme() {
        const markDown = unref(markDownRef);
        if (!markDown) return;
        const vditor = markDown.getVditor();
        vditor.setTheme('dark', 'dark', 'dracula');
      }

      function handleChange(v: string) {
        valueRef.value = v;
      }

      function clearValue() {
        valueRef.value = '';
      }

      return {
        value: valueRef,
        toggleTheme,
        markDownRef,
        handleChange,
        clearValue,
      };
    },
  });
</script>
