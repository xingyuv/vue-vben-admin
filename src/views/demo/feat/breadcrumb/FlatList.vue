<template>
  <PageWrapper title="平级面包屑示例" content="子级页面面包屑会覆盖当前层级">
    <router-link to="/feat/breadcrumb/flatDetail"> 进入平级详情页 </router-link>
  </PageWrapper>
</template>
<script setup lang="ts">
import { PageWrapper } from '@/components/Page'
</script>
