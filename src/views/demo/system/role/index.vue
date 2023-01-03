<template>
  <PageWrapper>
    <XTable @register="registerTable">
      <template #toolbar_buttons>
        <a-button type="primary" @click="handleCreate"> 新增角色 </a-button>
      </template>
      <template #actionbtns_default="{ row }">
        <XTableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, row)
            },
            {
              icon: 'ep:view',
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
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
  </PageWrapper>
</template>
<script setup lang="ts" name="RoleManagement">
import RoleDrawer from './RoleDrawer.vue'
import { useDrawer } from '@/components/Drawer'
import { PageWrapper } from '@/components/Page'
import { useXTable, XTable, XTableAction } from '@/components/XTable'
import { allSchemas } from './role.data'
import { getRoleListByPage } from '@/api/demo/system'

const [registerDrawer, { openDrawer }] = useDrawer()
const [registerTable, { reload }] = useXTable({
  allSchemas: allSchemas,
  getListApi: getRoleListByPage,
  pagination: true
})

function handleCreate() {
  openDrawer(true, {
    isUpdate: false
  })
}

function handleEdit(row: Recordable) {
  openDrawer(true, {
    row,
    isUpdate: true
  })
}

function handleDelete(row: Recordable) {
  console.log(row)
}

function handleSuccess() {
  reload()
}
</script>
