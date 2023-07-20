<template>
  <span v-if="getShowTag" :class="getTagClass">{{ getContent }}</span>
</template>
<script lang="ts" setup>
  import { computed, PropType } from 'vue';

  import { useDesign } from '@/hooks/web/useDesign';
  import type { Menu } from '@/router/types';
  import { propTypes } from '@/utils/propTypes';

  defineOptions({ name: 'SimpleMenuTag' });

  const props = defineProps({
    item: {
      type: Object as PropType<Menu>,
      default: () => ({}),
    },
    dot: propTypes.bool,
    collapseParent: propTypes.bool,
  });

  const { prefixCls } = useDesign('simple-menu');

  const getShowTag = computed(() => {
    const { item } = props;

    if (!item) return false;

    const { tag } = item;
    if (!tag) return false;

    const { dot, content } = tag;
    if (!dot && !content) return false;
    return true;
  });

  const getContent = computed(() => {
    if (!getShowTag.value) return '';
    const { item, collapseParent } = props;
    const { tag } = item;
    if (tag) {
      const { dot, content } = tag;
      return dot || collapseParent ? '' : content;
    } else {
      return '';
    }
  });

  const getTagClass = computed(() => {
    const { item, collapseParent } = props;
    const { tag = {} } = item || {};
    const { dot, type = 'error' } = tag;
    const tagCls = `${prefixCls}-tag`;
    return [
      tagCls,

      [`${tagCls}--${type}`],
      {
        [`${tagCls}--collapse`]: collapseParent,
        [`${tagCls}--dot`]: dot || props.dot,
      },
    ];
  });
</script>
