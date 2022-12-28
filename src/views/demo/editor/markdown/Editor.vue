<template>
  <PageWrapper title="MarkDown组件嵌入Form示例">
    <CollapseContainer title="MarkDown表单">
      <BasicForm
        :labelWidth="100"
        :schemas="schemas"
        :actionColOptions="{ span: 24 }"
        :baseColProps="{ span: 24 }"
        @submit="handleSubmit"
      />
    </CollapseContainer>
  </PageWrapper>
</template>
<script setup lang="ts">
import { h } from 'vue'
import { BasicForm, FormSchema } from '@/components/Form/index'
import { CollapseContainer } from '@/components/Container/index'
import { useMessage } from '@/hooks/web/useMessage'
import { MarkDown } from '@/components/Markdown'
import { PageWrapper } from '@/components/Page'

const { createMessage } = useMessage()

const schemas: FormSchema[] = [
  {
    field: 'title',
    component: 'Input',
    label: 'title',
    defaultValue: '标题',
    rules: [{ required: true }]
  },
  {
    field: 'markdown',
    component: 'Input',
    label: 'markdown',
    defaultValue: 'defaultValue',
    rules: [{ required: true, trigger: 'blur' }],
    render: ({ model, field }) => {
      return h(MarkDown, {
        value: model[field],
        onChange: (value: string) => {
          model[field] = value
        }
      })
    }
  }
]

const handleSubmit = (values: any) => {
  createMessage.success('click search,values:' + JSON.stringify(values))
}
</script>
