<template>
  <PageWrapper title="消息示例">
    <CollapseContainer class="w-full h-32 bg-white rounded-md" title="Message">
      <a-button class="mr-2" @click="infoMsg('Info message')"> Info </a-button>
      <a-button class="mr-2" color="success" @click="successMsg('Success message')">
        Success
      </a-button>
      <a-button class="mr-2" color="warning" @click="warningMsg('Warning message')">
        Warning
      </a-button>
      <a-button class="mr-2" color="error" @click="errorMsg('Error message')"> Error </a-button>
      <a-button class="mr-2" type="primary" @click="handleLoading"> Loading </a-button>
    </CollapseContainer>

    <CollapseContainer class="w-full h-32 mt-5 bg-white rounded-md" title="Comfirm">
      <a-button class="mr-2" @click="handleConfirm('info')"> Info </a-button>
      <a-button color="warning" class="mr-2" @click="handleConfirm('warning')"> Warning </a-button>
      <a-button color="success" class="mr-2" @click="handleConfirm('success')"> Success </a-button>
      <a-button color="error" class="mr-2" @click="handleConfirm('error')"> Error </a-button>
    </CollapseContainer>

    <CollapseContainer class="w-full h-32 mt-5 bg-white rounded-md" title="Modal">
      <a-button class="mr-2" @click="handleInfoModal"> Info </a-button>
      <a-button color="success" class="mr-2" @click="handleSuccessModal"> Success </a-button>
      <a-button color="error" class="mr-2" @click="handleErrorModal"> Error </a-button>
      <a-button color="warning" class="mr-2" @click="handleWarningModal"> Warning </a-button>
    </CollapseContainer>

    <CollapseContainer
      class="w-full h-32 mt-5 bg-white rounded-md"
      title="Notification 用法与上面一致"
    >
      <a-button color="success" class="mr-2" @click="handleNotify"> Success </a-button>
    </CollapseContainer>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { CollapseContainer } from '@/components/Container/index';
  import { PageWrapper } from '@/components/Page';
  import { useMessage } from '@/hooks/web/useMessage';

  export default defineComponent({
    components: { CollapseContainer, PageWrapper },
    setup() {
      const {
        createMessage,
        createConfirm,
        createSuccessModal,
        createInfoModal,
        createErrorModal,
        createWarningModal,
        notification,
      } = useMessage();
      const { info, success, warning, error } = createMessage;

      function handleLoading() {
        createMessage.loading('Loading...');
      }
      function handleConfirm(type: 'warning' | 'error' | 'success' | 'info') {
        createConfirm({
          iconType: type,
          title: 'Tip',
          content: 'content message...',
        });
      }
      function handleSuccessModal() {
        createSuccessModal({ title: 'Tip', content: 'content message...' });
      }
      function handleErrorModal() {
        createErrorModal({ title: 'Tip', content: 'content message...' });
      }
      function handleWarningModal() {
        createWarningModal({ title: 'Tip', content: 'content message...' });
      }
      function handleInfoModal() {
        createInfoModal({ title: 'Tip', content: 'content message...' });
      }
      function handleNotify() {
        notification.success({
          message: 'Tip',
          description: 'content message...',
        });
      }
      return {
        infoMsg: info,
        successMsg: success,
        warningMsg: warning,
        errorMsg: error,
        handleLoading,
        handleConfirm,
        handleSuccessModal,
        handleErrorModal,
        handleWarningModal,
        handleInfoModal,
        handleNotify,
      };
    },
  });
</script>
