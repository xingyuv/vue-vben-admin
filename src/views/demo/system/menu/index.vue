<template>
  <ContentWrap>
    <XTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar_buttons>
        <a-button type="primary" @click="handleCreate"> 新增菜单 </a-button>
      </template>
      <template #actionbtns_default="{ row }">
        <a-button type="link" preIcon="clarity:note-edit-line" @click="handleEdit(row)" />
        <a-button type="link" preIcon="ant-design:delete-outlined" @click="handleDelete(row)" />
      </template>
    </XTable>
    <MenuDrawer @register="registerDrawer" @success="handleSuccess" />
  </ContentWrap>
</template>
<script setup lang="ts" name="MenuManagement">
import { nextTick } from 'vue'
import MenuDrawer from './MenuDrawer.vue'
import { useDrawer } from '@/components/Drawer'
import { ContentWrap } from '@/components/Page'
import { useXTable, XTable } from '@/components/XTable'
import { allSchemas } from './menu.data'
import { getMenuList } from '@/api/demo/system'

const treeConfig = {
  transform: false,
  rowField: 'menuName',
  expandAll: false
}

const [registerDrawer, { openDrawer }] = useDrawer()
const [registerTable, { reload }] = useXTable({
  treeConfig: treeConfig,
  allSchemas: allSchemas,
  getListApi: getMenuList,
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

function onFetchSuccess() {
  // 演示默认展开所有表项
  nextTick()
  console.info(1)
}
</script>
