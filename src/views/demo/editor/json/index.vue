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
    { field: 'id', title: 'userId' },
    { field: 'name', title: '名称', search: true },
    {
      field: 'desc',
      title: '备注'
    }
  ]
})
const data = [
  { id: 10001, name: 'Test1', desc: 'T1' },
  { id: 10002, name: 'Test2', desc: 'T11' },
  { id: 10003, name: 'Test3', desc: 'T111' },
  { id: 10004, name: 'Test4', desc: 'T1111' },
  { id: 10005, name: 'Test5', desc: 'T11112' },
  { id: 10006, name: 'Test6', desc: 'T111123' },
  { id: 10007, name: 'Test7', desc: 'T1111234' },
  { id: 10008, name: 'Test8', desc: 'T11112345' },
  { id: 10009, name: 'Test9', desc: 'T111123456' },
  { id: 10010, name: 'Test10', desc: 'T1111234567' },
  { id: 10011, name: 'Test11', desc: 'T11112345678' },
  { id: 10012, name: 'Test12', desc: 'T111123456789' },
  { id: 10013, name: 'Test13', desc: 'T1111234567890' },
  { id: 10014, name: 'Test14', desc: 'T11112345678901' }
]

const { allSchemas } = useCrudSchemas(crudSchema)

const [registerTable] = useXTable({
  allSchemas: allSchemas,
  data: data
})
</script>
