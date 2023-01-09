<template>
  <PageWrapper>
    <XTable @register="registerTable">
      <template #toolbar_buttons>
        <a-button type="primary" @click="handleCreate"> 新增部门 </a-button>
      </template>
      <template #actionbtns_default="{ row }">
        <a-button type="link" preIcon="clarity:note-edit-line" @click="handleEdit(row)" />
        <a-button type="link" preIcon="ant-design:delete-outlined" @click="handleDelete(row)" />
      </template>
    </XTable>
    <DeptModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script setup lang="ts" name="DeptManagement">
import DeptModal from './DeptModal.vue'
import { useModal } from '@/components/Modal'
import { PageWrapper } from '@/components/Page'
import { useXTable, XTable } from '@/components/XTable'
import { allSchemas } from './dept.data'
import { getDeptList } from '@/api/demo/system'

const treeConfig = {
  transform: false,
  rowField: 'menuName',
  expandAll: false
}

const [registerModal, { openModal }] = useModal()
const [registerTable, { reload }] = useXTable({
  treeConfig: treeConfig,
  allSchemas: allSchemas,
  getListApi: getDeptList,
  pagination: true
})

function handleCreate() {
  openModal(true, {
    isUpdate: false
  })
}

function handleEdit(record: Recordable) {
  openModal(true, {
    record,
    isUpdate: true
  })
}

function handleDelete(record: Recordable) {
  console.log(record)
}

function handleSuccess() {
  reload()
}
</script>
