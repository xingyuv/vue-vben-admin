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
        <TableSetting
          v-if="showTableSetting"
          :setting="tableSetting"
          @columns-change="handleColumnChange"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { Divider } from 'ant-design-vue';
  import type { PropType } from 'vue';
  import { defineComponent } from 'vue';

  import { useDesign } from '@/hooks/web/useDesign';

  import type { ColumnChangeParam, TableSetting } from '../types/table';
  import TableSettingComponent from './settings/index.vue';
  import TableTitle from './TableTitle.vue';

  export default defineComponent({
    name: 'BasicTableHeader',
    components: {
      Divider,
      TableTitle,
      TableSetting: TableSettingComponent,
    },
    props: {
      title: {
        type: [Function, String] as PropType<string | ((data) => string)>,
      },
      tableSetting: {
        type: Object as PropType<TableSetting>,
      },
      showTableSetting: {
        type: Boolean,
      },
      titleHelpMessage: {
        type: [String, Array] as PropType<string | string[]>,
        default: '',
      },
    },
    emits: ['columns-change'],
    setup(_, { emit }) {
      const { prefixCls } = useDesign('basic-table-header');
      function handleColumnChange(data: ColumnChangeParam[]) {
        emit('columns-change', data);
      }
      return { prefixCls, handleColumnChange };
    },
  });
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
