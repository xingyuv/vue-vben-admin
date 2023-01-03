import { reactive } from 'vue'
import { useCrudSchemas, VxeCrudSchema } from '@/hooks/web/useCrudSchemas'
import { getAllRoleList, isAccountExist } from '@/api/demo/system'

const crudSchema = reactive<VxeCrudSchema>({
  primaryKey: 'id',
  action: true,
  actionWidth: '200px',
  columns: [
    {
      field: 'account',
      title: '用户名',
      isSearch: true,
      form: {
        component: 'Input',
        helpMessage: ['本字段演示异步验证', '不能输入带有admin的用户名'],
        rules: [
          {
            required: true,
            message: '请输入用户名'
          },
          {
            validator(_, value) {
              return new Promise((resolve, reject) => {
                isAccountExist(value)
                  .then(() => resolve())
                  .catch((err) => {
                    reject(err.message || '验证失败')
                  })
              })
            }
          }
        ]
      }
    },
    {
      field: 'pwd',
      label: '密码',
      isTable: false,
      isDetail: false,
      form: {
        component: 'InputPassword',
        required: true,
        ifShow: false
      }
    },
    { field: 'nickname', title: '昵称', isSearch: true },
    { field: 'email', title: '邮箱' },
    {
      field: 'role',
      title: '角色',
      form: {
        component: 'ApiSelect',
        componentProps: {
          api: getAllRoleList,
          labelField: 'roleName',
          valueField: 'roleValue'
        },
        required: true
      }
    },
    {
      field: 'dept',
      title: '所属部门',
      form: {
        component: 'TreeSelect',
        componentProps: {
          fieldNames: {
            label: 'deptName',
            key: 'id',
            value: 'id'
          },
          getPopupContainer: () => document.body
        },
        required: true
      }
    },
    { field: 'createTime', title: '创建时间' },
    { field: 'remark', title: '备注' }
  ]
})

export const { allSchemas } = useCrudSchemas(crudSchema)
