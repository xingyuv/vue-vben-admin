import { reactive } from 'vue'
import { useCrudSchemas, VxeCrudSchema } from '@/hooks/web/useCrudSchemas'

const crudSchema = reactive<VxeCrudSchema>({
  action: true,
  actionWidth: '200px',
  columns: [
    { field: 'roleName', title: '角色名称', isSearch: true },
    { field: 'roleValue', title: '角色值', isSearch: true },
    { field: 'orderNo', title: '排序' },
    {
      field: 'status',
      title: '状态',
      search: {
        show: true,
        itemRender: {
          name: '$select',
          options: [
            { label: '启用', value: '0' },
            { label: '停用', value: '1' }
          ]
        }
      },
      form: {
        label: '状态',
        component: 'Select',
        componentProps: {
          options: [
            { label: '启用', value: '0' },
            { label: '停用', value: '1' }
          ]
        }
      }
    },
    { field: 'createTime', title: '创建时间' },
    { field: 'remark', title: '备注' }
  ]
})

export const { allSchemas } = useCrudSchemas(crudSchema)
