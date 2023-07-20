<template>
  <div v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <div class="enter-x min-w-64 min-h-64">
      <QRCode :value="qrCodeUrl" class="enter-x flex justify-center xl:justify-start" :size="280" />
      <Divider class="enter-x">{{ t('sys.login.scanSign') }}</Divider>
      <Button size="large" block class="mt-4 enter-x" @click="handleBackLogin">
        {{ t('sys.login.backSignIn') }}
      </Button>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { Button, Divider, QRCode } from 'ant-design-vue';
  import { computed, unref } from 'vue';

  import { useI18n } from '@/hooks/web/useI18n';

  import LoginFormTitle from './LoginFormTitle.vue';
  import { LoginStateEnum, useLoginState } from './useLogin';

  const qrCodeUrl = 'https://vben.vvbin.cn/login';

  const { t } = useI18n();
  const { handleBackLogin, getLoginState } = useLoginState();

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.QR_CODE);
</script>
