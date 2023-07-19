<template>
  <div class="p-5">
    多层级缓存-页面1-2
    <br />
    <Input />
  </div>
</template>
<script lang="ts">
  import { Input } from 'ant-design-vue';
  import { defineComponent } from 'vue';

  export default defineComponent({ name: 'Menu12Demo', components: { Input } });
</script>
