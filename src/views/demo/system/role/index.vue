<template>
  <PageWrapper>
    <XTable ref="xGrid" @register="registerTable">
      <template #toolbar_buttons>
        <a-button type="primary" @click="handleCreate"> 新增角色 </a-button>
      </template>
      <template #actionbtns_default="{ row }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, row),
              tooltip: '编辑'
            },
            {
              icon: 'ep:view',
              onClick: handleEdit.bind(null, row),
              tooltip: '详情'
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              tooltip: '删除',
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
import { TableAction } from '@/components/Table'
import { useXTable, XTable } from '@/components/XTable'
import { getRoleListByPage } from '@/api/demo/system'
import { useDrawer } from '@/components/Drawer'
import RoleDrawer from './RoleDrawer.vue'
import { allSchemas } from './role.data'
import { PageWrapper } from '@/components/Page'

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

function handleEdit(record: Recordable) {
  openDrawer(true, {
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
