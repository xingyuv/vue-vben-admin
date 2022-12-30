<template>
  <div class="p-2">
    <XTable ref="xGrid" @register="registerTable" />
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useXTable, XTable } from '@/components/XTable'
import { useCrudSchemas, VxeCrudSchema } from '@/hooks/web/useCrudSchemas'

const xGrid = ref()

const crudSchema = reactive<VxeCrudSchema>({
  columns: [
    { field: 'userId', title: 'id' },
    { field: 'username', title: '名称' },
    {
      field: 'desc',
      title: '备注'
    }
  ]
})

const { allSchemas } = useCrudSchemas(crudSchema)

const [registerTable] = useXTable({
  allSchemas: allSchemas,
  border: 'inner',
  params: {
    i: 'role',
    a: 'list'
  },
  pagination: true,
  align: 'center'
})
</script>
