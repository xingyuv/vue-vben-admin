<template>
  <Tooltip :title="getTitle" placement="bottom" :mouseEnterDelay="0.5">
    <span @click="toggle">
      <FullscreenOutlined v-if="!isFullscreen" />
      <FullscreenExitOutlined v-else />
    </span>
  </Tooltip>
</template>
<script lang="ts" setup>
  import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons-vue';
  import { useFullscreen } from '@vueuse/core';
  import { Tooltip } from 'ant-design-vue';
  import { computed, unref } from 'vue';

  import { useI18n } from '@/hooks/web/useI18n';

  defineOptions({ name: 'FullScreen' });

  const { t } = useI18n();
  const { toggle, isFullscreen } = useFullscreen();
  // 重新检查全屏状态
  isFullscreen.value = !!document.fullscreenElement;

  const getTitle = computed(() => {
    return unref(isFullscreen)
      ? t('layout.header.tooltipExitFull')
      : t('layout.header.tooltipEntryFull');
  });
</script>
