<template>
  <div class="p-2">
    <XTable ref="xGrid" @register="registerTable" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useXTable, XColumns, XTable } from '@/components/XTable'

const xGrid = ref()

const columns: XColumns = [
  { field: 'userId', title: 'id', width: 100 },
  { field: 'username', title: '名称', width: 150 },
  {
    field: 'desc',
    title: '备注',
    width: 150
  }
]
const [registerTable] = useXTable({
  title: '角色列表',
  border: true,
  params: {
    i: 'role',
    a: 'list'
  },
  stripe: true,
  pagination: true,
  align: 'center',
  columns
})
</script>
