<template>
  <BasicTitle :helpMessage="helpMessage">
    {{ title }}
  </BasicTitle>
</template>
<script setup lang="ts" name="BasicModalHeader">
import type { PropType } from 'vue'
import { BasicTitle } from '@/components/Basic'

defineProps({
  helpMessage: {
    type: [String, Array] as PropType<string | string[]>
  },
  title: { type: String }
})
defineEmits(['dblclick'])
</script>
