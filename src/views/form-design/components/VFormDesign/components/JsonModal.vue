<!--
 * @Description: 渲染JSON数据
-->
<template>
  <Modal
    title="JSON数据"
    :footer="null"
    :open="open"
    :destroyOnClose="true"
    wrapClassName="v-code-modal"
    style="top: 20px"
    width="850px"
    @cancel="handleCancel"
  >
    <PreviewCode :editorJson="editorJson" />
  </Modal>
</template>
<script lang="ts">
  import { Modal } from 'ant-design-vue';
  import { computed, defineComponent, reactive, toRefs } from 'vue';

  import { IFormConfig } from '../../../typings/v-form-component';
  import { formatRules, removeAttrs } from '../../../utils';
  import PreviewCode from './PreviewCode.vue';

  export default defineComponent({
    name: 'JsonModal',
    components: {
      PreviewCode,
      Modal,
    },
    emits: ['cancel'],
    setup(_props, { emit }) {
      const state = reactive<{
        open: boolean;
        jsonData: IFormConfig;
      }>({
        open: false, // 控制json数据弹框显示
        jsonData: {} as IFormConfig, // json数据
      });
      /**
       * 显示Json数据弹框
       * @param jsonData
       */
      const showModal = (jsonData: IFormConfig) => {
        formatRules(jsonData.schemas);
        state.jsonData = jsonData;
        state.open = true;
      };

      // 计算json数据
      const editorJson = computed(() => {
        return JSON.stringify(removeAttrs(state.jsonData), null, '\t');
      });

      // 关闭弹框
      const handleCancel = () => {
        state.open = false;
        emit('cancel');
      };

      return { ...toRefs(state), editorJson, handleCancel, showModal };
    },
  });
</script>
