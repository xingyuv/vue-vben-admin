<template>
  <vue-json-pretty :path="'res'" :deep="3" :showLength="true" :data="data" />
</template>

<script lang="ts" setup>
  import 'vue-json-pretty/lib/styles.css';

  import VueJsonPretty from 'vue-json-pretty';

  import { propTypes } from '@/utils/propTypes';

  defineProps({
    data: propTypes.object,
  });
</script>
