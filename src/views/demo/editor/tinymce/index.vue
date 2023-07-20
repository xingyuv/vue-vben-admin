<template>
  <PageWrapper title="富文本组件示例">
    <Tinymce v-model="value" width="100%" @change="handleChange" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';

  import { PageWrapper } from '@/components/Page';
  import { Tinymce } from '@/components/Tinymce/index';

  export default defineComponent({
    components: { Tinymce, PageWrapper },
    setup() {
      const value = ref('hello world!');
      function handleChange(value: string) {
        console.log(value);
      }
      return { handleChange, value };
    },
  });
</script>
