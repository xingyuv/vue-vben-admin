<template>
  <ContentWrap>
    <XTable @register="registerTable">
      <template #toolbar_buttons>
        <a-button type="primary" @click="handleCreate"> 新增角色 </a-button>
      </template>
      <template #actionbtns_default="{ row }">
        <a-button type="link" preIcon="clarity:note-edit-line" @click="handleEdit(row)" />
        <a-button type="link" preIcon="ep:view" @click="handleEdit(row)" />
        <a-button type="link" preIcon="ant-design:delete-outlined" @click="handleDelete(row)" />
      </template>
    </XTable>
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
  </ContentWrap>
</template>
<script setup lang="ts" name="RoleManagement">
import RoleDrawer from './RoleDrawer.vue'
import { useDrawer } from '@/components/Drawer'
import { ContentWrap } from '@/components/Page'
import { useXTable, XTable } from '@/components/XTable'
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
