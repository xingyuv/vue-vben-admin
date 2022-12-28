<template>
  <div class="request-box">
    <Button @click="handleClick" type="primary"> 点击会重新发起请求5次 </Button>
    <p>打开浏览器的network面板，可以看到发出了六次请求</p>
  </div>
</template>
<script setup lang="ts">
import { testRetry } from '@/api/sys/user'
import { Button } from 'ant-design-vue'
// @ts-ignore
const handleClick = async () => {
  await testRetry()
}
</script>

<style lang="less">
.request-box {
  margin: 50px;
}

p {
  margin-top: 10px;
}
</style>
