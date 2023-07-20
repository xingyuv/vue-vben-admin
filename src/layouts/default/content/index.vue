<template>
  <div v-loading="getOpenPageLoading && getPageLoading" :class="[prefixCls, getLayoutContentMode]">
    <PageLayout />
  </div>
</template>
<script lang="ts" setup>
  import { useRootSetting } from '@/hooks/setting/useRootSetting';
  import { useTransitionSetting } from '@/hooks/setting/useTransitionSetting';
  import { useDesign } from '@/hooks/web/useDesign';
  import PageLayout from '@/layouts/page/index.vue';

  import { useContentViewHeight } from './useContentViewHeight';

  defineOptions({ name: 'LayoutContent' });

  const { prefixCls } = useDesign('layout-content');
  const { getOpenPageLoading } = useTransitionSetting();
  const { getLayoutContentMode, getPageLoading } = useRootSetting();

  useContentViewHeight();
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-layout-content';

  .@{prefix-cls} {
    position: relative;
    flex: 1 1 auto;
    min-height: 0;

    &.fixed {
      width: 1200px;
      margin: 0 auto;
    }
    // end

    &-loading {
      position: absolute;
      top: 200px;
      z-index: @page-loading-z-index;
    }
  }
</style>
