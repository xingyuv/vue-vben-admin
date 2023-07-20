<template>
  <div class="table-settings">
    <RedoSetting v-if="getSetting.redo" :getPopupContainer="getTableContainer" />
    <SizeSetting v-if="getSetting.size" :getPopupContainer="getTableContainer" />
    <ColumnSetting
      v-if="getSetting.setting"
      :getPopupContainer="getTableContainer"
      @columns-change="handleColumnChange"
    />
    <FullScreenSetting v-if="getSetting.fullScreen" :getPopupContainer="getTableContainer" />
  </div>
</template>
<script lang="ts" setup>
  import type { PropType } from 'vue';
  import { computed, unref } from 'vue';

  import { useTableContext } from '../../hooks/useTableContext';
  import type { ColumnChangeParam, TableSetting } from '../../types/table';
  import ColumnSetting from './ColumnSetting.vue';
  import FullScreenSetting from './FullScreenSetting.vue';
  import RedoSetting from './RedoSetting.vue';
  import SizeSetting from './SizeSetting.vue';

  defineOptions({ name: 'TableSetting' });

  const props = defineProps({
    setting: {
      type: Object as PropType<TableSetting>,
      default: () => ({}),
    },
  });

  const emit = defineEmits(['columnsChange']);

  const table = useTableContext();

  const getSetting = computed((): TableSetting => {
    return {
      redo: true,
      size: true,
      setting: true,
      fullScreen: false,
      ...props.setting,
    };
  });

  function handleColumnChange(data: ColumnChangeParam[]) {
    emit('columnsChange', data);
  }

  function getTableContainer() {
    return table ? unref(table.wrapRef) : document.body;
  }
</script>
<style lang="less">
  .table-settings {
    & > * {
      margin-right: 12px;
    }

    svg {
      width: 1.3em;
      height: 1.3em;
    }
  }
</style>
