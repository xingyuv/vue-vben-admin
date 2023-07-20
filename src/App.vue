<template>
  <ConfigProvider :locale="getAntdLocale" :theme="themeConfig">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ConfigProvider>
</template>

<script lang="ts" setup>
  import 'dayjs/locale/zh-cn';

  import { ConfigProvider } from 'ant-design-vue';
  import { theme } from 'ant-design-vue/es';
  import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context';
  import { reactive } from 'vue';

  import { AppProvider } from '@/components/Application';
  import { useTitle } from '@/hooks/web/useTitle';
  import { useLocale } from '@/locales/useLocale';

  // support Multi-language
  const { getAntdLocale } = useLocale();

  const themeConfig = reactive<ThemeConfig>({
    algorithm: theme.defaultAlgorithm,
    token: {
      colorPrimary: '#1890ff',
    },
    components: {},
  });

  // Listening to page changes and dynamically changing site titles
  useTitle();
</script>
