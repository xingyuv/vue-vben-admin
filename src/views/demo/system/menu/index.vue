<template>
  <PageWrapper>
    <XTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar_buttons>
        <a-button type="primary" @click="handleCreate"> 新增菜单 </a-button>
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
    <MenuDrawer @register="registerDrawer" @success="handleSuccess" />
  </PageWrapper>
</template>
<script setup lang="ts" name="MenuManagement">
import { nextTick } from 'vue'
import MenuDrawer from './MenuDrawer.vue'
import { useDrawer } from '@/components/Drawer'
import { PageWrapper } from '@/components/Page'
import { useXTable, XTable, XTableAction } from '@/components/XTable'
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
