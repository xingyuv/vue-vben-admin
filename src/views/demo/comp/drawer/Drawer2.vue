<template>
  <BasicDrawer v-bind="$attrs" @register="register" title="Drawer Title" width="50%">
    Drawer Info.
    <a-button type="primary" @click="closeDrawer"> 内部关闭drawer </a-button>
  </BasicDrawer>
</template>
<script setup lang="ts">
import { BasicDrawer, useDrawerInner } from '@/components/Drawer'

const [register, { closeDrawer }] = useDrawerInner()
</script>
