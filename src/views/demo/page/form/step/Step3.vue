<template>
  <div class="step3">
    <Result status="success" title="操作成功" sub-title="预计两小时内到账">
      <template #extra>
        <Button type="primary" @click="redo"> 再转一笔 </Button>
        <Button> 查看账单 </Button>
      </template>
    </Result>
    <div class="desc-wrap">
      <Descriptions :column="1" class="mt-5">
        <DescriptionsItem label="付款账户"> ant-design@alipay.com </DescriptionsItem>
        <DescriptionsItem label="收款账户"> test@example.com </DescriptionsItem>
        <DescriptionsItem label="收款人姓名"> Vben </DescriptionsItem>
        <DescriptionsItem label="转账金额"> 500元 </DescriptionsItem>
      </Descriptions>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Button, Result, Descriptions, DescriptionsItem } from 'ant-design-vue'

const emit = defineEmits(['redo'])
function redo() {
  emit('redo')
}
</script>
<style lang="less" scoped>
.step3 {
  width: 600px;
  margin: 0 auto;
}

.desc-wrap {
  padding: 24px 40px;
  margin-top: 24px;
  background-color: @background-color-light;
}
</style>
