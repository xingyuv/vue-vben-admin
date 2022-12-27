<template>
  <div :class="[`${prefixCls}__header px-2 py-5`, $attrs.class]">
    <BasicTitle :helpMessage="helpMessage" normal>
      <template v-if="title">
        {{ title }}
      </template>
      <template v-else>
        <slot name="title"></slot>
      </template>
    </BasicTitle>
    <div :class="`${prefixCls}__action`">
      <slot name="action"></slot>
      <BasicArrow v-if="canExpan" up :expand="show" @click="$emit('expand')" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { BasicArrow, BasicTitle } from '@/components/Basic'
defineProps({
  prefixCls: { type: String },
  helpMessage: {
    type: [Array, String] as PropType<string[] | string>,
    default: ''
  },
  title: { type: String },
  show: { type: Boolean },
  canExpan: { type: Boolean }
})
defineEmits(['expand'])
</script>
