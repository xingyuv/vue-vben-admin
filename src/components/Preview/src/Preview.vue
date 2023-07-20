<template>
  <div :class="prefixCls">
    <Image.PreviewGroup>
      <slot v-if="!imageList || $slots.default"></slot>
      <template v-else>
        <template v-for="item in getImageList" :key="item.src">
          <Image v-bind="item">
            <template v-if="item.placeholder" #placeholder>
              <Image v-bind="item" :src="item.placeholder" :preview="false" />
            </template>
          </Image>
        </template>
      </template>
    </Image.PreviewGroup>
  </div>
</template>
<script lang="ts" setup>
  import { Image } from 'ant-design-vue';
  import type { PropType } from 'vue';
  import { computed } from 'vue';

  import { useDesign } from '@/hooks/web/useDesign';
  import { isString } from '@/utils/is';
  import { propTypes } from '@/utils/propTypes';

  interface ImageProps {
    alt?: string;
    fallback?: string;
    src: string;
    width: string | number;
    height?: string | number;
    placeholder?: string | boolean;
    preview?:
      | boolean
      | {
          visible?: boolean;
          onVisibleChange?: (visible: boolean, prevVisible: boolean) => void;
          getContainer: string | HTMLElement | (() => HTMLElement);
        };
  }

  type ImageItem = string | ImageProps;

  defineOptions({ name: 'ImagePreview' });

  const props = defineProps({
    functional: propTypes.bool,
    imageList: {
      type: Array as PropType<ImageItem[]>,
      default: () => [],
    },
  });

  const { prefixCls } = useDesign('image-preview');

  const getImageList = computed((): any[] => {
    const { imageList } = props;
    if (!imageList) {
      return [];
    }
    return imageList.map((item) => {
      if (isString(item)) {
        return {
          src: item,
          placeholder: false,
        };
      }
      return item;
    });
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-image-preview';

  .@{prefix-cls} {
    .ant-image {
      margin-right: 10px;
    }

    .ant-image-preview-operations {
      background-color: rgb(0 0 0 / 40%);
    }
  }
</style>
