<template>
  <div class="p-2">
    <XTable ref="xGrid" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { XTable } from '@/components/XTable'

const xGrid = ref()
</script>
