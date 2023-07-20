<template>
  <div :class="prefixCls">
    <span> {{ title }}</span>
    <Select
      v-bind="getBindValue"
      :class="`${prefixCls}-select`"
      :disabled="disabled"
      size="small"
      :options="options"
      @change="handleChange"
    />
  </div>
</template>
<script lang="ts" setup>
  import { Select } from 'ant-design-vue';
  import { computed, PropType } from 'vue';

  import { useDesign } from '@/hooks/web/useDesign';

  import { HandlerEnum } from '../enum';
  import { baseHandler } from '../handler';

  defineOptions({ name: 'SelectItem' });

  const props = defineProps({
    event: {
      type: Number as PropType<HandlerEnum>,
      default: null,
    },
    disabled: {
      type: Boolean,
    },
    title: {
      type: String,
      default: '',
    },
    def: {
      type: [String, Number] as PropType<string | number>,
      default: null,
    },
    initValue: {
      type: [String, Number] as PropType<string | number>,
      default: null,
    },
    options: {
      type: Array as PropType<LabelValueOptions>,
      default: () => [],
    },
  });

  const { prefixCls } = useDesign('setting-select-item');
  const getBindValue = computed(() => {
    return props.def ? { value: props.def, defaultValue: props.initValue || props.def } : {};
  });

  function handleChange(e: ChangeEvent) {
    props.event && baseHandler(props.event, e);
  }
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-setting-select-item';

  .@{prefix-cls} {
    display: flex;
    justify-content: space-between;
    margin: 16px 0;

    &-select {
      width: 126px;
    }
  }
</style>
