<template>
  <Watermark :content="watermarkContent">
    <PageWrapper title="水印示例">
      <CollapseContainer class="w-full h-32 bg-white rounded-md" title="Global WaterMark">
        <a-button type="primary" class="mr-2" @click="setWatermark('WaterMark Info')">
          Create
        </a-button>
        <a-button color="error" class="mr-2" @click="clear"> Clear </a-button>
        <a-button color="warning" class="mr-2" @click="setWatermark('WaterMark Info New')">
          Reset
        </a-button>
      </CollapseContainer>
    </PageWrapper>
  </Watermark>
</template>
<script lang="ts" setup>
  import { Watermark } from 'ant-design-vue';
  import { ref } from 'vue';

  import { CollapseContainer } from '@/components/Container/index';
  import { PageWrapper } from '@/components/Page';

  const watermarkContent = ref('');

  function setWatermark(content: string) {
    watermarkContent.value = content;
  }

  function clear() {
    watermarkContent.value = '';
  }
</script>
