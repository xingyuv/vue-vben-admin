<template>
  <Card hoverable :style="{ width: '240px', background: '#fff' }">
    <template #cover>
      <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
    </template>
    <CardMeta title="懒加载组件" />
  </Card>
</template>
<script setup lang="ts">
import { Card, CardMeta } from 'ant-design-vue'
</script>
