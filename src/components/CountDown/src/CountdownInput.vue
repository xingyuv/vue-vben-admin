<template>
  <a-input v-bind="$attrs" :class="prefixCls" :size="size" :value="state">
    <template #addonAfter>
      <CountButton :size="size" :count="count" :value="state" :beforeStartFunc="sendCodeApi" />
    </template>
    <template v-for="item in Object.keys($slots).filter((k) => k !== 'addonAfter')" #[item]="data">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </a-input>
</template>
<script lang="ts" setup>
  import type { PropType } from 'vue';

  import { useRuleFormItem } from '@/hooks/component/useFormItem';
  import { useDesign } from '@/hooks/web/useDesign';
  import { propTypes } from '@/utils/propTypes';

  import CountButton from './CountButton.vue';

  defineOptions({
    name: 'CountDownInput',
    inheritAttrs: false,
  });

  const props = defineProps({
    value: propTypes.string,
    size: {
      type: String,
      validator: (v: string) => ['default', 'large', 'small'].includes(v),
      default: 'default',
    },
    count: propTypes.number.def(60),
    sendCodeApi: {
      type: Function as PropType<() => Promise<boolean>>,
      default: null,
    },
  });

  const { prefixCls } = useDesign('countdown-input');
  const [state] = useRuleFormItem(props);
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-countdown-input';

  .@{prefix-cls} {
    .ant-input-group-addon {
      padding-right: 0;
      background-color: transparent;
      border: none;

      button {
        font-size: 14px;
      }
    }
  }
</style>
