<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <DeptTree class="w-1/4 xl:w-1/5" @select="handleSelect" />
    <XTable @register="registerTable" class="w-3/4 xl:w-4/5" :searchInfo="searchInfo">
      <template #toolbar_buttons>
        <a-button type="primary" @click="handleCreate">新增账号</a-button>
      </template>
      <template #actionbtns_default="{ row }">
        <XTableAction
          :actions="[
            {
              icon: 'clarity:info-standard-line',
              onClick: handleView.bind(null, row)
            },
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
    <AccountModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script setup lang="ts" name="AccountManagement">
import { reactive } from 'vue'
import { useXTable, XTable, XTableAction } from '@/components/XTable'
import { getAccountList } from '@/api/demo/system'
import { PageWrapper } from '@/components/Page'
import DeptTree from './DeptTree.vue'
import { useModal } from '@/components/Modal'
import AccountModal from './AccountModal.vue'
import { allSchemas } from './account.data'
import { useGo } from '@/hooks/web/usePage'

const go = useGo()
const [registerModal, { openModal }] = useModal()
const searchInfo = reactive<Recordable>({})
const [registerTable, { reload }] = useXTable({
  allSchemas: allSchemas,
  getListApi: getAccountList,
  params: searchInfo,
  pagination: true
})

function handleCreate() {
  openModal(true, {
    isUpdate: false
  })
}

function handleEdit(row: Recordable) {
  console.log(row)
  openModal(true, {
    row,
    isUpdate: true
  })
}

function handleDelete(row: Recordable) {
  console.log(row)
}

function handleSuccess({ isUpdate, values }) {
  if (isUpdate) {
    // 演示不刷新表格直接更新内部数据。
    // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
    console.log(values)
  } else {
    reload()
  }
}

function handleSelect(deptId = '') {
  searchInfo.deptId = deptId
  reload()
}

function handleView(record: Recordable) {
  go('/system/account_detail/' + record.id)
}
</script>
