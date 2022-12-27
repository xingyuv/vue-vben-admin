<template>
  <transition name="fade-bottom" mode="out-in">
    <LockPage v-if="getIsLock" />
  </transition>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import LockPage from './LockPage.vue'
import { useLockStore } from '@/store/modules/lock'

const lockStore = useLockStore()
const getIsLock = computed(() => lockStore?.getLockInfo?.isLock ?? false)
</script>
