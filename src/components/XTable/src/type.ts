import type { VxeGridProps } from 'vxe-table'
import { VxeGridPropTypes } from 'vxe-table'

export type XTableProps<D = any> = VxeGridProps<D> & {
  getListApi?: Function
  deleteApi?: Function
  exportListApi?: Function
  params?: Object
  title?: string
  pagination?: boolean | VxeGridPropTypes.PagerConfig
  afterFetch?: Function
}
export type XColumns = VxeGridPropTypes.Columns
