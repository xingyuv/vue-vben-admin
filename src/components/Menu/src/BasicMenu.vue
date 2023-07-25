<template>
  <Menu
    :selectedKeys="menuState.selectedKeys"
    :defaultSelectedKeys="menuState.defaultSelectedKeys"
    :mode="mode"
    :openKeys="getOpenKeys"
    :inlineIndent="inlineIndent"
    :theme="theme"
    :class="getMenuClass"
    :subMenuOpenDelay="0.2"
    v-bind="getInlineCollapseOptions"
    @open-change="handleOpenChange"
    @click="handleMenuClick"
  >
    <template v-for="item in items" :key="item.path">
      <BasicSubMenuItem :item="item" :theme="theme" :isHorizontal="isHorizontal" />
    </template>
  </Menu>
</template>
<script lang="ts" setup>
  import { Menu } from 'ant-design-vue';
  import { MenuInfo } from 'ant-design-vue/es/menu/src/interface';
  import { computed, reactive, ref, toRefs, unref, watch } from 'vue';
  import { RouteLocationNormalizedLoaded, useRouter } from 'vue-router';

  import { MenuModeEnum, MenuTypeEnum } from '@/enums/menuEnum';
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting';
  import { useDesign } from '@/hooks/web/useDesign';
  import { listenerRouteChange } from '@/logics/mitt/routeChange';
  import { REDIRECT_NAME } from '@/router/constant';
  import { getAllParentPath } from '@/router/helper/menuHelper';
  import { getCurrentParentPath } from '@/router/menus';
  import { isFunction } from '@/utils/is';

  import BasicSubMenuItem from './components/BasicSubMenuItem.vue';
  import { basicProps } from './props';
  import type { MenuState } from './types';
  import { useOpenKeys } from './useOpenKeys';

  defineOptions({ name: 'BasicMenu' });

  const props = defineProps(basicProps);

  const emit = defineEmits(['menuClick']);

  const isClickGo = ref(false);
  const currentActiveMenu = ref('');

  const menuState = reactive<MenuState>({
    defaultSelectedKeys: [],
    openKeys: [],
    selectedKeys: [],
    collapsedOpenKeys: [],
  });

  const { prefixCls } = useDesign('basic-menu');
  const { items, mode, accordion } = toRefs(props);

  const { getCollapsed, getTopMenuAlign, getSplit } = useMenuSetting();

  const { currentRoute } = useRouter();

  const { handleOpenChange, setOpenKeys, getOpenKeys } = useOpenKeys(
    menuState,
    items,
    mode as any,
    accordion,
  );

  const getIsTopMenu = computed(() => {
    const { type, mode } = props;

    return (
      (type === MenuTypeEnum.TOP_MENU && mode === MenuModeEnum.HORIZONTAL) ||
      (props.isHorizontal && unref(getSplit))
    );
  });

  const getMenuClass = computed(() => {
    const align = props.isHorizontal && unref(getSplit) ? 'start' : unref(getTopMenuAlign);
    return [
      prefixCls,
      `justify-${align}`,
      {
        [`${prefixCls}__second`]: !props.isHorizontal && unref(getSplit),
        [`${prefixCls}__sidebar-hor`]: unref(getIsTopMenu),
      },
    ];
  });

  const getInlineCollapseOptions = computed(() => {
    const isInline = props.mode === MenuModeEnum.INLINE;

    const inlineCollapseOptions: { inlineCollapsed?: boolean } = {};
    if (isInline) {
      inlineCollapseOptions.inlineCollapsed = props.mixSider ? false : unref(getCollapsed);
    }
    return inlineCollapseOptions;
  });

  listenerRouteChange((route) => {
    if (route.name === REDIRECT_NAME) return;
    handleMenuChange(route);
    currentActiveMenu.value = route.meta?.currentActiveMenu as string;

    if (unref(currentActiveMenu)) {
      menuState.selectedKeys = [unref(currentActiveMenu)];
      setOpenKeys(unref(currentActiveMenu));
    }
  });

  !props.mixSider &&
    watch(
      () => props.items,
      () => {
        handleMenuChange();
      },
    );

  async function handleMenuClick(menuInfo: MenuInfo) {
    const { beforeClickFn } = props;
    if (beforeClickFn && isFunction(beforeClickFn)) {
      const flag = await beforeClickFn(menuInfo.key as string);
      if (!flag) return;
    }
    emit('menuClick', menuInfo.key);

    isClickGo.value = true;
    menuState.selectedKeys = [menuInfo.key as string];
  }

  async function handleMenuChange(route?: RouteLocationNormalizedLoaded) {
    if (unref(isClickGo)) {
      isClickGo.value = false;
      return;
    }
    const path =
      (route || unref(currentRoute)).meta?.currentActiveMenu || (route || unref(currentRoute)).path;
    setOpenKeys(path);
    if (unref(currentActiveMenu)) return;
    if (props.isHorizontal && unref(getSplit)) {
      const parentPath = await getCurrentParentPath(path);
      menuState.selectedKeys = [parentPath];
    } else {
      const parentPaths = await getAllParentPath(props.items, path);
      menuState.selectedKeys = parentPaths;
    }
  }
</script>
<style lang="less">
  @import url('./index.less');
</style>
