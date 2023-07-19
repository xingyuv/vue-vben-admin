<template>
  <div :class="getClass" :style="getStyle">
    <div :class="`${prefixCls}-image-wrapper`" :style="getImageWrapperStyle" @click="openModal">
      <div :class="`${prefixCls}-image-mask`" :style="getImageWrapperStyle">
        <Icon
          icon="ant-design:cloud-upload-outlined"
          :size="getIconWidth"
          :style="getImageWrapperStyle"
          color="#d6d6d6"
        />
      </div>
      <img v-if="sourceValue" :src="sourceValue" alt="avatar" />
    </div>
    <a-button
      v-if="showBtn"
      :class="`${prefixCls}-upload-btn`"
      v-bind="btnProps"
      @click="openModal"
    >
      {{ btnText ? btnText : t('component.cropper.selectImage') }}
    </a-button>

    <CropperModal
      :uploadApi="uploadApi"
      :src="sourceValue"
      @register="register"
      @upload-success="handleUploadSuccess"
    />
  </div>
</template>
<script lang="ts" setup>
  import { computed, CSSProperties, PropType, ref, unref, watch, watchEffect } from 'vue';

  import type { ButtonProps } from '@/components/Button';
  import Icon from '@/components/Icon/Icon.vue';
  import { useModal } from '@/components/Modal';
  import { useDesign } from '@/hooks/web/useDesign';
  import { useI18n } from '@/hooks/web/useI18n';
  import { useMessage } from '@/hooks/web/useMessage';
  import { propTypes } from '@/utils/propTypes';

  import CropperModal from './CropperModal.vue';

  defineOptions({ name: 'CropperAvatar' });

  interface apiFunParams {
    file: Blob;
    name: string;
  }

  const props = defineProps({
    width: { type: [String, Number], default: '200px' },
    value: propTypes.string,
    showBtn: propTypes.bool.def(true),
    btnProps: { type: Object as PropType<ButtonProps>, default: () => {} },
    btnText: { type: String, default: '' },
    uploadApi: {
      type: Function as PropType<(params: apiFunParams) => Promise<void>>,
      default: null,
    },
  });

  const emit = defineEmits(['update:value', 'change']);

  const sourceValue = ref(props.value || '');
  const { prefixCls } = useDesign('cropper-avatar');
  const [register, { openModal, closeModal }] = useModal();
  const { createMessage } = useMessage();
  const { t } = useI18n();

  const getClass = computed(() => [prefixCls]);

  const getWidth = computed(() => `${props.width}`.replace(/px/, '') + 'px');

  const getIconWidth = computed(() => parseInt(`${props.width}`.replace(/px/, '')) / 2 + 'px');

  const getStyle = computed((): CSSProperties => ({ width: unref(getWidth) }));

  const getImageWrapperStyle = computed(
    (): CSSProperties => ({ width: unref(getWidth), height: unref(getWidth) }),
  );

  watchEffect(() => {
    sourceValue.value = props.value || '';
  });

  watch(
    () => sourceValue.value,
    (v: string) => {
      emit('update:value', v);
    },
  );

  function handleUploadSuccess({ source, data }) {
    sourceValue.value = source;
    emit('change', { source, data });
    createMessage.success(t('component.cropper.uploadSuccess'));
  }

  defineExpose({ openModal: openModal.bind(null, true), closeModal });
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-cropper-avatar';

  .@{prefix-cls} {
    display: inline-block;
    text-align: center;

    &-image-wrapper {
      overflow: hidden;
      cursor: pointer;
      background: @component-background;
      border: 1px solid @border-color-base;
      border-radius: 50%;

      img {
        width: 100%;
      }
    }

    &-image-mask {
      position: absolute;
      width: inherit;
      height: inherit;
      cursor: pointer;
      background: rgb(0 0 0 / 40%);
      border: inherit;
      border-radius: inherit;
      opacity: 0;
      transition: opacity 0.4s;

      ::v-deep(svg) {
        margin: auto;
      }
    }

    &-image-mask:hover {
      opacity: 40;
    }

    &-upload-btn {
      margin: 10px auto;
    }
  }
</style>
