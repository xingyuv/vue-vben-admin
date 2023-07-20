<template>
  <BasicTitle :helpMessage="helpMessage">
    {{ title }}
  </BasicTitle>
</template>
<script lang="ts" setup>
  import type { PropType } from 'vue';

  import { BasicTitle } from '@/components/Basic';
  import { propTypes } from '@/utils/propTypes';

  defineOptions({ name: 'BasicModalHeader' });

  defineProps({
    helpMessage: {
      type: [String, Array] as PropType<string | string[]>,
      default: null,
    },
    title: propTypes.string,
  });
</script>
