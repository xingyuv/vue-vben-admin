<template>
  <span>
    <slot></slot>
    {{ title }}
    <FormOutlined />
  </span>
</template>
<script setup lang="ts" name="EditTableHeaderIcon">
import { FormOutlined } from '@ant-design/icons-vue'

defineProps({ title: { type: String, default: '' } })
</script>
