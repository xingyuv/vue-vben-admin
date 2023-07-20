<template>
  <BasicModal
    width="800px"
    :title="t('component.upload.preview')"
    class="upload-preview-modal"
    v-bind="$attrs"
    :showOkBtn="false"
    @register="register"
  >
    <FileList :dataSource="fileListRef" :columns="columns" :actionColumn="actionColumn" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, watch } from 'vue';

  import { BasicModal, useModalInner } from '@/components/Modal';
  import { useI18n } from '@/hooks/web/useI18n';
  import { downloadByUrl } from '@/utils/file/download';
  import { isArray } from '@/utils/is';

  import { createPreviewActionColumn, createPreviewColumns } from './data';
  //   import { BasicTable, useTable } from '@/components/Table';
  import FileList from './FileList.vue';
  import { previewProps } from './props';
  import { PreviewFileItem } from './typing';

  const props = defineProps(previewProps);

  const emit = defineEmits(['listChange', 'register', 'delete']);

  const [register] = useModalInner();
  const { t } = useI18n();

  const fileListRef = ref<PreviewFileItem[]>([]);
  watch(
    () => props.value,
    (value) => {
      if (!isArray(value)) value = [];
      fileListRef.value = value
        .filter((item) => !!item)
        .map((item) => {
          return {
            url: item,
            type: item.split('.').pop() || '',
            name: item.split('/').pop() || '',
          };
        });
    },
    { immediate: true },
  );

  // 删除
  function handleRemove(record: PreviewFileItem) {
    const index = fileListRef.value.findIndex((item) => item.url === record.url);
    if (index !== -1) {
      const removed = fileListRef.value.splice(index, 1);
      emit('delete', removed[0].url);
      emit(
        'listChange',
        fileListRef.value.map((item) => item.url),
      );
    }
  }

  // // 预览
  // function handlePreview(record: PreviewFileItem) {
  //   const { url = '' } = record;
  //   createImgPreview({
  //     imageList: [url],
  //   });
  // }

  // 下载
  function handleDownload(record: PreviewFileItem) {
    const { url = '' } = record;
    downloadByUrl({ url });
  }

  const columns = createPreviewColumns() as any[];

  const actionColumn = createPreviewActionColumn({ handleRemove, handleDownload }) as any;
</script>
<style lang="less">
  .upload-preview-modal {
    .ant-upload-list {
      display: none;
    }

    .ant-table-wrapper .ant-spin-nested-loading {
      padding: 0;
    }
  }
</style>
