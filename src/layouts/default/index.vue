<template>
  <Layout :class="prefixCls" v-bind="lockEvents">
    <LayoutFeatures />
    <LayoutHeader v-if="getShowFullHeaderRef" fixed />
    <Layout :class="[layoutClass]">
      <LayoutSideBar v-if="getShowSidebar || getIsMobile" />
      <Layout :class="`${prefixCls}-main`">
        <LayoutMultipleHeader />
        <LayoutContent />
        <LayoutFooter />
      </Layout>
    </Layout>
  </Layout>
</template>

<script lang="ts" setup>
  import { Layout } from 'ant-design-vue';
  import { computed, unref } from 'vue';

  import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting';
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting';
  import { useAppInject } from '@/hooks/web/useAppInject';
  import { useDesign } from '@/hooks/web/useDesign';
  import { useLockPage } from '@/hooks/web/useLockPage';
  import { createAsyncComponent } from '@/utils/factory/createAsyncComponent';

  import LayoutContent from './content/index.vue';
  import LayoutHeader from './header/index.vue';
  import LayoutMultipleHeader from './header/MultipleHeader.vue';
  import LayoutSideBar from './sider/index.vue';

  defineOptions({ name: 'DefaultLayout' });

  const LayoutFeatures = createAsyncComponent(() => import('@/layouts/default/feature/index.vue'));
  const LayoutFooter = createAsyncComponent(() => import('@/layouts/default/footer/index.vue'));

  const { prefixCls } = useDesign('default-layout');
  const { getIsMobile } = useAppInject();
  const { getShowFullHeaderRef } = useHeaderSetting();
  const { getShowSidebar, getIsMixSidebar, getShowMenu } = useMenuSetting();

  // Create a lock screen monitor
  const lockEvents = useLockPage();

  const layoutClass = computed(() => {
    const cls: string[] = ['ant-layout'];
    if (unref(getIsMixSidebar) || unref(getShowMenu)) {
      cls.push('ant-layout-has-sider');
    }
    return cls;
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-default-layout';

  .@{prefix-cls} {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100%;

    .ant-layout {
      background: @content-bg;
    }

    &-main {
      width: 100%;
      margin-left: 1px;
    }
  }
</style>
