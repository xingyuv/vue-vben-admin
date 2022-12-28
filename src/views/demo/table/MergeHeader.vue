<template>
  <div class="p-4">
    <BasicTable @register="registerTable" />
  </div>
</template>
<script setup lang="ts">
import { BasicTable, useTable } from '@/components/Table'
import { getMergeHeaderColumns } from './tableData'
import { demoListApi } from '@/api/demo/table'

const [registerTable] = useTable({
  title: '多级表头示例',
  api: demoListApi,
  columns: getMergeHeaderColumns()
})
</script>
