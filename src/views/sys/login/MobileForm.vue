<template>
  <div v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form ref="formRef" class="p-4 enter-x" :model="formData" :rules="getFormRules">
      <FormItem name="mobile" class="enter-x">
        <Input
          v-model:value="formData.mobile"
          size="large"
          :placeholder="t('sys.login.mobile')"
          class="fix-auto-fill"
        />
      </FormItem>
      <FormItem name="sms" class="enter-x">
        <CountdownInput
          v-model:value="formData.sms"
          size="large"
          class="fix-auto-fill"
          :placeholder="t('sys.login.smsCode')"
        />
      </FormItem>

      <FormItem class="enter-x">
        <Button type="primary" size="large" block :loading="loading" @click="handleLogin">
          {{ t('sys.login.loginButton') }}
        </Button>
        <Button size="large" block class="mt-4" @click="handleBackLogin">
          {{ t('sys.login.backSignIn') }}
        </Button>
      </FormItem>
    </Form>
  </div>
</template>
<script lang="ts" setup>
  import { Button, Form, Input } from 'ant-design-vue';
  import { computed, reactive, ref, unref } from 'vue';

  import { CountdownInput } from '@/components/CountDown';
  import { useI18n } from '@/hooks/web/useI18n';

  import LoginFormTitle from './LoginFormTitle.vue';
  import { LoginStateEnum, useFormRules, useFormValid, useLoginState } from './useLogin';

  const FormItem = Form.Item;
  const { t } = useI18n();
  const { handleBackLogin, getLoginState } = useLoginState();
  const { getFormRules } = useFormRules();

  const formRef = ref();
  const loading = ref(false);

  const formData = reactive({
    mobile: '',
    sms: '',
  });

  const { validForm } = useFormValid(formRef);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.MOBILE);

  async function handleLogin() {
    const data = await validForm();
    if (!data) return;
    console.log(data);
  }
</script>
