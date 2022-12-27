<template>
  <RouterView>
    <template #default="{ Component, route }">
      <transition
        :name="
          getTransitionName({
            route,
            openCache,
            enableTransition: getEnableTransition,
            cacheTabs: getCaches,
            def: getBasicTransition
          })
        "
        mode="out-in"
        appear
      >
        <keep-alive v-if="openCache" :include="getCaches">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
        <div v-else :key="route.name as unknown as (string | number | symbol)">
          <component :is="Component" :key="route.fullPath" />
        </div>
      </transition>
    </template>
  </RouterView>
  <FrameLayout v-if="getCanEmbedIFramePage" />
</template>
<script setup lang="ts" name="PageLayout">
import { computed, unref } from 'vue'
import FrameLayout from '@/layouts/iframe/index.vue'
import { useRootSetting } from '@/hooks/setting/useRootSetting'
import { useTransitionSetting } from '@/hooks/setting/useTransitionSetting'
import { useMultipleTabSetting } from '@/hooks/setting/useMultipleTabSetting'
import { getTransitionName } from './transition'
import { useMultipleTabStore } from '@/store/modules/multipleTab'

const { getShowMultipleTab } = useMultipleTabSetting()
const tabStore = useMultipleTabStore()

const { getOpenKeepAlive, getCanEmbedIFramePage } = useRootSetting()

const { getBasicTransition, getEnableTransition } = useTransitionSetting()

const openCache = computed(() => unref(getOpenKeepAlive) && unref(getShowMultipleTab))

const getCaches = computed((): string[] => {
  if (!unref(getOpenKeepAlive)) {
    return []
  }
  return tabStore.getCachedTabList
})
</script>
