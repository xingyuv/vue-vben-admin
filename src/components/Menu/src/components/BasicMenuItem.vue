<template>
  <MenuItem :key="item.path">
    <MenuItemContent v-bind="$props" :item="item" />
  </MenuItem>
</template>
<script setup lang="ts" name="BasicMenuItem">
import { MenuItem } from 'ant-design-vue'
import { itemProps } from '../props'
import MenuItemContent from './MenuItemContent.vue'

defineProps(itemProps)
</script>
