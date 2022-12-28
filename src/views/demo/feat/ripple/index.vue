<template>
  <PageWrapper title="Ripple示例">
    <div class="demo-box" v-ripple-directive>content</div>
  </PageWrapper>
</template>
<script lang="ts" setup>
import vRippleDirective from '@/directives/ripple'
import { PageWrapper } from '@/components/Page'
</script>

<style lang="less" scoped>
.demo-box {
  display: flex;
  width: 300px;
  height: 300px;
  font-size: 24px;
  color: #fff;
  background-color: #408ede;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
}
</style>
