<template>
  <div style="width: 100%">
    <div v-if="$slots.headerTop" style="margin: 5px">
      <slot name="headerTop"></slot>
    </div>
    <div class="flex items-center">
      <slot v-if="$slots.tableTitle" name="tableTitle"></slot>
      <TableTitle
        v-if="!$slots.tableTitle && title"
        :helpMessage="titleHelpMessage"
        :title="title"
      />
      <div :class="`${prefixCls}__toolbar`">
        <slot name="toolbar"></slot>
        <Divider v-if="$slots.toolbar && showTableSetting" type="vertical" />
        <TableSettingComponent
          v-if="showTableSetting"
          :setting="tableSetting"
          @columns-change="handleColumnChange"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { Divider } from 'ant-design-vue';
  import type { PropType } from 'vue';

  import { useDesign } from '@/hooks/web/useDesign';

  import type { ColumnChangeParam, TableSetting } from '../types/table';
  import TableSettingComponent from './settings/index.vue';
  import TableTitle from './TableTitle.vue';

  defineOptions({ name: 'BasicTableHeader' });

  defineProps({
    title: {
      type: [Function, String] as PropType<string | ((data) => string)>,
      default: '',
    },
    tableSetting: {
      type: Object as PropType<TableSetting>,
      default: () => {},
    },
    showTableSetting: {
      type: Boolean,
    },
    titleHelpMessage: {
      type: [String, Array] as PropType<string | string[]>,
      default: '',
    },
  });

  const emit = defineEmits(['columnsChange']);

  const { prefixCls } = useDesign('basic-table-header');
  function handleColumnChange(data: ColumnChangeParam[]) {
    emit('columnsChange', data);
  }
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-basic-table-header';

  .@{prefix-cls} {
    &__toolbar {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;

      > * {
        margin-right: 8px;
      }
    }
  }
</style>
