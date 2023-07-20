<template>
  <div @click="openDrawer(true)">
    <Icon icon="ion:settings-outline" />
    <SettingDrawer @register="register" />
  </div>
</template>
<script lang="ts" setup>
  import { useDrawer } from '@/components/Drawer';
  import Icon from '@/components/Icon/Icon.vue';

  import SettingDrawer from './SettingDrawer';

  defineOptions({ name: 'SettingButton' });

  const [register, { openDrawer }] = useDrawer();
</script>
