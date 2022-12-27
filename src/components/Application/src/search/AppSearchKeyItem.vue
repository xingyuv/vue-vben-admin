<template>
  <span :class="$attrs.class">
    <Icon :icon="icon" />
  </span>
</template>
<script setup lang="ts">
import { Icon } from '@/components/Icon'
defineProps({
  icon: String
})
</script>
