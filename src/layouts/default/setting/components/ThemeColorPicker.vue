<template>
  <div :class="prefixCls">
    <template v-for="color in colorList || []" :key="color">
      <span
        :class="[
          `${prefixCls}__item`,
          {
            [`${prefixCls}__item--active`]: def === color,
          },
        ]"
        :style="{ background: color }"
        @click="handleClick(color)"
      >
        <CheckOutlined />
      </span>
    </template>
  </div>
</template>
<script lang="ts" setup>
  import { CheckOutlined } from '@ant-design/icons-vue';
  import type { PropType } from 'vue';

  import { useDesign } from '@/hooks/web/useDesign';

  import { HandlerEnum } from '../enum';
  import { baseHandler } from '../handler';

  defineOptions({ name: 'ThemeColorPicker' });

  const props = defineProps({
    colorList: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    event: {
      type: Number as PropType<HandlerEnum>,
      default: null,
    },
    def: {
      type: String,
      default: '',
    },
  });

  const { prefixCls } = useDesign('setting-theme-picker');

  function handleClick(color: string) {
    props.event && baseHandler(props.event, color);
  }
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-setting-theme-picker';

  .@{prefix-cls} {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 16px 0;

    &__item {
      width: 20px;
      height: 20px;
      cursor: pointer;
      border: 1px solid #ddd;
      border-radius: 2px;

      svg {
        display: none;
      }

      &--active {
        border: 1px solid lighten(@primary-color, 10%);

        svg {
          display: inline-block;
          margin: 0 0 3px 3px;
          font-size: 12px;
          fill: @white !important;
        }
      }
    }
  }
</style>
