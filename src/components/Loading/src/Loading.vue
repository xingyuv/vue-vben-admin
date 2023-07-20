<template>
  <section
    v-show="loading"
    class="full-loading"
    :class="{ absolute, [theme]: !!theme }"
    :style="[background ? `background-color: ${background}` : '']"
  >
    <Spin v-bind="$attrs" :tip="tip" :size="size" :spinning="loading" />
  </section>
</template>
<script lang="ts" setup>
  import { Spin } from 'ant-design-vue';
  import { PropType } from 'vue';

  import { SizeEnum } from '@/enums/sizeEnum';

  defineOptions({ name: 'Loading' });

  defineProps({
    tip: {
      type: String as PropType<string>,
      default: '',
    },
    size: {
      type: String as PropType<SizeEnum>,
      default: SizeEnum.LARGE,
      validator: (v: SizeEnum): boolean => {
        return [SizeEnum.DEFAULT, SizeEnum.SMALL, SizeEnum.LARGE].includes(v);
      },
    },
    absolute: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    loading: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    background: {
      type: String as PropType<string>,
      default: '',
    },
    theme: {
      type: String as PropType<'dark' | 'light'>,
      default: 'light',
    },
  });
</script>
<style lang="less" scoped>
  .full-loading {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgb(240 242 245 / 40%);

    &.absolute {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 300;
    }
  }

  html[data-theme='dark'] {
    .full-loading:not(.light) {
      background-color: #fff;
    }
  }

  .full-loading.dark {
    background-color: #fff;
  }
</style>
