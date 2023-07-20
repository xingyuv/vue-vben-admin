<template>
  <Tooltip placement="top">
    <template #title>
      <span>{{ t('component.table.settingFullScreen') }}</span>
    </template>
    <FullscreenOutlined v-if="!isFullscreen" @click="toggle" />
    <FullscreenExitOutlined v-else @click="toggle" />
  </Tooltip>
</template>
<script lang="ts" setup>
  import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons-vue';
  import { useFullscreen } from '@vueuse/core';
  import { Tooltip } from 'ant-design-vue';

  import { useI18n } from '@/hooks/web/useI18n';

  import { useTableContext } from '../../hooks/useTableContext';

  defineOptions({ name: 'FullScreenSetting' });

  const table = useTableContext();
  const { t } = useI18n();
  const { toggle, isFullscreen } = useFullscreen(table.wrapRef);
</script>
