<template>
  <div>
    <XTable ref="xGrid" @register="registerTable">
      <template #toolbar_buttons>
        <a-button type="primary" @click="handleCreate"> 新增角色 </a-button>
      </template>
      <template #actionbtns_default="{ row }">
        <a-button type="link" @click="handleEdit(row)">
          <Icon icon="clarity:note-edit-line" />
        </a-button>
        <a-button type="link" @click="handleDelete(row)">
          <Icon icon="ant-design:delete-outlined" />
        </a-button>
      </template>
    </XTable>
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script setup lang="ts" name="RoleManagement">
import { useXTable, XTable } from '@/components/XTable'
import { getRoleListByPage } from '@/api/demo/system'
import { useDrawer } from '@/components/Drawer'
import RoleDrawer from './RoleDrawer.vue'
import { allSchemas } from './role.data'
import { Icon } from '@/components/Icon'

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
