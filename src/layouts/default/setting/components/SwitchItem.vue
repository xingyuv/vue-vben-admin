<template>
  <div :class="prefixCls">
    <span> {{ title }}</span>
    <Switch
      v-bind="getBindValue"
      :disabled="disabled"
      :checkedChildren="t('layout.setting.on')"
      :unCheckedChildren="t('layout.setting.off')"
      @change="handleChange"
    />
  </div>
</template>
<script lang="ts" setup>
  import { Switch } from 'ant-design-vue';
  import { computed, type PropType } from 'vue';

  import { useDesign } from '@/hooks/web/useDesign';
  import { useI18n } from '@/hooks/web/useI18n';

  import { HandlerEnum } from '../enum';
  import { baseHandler } from '../handler';

  defineOptions({ name: 'SwitchItem' });

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
      type: Boolean,
    },
  });

  const { prefixCls } = useDesign('setting-switch-item');
  const { t } = useI18n();

  const getBindValue = computed(() => {
    return props.def ? { checked: props.def } : {};
  });
  function handleChange(e: ChangeEvent) {
    props.event && baseHandler(props.event, e);
  }
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-setting-switch-item';

  .@{prefix-cls} {
    display: flex;
    justify-content: space-between;
    margin: 16px 0;
  }
</style>
