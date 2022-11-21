import type { Menu } from '@/router/types'
import { ref, onBeforeMount, unref, Ref, nextTick } from 'vue'
import { getMenus } from '@/router/menus'
import { cloneDeep } from 'lodash-es'
import { filter, forEach } from '@/utils/helper/treeHelper'
import { useGo } from '@/hooks/web/usePage'
import { useScrollTo } from '@/hooks/event/useScrollTo'
import { onKeyStroke, useDebounceFn } from '@vueuse/core'
import { useI18n } from '@/hooks/web/useI18n'

export interface SearchResult {
  name: string
  path: string
  icon?: string
}

// 翻译特殊字符
function transform(c: string) {
  const code: string[] = ['$', '(', ')', '*', '+', '.', '[', ']', '?', '\\', '^', '{', '}', '|']
  return code.includes(c) ? `\\${c}` : c
}

function createSearchReg(key: string) {
  const keys = [...key].map((item) => transform(item))
  const str = ['', ...keys, ''].join('.*')
  return new RegExp(str)
}

export function useMenuSearch(refs: Ref<HTMLElement[]>, scrollWrap: Ref<ElRef>, emit: EmitType) {
  const searchResult = ref<SearchResult[]>([])
  const keyword = ref('')
  const activeIndex = ref(-1)

  let menuList: Menu[] = []

  const { t } = useI18n()
  const go = useGo()
  const handleSearch = useDebounceFn(search, 200)

  onBeforeMount(async () => {
    const list = await getMenus()
    menuList = cloneDeep(list)
    forEach(menuList, (item) => {
      item.name = t(item.name)
    })
  })

  function search(e: ChangeEvent) {
    e?.stopPropagation()
    const key = e.target.value
    keyword.value = key.trim()
    if (!key) {
      searchResult.value = []
      return
    }
    const reg = createSearchReg(unref(keyword))
    const filterMenu = filter(menuList, (item) => {
      return reg.test(item.name) && !item.hideMenu
    })
    searchResult.value = handlerSearchResult(filterMenu, reg)
    activeIndex.value = 0
  }

  function handlerSearchResult(filterMenu: Menu[], reg: RegExp, parent?: Menu) {
    const ret: SearchResult[] = []
    filterMenu.forEach((item) => {
      const { name, path, icon, children, hideMenu, meta } = item
      if (!hideMenu && reg.test(name) && (!children?.length || meta?.hideChildrenInMenu)) {
        ret.push({
          name: parent?.name ? `${parent.name} > ${name}` : name,
          path,
          icon
        })
      }
      if (!meta?.hideChildrenInMenu && Array.isArray(children) && children.length) {
        ret.push(...handlerSearchResult(children, reg, item))
      }
    })
    return ret
  }

  // 当鼠标移动到某一行时激活
  function handleMouseenter(e: any) {
    const index = e.target.dataset.index
    activeIndex.value = Number(index)
  }

  // 向上箭头键
  function handleUp() {
    if (!searchResult.value.length) return
    activeIndex.value--
    if (activeIndex.value < 0) {
      activeIndex.value = searchResult.value.length - 1
    }
    handleScroll()
  }

  // 向下箭头键
  function handleDown() {
    if (!searchResult.value.length) return
    activeIndex.value++
    if (activeIndex.value > searchResult.value.length - 1) {
      activeIndex.value = 0
    }
    handleScroll()
  }

  // 当键盘上下键移动到不可见的位置时，滚动条需要自动滚动
  function handleScroll() {
    const refList = unref(refs)
    if (!refList || !Array.isArray(refList) || refList.length === 0 || !unref(scrollWrap)) {
      return
    }

    const index = unref(activeIndex)
    const currentRef = refList[index]
    if (!currentRef) {
      return
    }
    const wrapEl = unref(scrollWrap)
    if (!wrapEl) {
      return
    }
    const scrollHeight = currentRef.offsetTop + currentRef.offsetHeight
    const wrapHeight = wrapEl.offsetHeight
    const { start } = useScrollTo({
      el: wrapEl,
      duration: 100,
      to: scrollHeight - wrapHeight
    })
    start()
  }

  // 输入键盘事件
  async function handleEnter() {
    if (!searchResult.value.length) {
      return
    }
    const result = unref(searchResult)
    const index = unref(activeIndex)
    if (result.length === 0 || index < 0) {
      return
    }
    const to = result[index]
    handleClose()
    await nextTick()
    go(to.path)
  }

  // 近距离搜索模式
  function handleClose() {
    searchResult.value = []
    emit('close')
  }

  // 回车搜索
  onKeyStroke('Enter', handleEnter)
  // 监控键盘箭头键
  onKeyStroke('ArrowUp', handleUp)
  onKeyStroke('ArrowDown', handleDown)
  // ESC 关闭
  onKeyStroke('Escape', handleClose)

  return { handleSearch, searchResult, keyword, activeIndex, handleMouseenter, handleEnter }
}
