<template>
  <div class="p-4">
    <template v-for="src in imgList" :key="src">
      <img v-show="false" :src="src" alt="" />
    </template>
    <DetailModal :info="rowInfo" @register="registerModal" />
    <BasicTable class="error-handle-table" @register="register">
      <template #toolbar>
        <a-button type="primary" @click="fireVueError">
          {{ t('sys.errorLog.fireVueError') }}
        </a-button>
        <a-button type="primary" @click="fireResourceError">
          {{ t('sys.errorLog.fireResourceError') }}
        </a-button>
        <a-button type="primary" @click="fireAjaxError">
          {{ t('sys.errorLog.fireAjaxError') }}
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                label: t('sys.errorLog.tableActionDesc'),
                onClick: handleDetail.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
  </div>
</template>

<script lang="ts" setup>
  import { cloneDeep } from 'lodash-es';
  import { nextTick, ref, watch } from 'vue';

  import { fireErrorApi } from '@/api/demo/error';
  import { useModal } from '@/components/Modal';
  import { BasicTable, TableAction, useTable } from '@/components/Table/index';
  import { useI18n } from '@/hooks/web/useI18n';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useErrorLogStore } from '@/store/modules/errorLog';
  import type { ErrorLogInfo } from '#/store';

  import { getColumns } from './data';
  import DetailModal from './DetailModal.vue';

  const rowInfo = ref<ErrorLogInfo>();
  const imgList = ref<string[]>([]);

  const { t } = useI18n();
  const errorLogStore = useErrorLogStore();
  const [register, { setTableData }] = useTable({
    title: t('sys.errorLog.tableTitle'),
    columns: getColumns(),
    actionColumn: {
      width: 80,
      title: 'Action',
      dataIndex: 'action',
      // slots: { customRender: 'action' },
    },
  });
  const [registerModal, { openModal }] = useModal();

  watch(
    () => errorLogStore.getErrorLogInfoList,
    (list) => {
      nextTick(() => {
        setTableData(cloneDeep(list));
      });
    },
    {
      immediate: true,
    },
  );
  const { createMessage } = useMessage();
  if (import.meta.env.DEV) {
    createMessage.info(t('sys.errorLog.enableMessage'));
  }
  // 查看详情
  function handleDetail(row: ErrorLogInfo) {
    rowInfo.value = row;
    openModal(true);
  }

  function fireVueError() {
    throw new Error('fire vue error!');
  }

  function fireResourceError() {
    imgList.value.push(`${new Date().getTime()}.png`);
  }

  async function fireAjaxError() {
    await fireErrorApi();
  }
</script>
