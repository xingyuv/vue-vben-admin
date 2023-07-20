<!--
 * @Description: 使用vbenForm的功能进行渲染
-->
<template>
  <Modal
    title="预览(不支持布局)"
    :open="state.open"
    okText="获取数据"
    cancelText="关闭"
    style="top: 20px"
    :destroyOnClose="true"
    :width="900"
    @ok="handleGetData"
    @cancel="handleCancel"
  >
    <BasicForm v-bind="attrs" @register="registerForm" />
    <JsonModal ref="jsonModal" />
  </Modal>
</template>
<script lang="ts" setup>
  import { type Recordable } from '@vben/types';
  import { Modal } from 'ant-design-vue';
  import { computed, reactive, ref } from 'vue';

  import { BasicForm, useForm } from '@/components/Form/index';

  import { IAnyObject } from '../../typings/base-type';
  import { IToolbarMethods } from '../../typings/form-type';
  import { IFormConfig } from '../../typings/v-form-component';
  import JsonModal from '../VFormDesign/components/JsonModal.vue';

  const jsonModal = ref<IToolbarMethods | null>(null);
  const state = reactive<{
    formModel: IAnyObject;
    open: boolean;
    formConfig: IFormConfig;
  }>({
    formModel: {},
    formConfig: {} as IFormConfig,
    open: false,
  });

  const attrs = computed(() => {
    return {
      ...state.formConfig,
    } as Recordable<any>;
  });

  /**
   * 显示Json数据弹框
   * @param jsonData
   */
  const showModal = (jsonData: IFormConfig) => {
    state.formConfig = jsonData;
    state.open = true;
  };

  //表单
  const [registerForm, { validate }] = useForm();

  const handleCancel = () => {
    state.open = false;
  };
  /**
   * 获取表单数据
   * @return {Promise<void>}
   */
  const handleGetData = async () => {
    const data = await validate();
    jsonModal.value?.showModal?.(data);
  };

  defineExpose({ showModal });
</script>
