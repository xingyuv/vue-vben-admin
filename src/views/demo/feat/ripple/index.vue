<template>
  <PageWrapper title="Ripple示例">
    <div v-ripple class="demo-box">content</div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { PageWrapper } from '@/components/Page';
  import RippleDirective from '@/directives/ripple';

  export default defineComponent({
    components: { PageWrapper },
    directives: {
      Ripple: RippleDirective,
    },
  });
</script>

<style lang="less" scoped>
  .demo-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 300px;
    font-size: 24px;
    color: #fff;
    background-color: #408ede;
    border-radius: 10px;
  }
</style>
