import { reactive } from 'vue'
import { useCrudSchemas, VxeCrudSchema } from '@/hooks/web/useCrudSchemas'

const isDir = (type: string) => type === '0'
const isMenu = (type: string) => type === '1'
const isButton = (type: string) => type === '2'

const crudSchema = reactive<VxeCrudSchema>({
  action: true,
  actionWidth: '200px',
  columns: [
    {
      field: 'type',
      title: '菜单类型',
      isTable: false,
      form: {
        component: 'RadioButtonGroup',
        defaultValue: '0',
        componentProps: {
          options: [
            { label: '目录', value: '0' },
            { label: '菜单', value: '1' },
            { label: '按钮', value: '2' }
          ]
        }
      }
    },
    {
      field: 'menuName',
      title: '菜单名称',
      isSearch: true,
      table: {
        treeNode: true,
        align: 'left',
        width: '200px'
      }
    },
    {
      field: 'icon',
      title: '图标',
      form: {
        component: 'IconPicker',
        required: true,
        ifShow: ({ values }) => !isButton(values.type)
      }
    },
    {
      field: 'routePath',
      title: '路由地址',
      form: {
        component: 'Input',
        ifShow: ({ values }) => !isButton(values.type)
      }
    },
    {
      field: 'component',
      title: '组件',
      form: {
        component: 'Input',
        ifShow: ({ values }) => isMenu(values.type)
      }
    },
    {
      field: 'permission',
      title: '权限标识',
      form: {
        label: '权限标识',
        component: 'Input',
        ifShow: ({ values }) => !isDir(values.type)
      }
    },
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
        component: 'RadioButtonGroup',
        defaultValue: '0',
        componentProps: {
          options: [
            { label: '启用', value: '0' },
            { label: '停用', value: '1' }
          ]
        }
      }
    },
    {
      field: 'isExt',
      title: '是否外链',
      isTable: false,
      form: {
        label: '是否外链',
        component: 'RadioButtonGroup',
        defaultValue: '0',
        componentProps: {
          options: [
            { label: '否', value: '0' },
            { label: '是', value: '1' }
          ]
        },
        ifShow: ({ values }) => !isButton(values.type)
      }
    },
    {
      field: 'keepalive',
      title: '是否缓存',
      isTable: false,
      form: {
        label: '是否外链',
        component: 'RadioButtonGroup',
        defaultValue: '0',
        componentProps: {
          options: [
            { label: '否', value: '0' },
            { label: '是', value: '1' }
          ]
        },
        ifShow: ({ values }) => isMenu(values.type)
      }
    },
    {
      field: 'show',
      title: '是否显示',
      isTable: false,
      form: {
        label: '是否显示',
        component: 'RadioButtonGroup',
        defaultValue: '0',
        componentProps: {
          options: [
            { label: '否', value: '0' },
            { label: '是', value: '1' }
          ]
        },
        ifShow: ({ values }) => !isButton(values.type)
      }
    },
    { field: 'createTime', title: '创建时间', isTable: false }
  ]
})

export const { allSchemas } = useCrudSchemas(crudSchema)
