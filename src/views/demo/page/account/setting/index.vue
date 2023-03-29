<template>
  <ScrollContainer>
    <div ref="wrapperRef" :class="`${prefixCls}`">
      <Tabs :activeKey="tabKey" tab-position="left" :tabBarStyle="{ width: '220px' }">
        <TabPane key="1" tab="基本设置">
          <BaseSetting />
        </TabPane>
        <TabPane key="2" tab="安全设置">
          <SecureSetting />
        </TabPane>
        <TabPane key="3" tab="账号绑定">
          <AccountBind />
        </TabPane>
        <TabPane key="4" tab="新消息通知">
          <MsgNotify />
        </TabPane>
      </Tabs>
    </div>
  </ScrollContainer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Tabs } from 'ant-design-vue'
import { ScrollContainer } from '@/components/Container'
import BaseSetting from './BaseSetting.vue'
import SecureSetting from './SecureSetting.vue'
import AccountBind from './AccountBind.vue'
import MsgNotify from './MsgNotify.vue'
import { useDesign } from '@/hooks/web/useDesign'

const TabPane = Tabs.TabPane
const tabKey = ref('1')
const { prefixCls } = useDesign('account-setting')
</script>
<style lang="less">
.account-setting {
  margin: 12px;
  background-color: @component-background;

  .base-title {
    padding-left: 0;
  }

  .ant-tabs-tab-active {
    background-color: @item-active-bg;
  }
}
</style>
