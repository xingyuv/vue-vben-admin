<template>
  <PageWrapper>
    <XTable @register="registerTable">
      <template #toolbar_buttons>
        <a-button type="primary" @click="handleCreate"> 新增部门 </a-button>
      </template>
      <template #actionbtns_default="{ row }">
        <XTableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, row)
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                placement: 'left',
                confirm: handleDelete.bind(null, row)
              }
            }
          ]"
        />
      </template>
    </XTable>
    <DeptModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script setup lang="ts" name="DeptManagement">
import DeptModal from './DeptModal.vue'
import { useModal } from '@/components/Modal'
import { PageWrapper } from '@/components/Page'
import { useXTable, XTable, XTableAction } from '@/components/XTable'
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
