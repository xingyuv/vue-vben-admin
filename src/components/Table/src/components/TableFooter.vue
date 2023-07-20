<template>
  <Table
    v-if="summaryFunc || summaryData"
    :showHeader="false"
    :bordered="false"
    :pagination="false"
    :dataSource="getDataSource"
    :rowKey="(r) => r[rowKey]"
    :columns="getColumns"
    tableLayout="fixed"
    :scroll="scroll"
  />
</template>
<script lang="ts" setup>
  import { type Recordable } from '@vben/types';
  import { Table } from 'ant-design-vue';
  import { cloneDeep } from 'lodash-es';
  import type { PropType } from 'vue';
  import { computed, toRaw, unref } from 'vue';

  import { isFunction } from '@/utils/is';
  import { propTypes } from '@/utils/propTypes';

  import { INDEX_COLUMN_FLAG } from '../const';
  import { useTableContext } from '../hooks/useTableContext';
  import type { BasicColumn } from '../types/table';

  const SUMMARY_ROW_KEY = '_row';
  const SUMMARY_INDEX_KEY = '_index';

  defineOptions({ name: 'BasicTableFooter' });

  const props = defineProps({
    summaryFunc: {
      type: Function as PropType<Fn>,
      default: () => {},
    },
    summaryData: {
      type: Array as PropType<Recordable<any>[]>,
      default: () => [],
    },
    scroll: {
      type: Object as PropType<Recordable<any>>,
      default: () => {},
    },
    rowKey: propTypes.string.def('key'),
  });
  const table = useTableContext();

  const getDataSource = computed((): Recordable<any>[] => {
    const { summaryFunc, summaryData } = props;
    if (summaryData?.length) {
      summaryData.forEach((item, i) => (item[props.rowKey] = `${i}`));
      return summaryData;
    }
    if (!isFunction(summaryFunc)) {
      return [];
    }
    let dataSource = toRaw(unref(table.getDataSource()));
    dataSource = summaryFunc(dataSource);
    dataSource.forEach((item, i) => {
      item[props.rowKey] = `${i}`;
    });
    return dataSource;
  });

  const getColumns = computed(() => {
    const dataSource = unref(getDataSource);
    const columns: BasicColumn[] = cloneDeep(table.getColumns());
    const index = columns.findIndex((item) => item.flag === INDEX_COLUMN_FLAG);
    const hasRowSummary = dataSource.some((item) => Reflect.has(item, SUMMARY_ROW_KEY));
    const hasIndexSummary = dataSource.some((item) => Reflect.has(item, SUMMARY_INDEX_KEY));

    if (index !== -1) {
      if (hasIndexSummary) {
        columns[index].customRender = ({ record }) => record[SUMMARY_INDEX_KEY];
        columns[index].ellipsis = false;
      } else {
        Reflect.deleteProperty(columns[index], 'customRender');
      }
    }

    if (table.getRowSelection() && hasRowSummary) {
      const isFixed = columns.some((col) => col.fixed === 'left');
      columns.unshift({
        width: 60,
        title: 'selection',
        key: 'selectionKey',
        align: 'center',
        ...(isFixed ? { fixed: 'left' } : {}),
        customRender: ({ record }) => record[SUMMARY_ROW_KEY],
      });
    }
    return columns;
  });
</script>
