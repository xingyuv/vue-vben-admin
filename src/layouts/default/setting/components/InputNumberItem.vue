<template>
  <div :class="prefixCls">
    <span> {{ title }}</span>
    <InputNumber
      v-bind="$attrs"
      size="small"
      :class="`${prefixCls}-input-number`"
      @change="handleChange"
    />
  </div>
</template>
<script lang="ts" setup>
  import { InputNumber } from 'ant-design-vue';
  import type { PropType } from 'vue';

  import { useDesign } from '@/hooks/web/useDesign';

  import { HandlerEnum } from '../enum';
  import { baseHandler } from '../handler';

  defineOptions({ name: 'InputNumberItem' });

  const props = defineProps({
    event: {
      type: Number as PropType<HandlerEnum>,
      default: null,
    },
    title: {
      type: String,
      default: '',
    },
  });

  const { prefixCls } = useDesign('setting-input-number-item');

  function handleChange(e) {
    props.event && baseHandler(props.event, e);
  }
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-setting-input-number-item';

  .@{prefix-cls} {
    display: flex;
    justify-content: space-between;
    margin: 16px 0;

    &-input-number {
      width: 126px !important;
    }
  }
</style>
