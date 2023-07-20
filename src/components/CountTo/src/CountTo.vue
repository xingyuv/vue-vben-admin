<template>
  <span :style="{ color }">
    {{ value }}
  </span>
</template>
<script lang="ts" setup>
  import { TransitionPresets, useTransition } from '@vueuse/core';
  import { computed, onMounted, ref, unref, watch, watchEffect } from 'vue';

  import { isNumber } from '@/utils/is';
  import { propTypes } from '@/utils/propTypes';

  defineOptions({ name: 'CountTo' });

  const props = defineProps({
    startVal: propTypes.number.def(0),
    endVal: propTypes.number.def(2023),
    duration: propTypes.number.def(1500),
    autoplay: propTypes.bool.def(true),
    decimals: {
      type: Number,
      default: 0,
      validator(value: number) {
        return value >= 0;
      },
    },
    prefix: propTypes.string.def(''),
    suffix: propTypes.string.def(''),
    separator: propTypes.string.def(','),
    decimal: propTypes.string.def('.'),
    /**
     * font color
     */
    color: propTypes.string,
    /**
     * Turn on digital animation
     */
    useEasing: propTypes.bool.def(true),
    /**
     * Digital animation
     */
    transition: propTypes.string.def('linear'),
  });

  const emit = defineEmits(['onStarted', 'onFinished']);

  const source = ref(props.startVal);
  const disabled = ref(false);
  let outputValue = useTransition(source);

  const value = computed(() => formatNumber(unref(outputValue)));

  watchEffect(() => {
    source.value = props.startVal;
  });

  watch([() => props.startVal, () => props.endVal], () => {
    if (props.autoplay) {
      start();
    }
  });

  onMounted(() => {
    props.autoplay && start();
  });

  function start() {
    run();
    source.value = props.endVal;
  }

  function reset() {
    source.value = props.startVal;
    run();
  }

  function run() {
    outputValue = useTransition(source, {
      disabled,
      duration: props.duration,
      onFinished: () => emit('onFinished'),
      onStarted: () => emit('onStarted'),
      ...(props.useEasing ? { transition: TransitionPresets[props.transition] } : {}),
    });
  }

  function formatNumber(num: number | string) {
    if (!num && num !== 0) {
      return '';
    }
    const { decimals, decimal, separator, suffix, prefix } = props;
    num = Number(num).toFixed(decimals);
    num += '';

    const x = num.split('.');
    let x1 = x[0];
    const x2 = x.length > 1 ? decimal + x[1] : '';

    const rgx = /(\d+)(\d{3})/;
    if (separator && !isNumber(separator)) {
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + separator + '$2');
      }
    }
    return prefix + x1 + x2 + suffix;
  }
</script>
