<template>
  <PageWrapper title="Tree函数操作示例" contentBackground contentClass="p-4">
    <div class="mb-4">
      <a-button class="mr-2" @click="expandAll(true)"> 展开全部 </a-button>
      <a-button class="mr-2" @click="expandAll(false)"> 折叠全部 </a-button>
      <a-button class="mr-2" @click="checkAll(true)"> 全选 </a-button>
      <a-button class="mr-2" @click="checkAll(false)"> 全不选 </a-button>
      <a-button class="mr-2" @click="handleLevel(2)"> 显示到第2级 </a-button>
      <a-button class="mr-2" @click="handleLevel(1)"> 显示到第1级 </a-button>
    </div>
    <div class="mb-4">
      <a-button class="mr-2" @click="handleSetCheckData"> 设置勾选数据 </a-button>
      <a-button class="mr-2" @click="handleGetCheckData"> 获取勾选数据 </a-button>
      <a-button class="mr-2" @click="handleSetSelectData"> 设置选中数据 </a-button>
      <a-button class="mr-2" @click="handleGetSelectData"> 获取选中数据 </a-button>
      <a-button class="mr-2" @click="handleGetSelectNode"> 获取选中节点 </a-button>

      <a-button class="mr-2" @click="handleSetExpandData"> 设置展开数据 </a-button>
      <a-button class="mr-2" @click="handleGetExpandData"> 获取展开数据 </a-button>
    </div>
    <div class="mb-4">
      <a-button class="mr-2" @click="appendNodeByKey(null)"> 添加根节点 </a-button>
      <a-button class="mr-2" @click="appendNodeByKey('2-2')"> 添加在parent3内添加节点 </a-button>
      <a-button class="mr-2" @click="deleteNodeByKey('2-2')"> 删除parent3节点 </a-button>
      <a-button class="mr-2" @click="updateNodeByKey('1-1')"> 更新parent2节点 </a-button>
    </div>
    <BasicTree ref="treeRef" :treeData="treeData" title="函数操作" :checkable="true" />
  </PageWrapper>
</template>
<script lang="ts">
  import { type Nullable } from '@vben/types';
  import { defineComponent, ref, unref } from 'vue';

  import { PageWrapper } from '@/components/Page';
  import { BasicTree, TreeActionType } from '@/components/Tree/index';
  import { useMessage } from '@/hooks/web/useMessage';

  import { treeData } from './data';

  export default defineComponent({
    components: { BasicTree, PageWrapper },
    setup() {
      const treeRef = ref<Nullable<TreeActionType>>(null);
      const { createMessage } = useMessage();

      function getTree() {
        const tree = unref(treeRef);
        if (!tree) {
          throw new Error('tree is null!');
        }
        return tree;
      }

      function handleLevel(level: number) {
        getTree().filterByLevel(level);
      }

      function handleSetCheckData() {
        getTree().setCheckedKeys(['0-0']);
      }

      function handleGetCheckData() {
        const keys = getTree().getCheckedKeys();
        createMessage.success(JSON.stringify(keys));
      }

      function handleSetSelectData() {
        getTree().setSelectedKeys(['0-0']);
      }

      function handleGetSelectData() {
        const keys = getTree().getSelectedKeys();
        createMessage.success(JSON.stringify(keys));
      }

      function handleGetSelectNode() {
        const keys = getTree().getSelectedKeys();
        const node = getTree().getSelectedNode(keys[0]);
        createMessage.success(node !== null ? JSON.stringify(node) : null);
      }

      function handleSetExpandData() {
        getTree().setExpandedKeys(['0-0']);
      }

      function handleGetExpandData() {
        const keys = getTree().getExpandedKeys();
        createMessage.success(JSON.stringify(keys));
      }

      function checkAll(checkAll: boolean) {
        getTree().checkAll(checkAll);
      }

      function expandAll(checkAll: boolean) {
        getTree().expandAll(checkAll);
      }

      function appendNodeByKey(parentKey: string | null = null) {
        getTree().insertNodeByKey({
          parentKey,
          node: {
            title: '新增节点',
            key: '2-2-2',
          },
          // 往后插入
          push: 'push',
          // 往前插入
          // push:'unshift'
        });
      }

      function deleteNodeByKey(key: string) {
        getTree().deleteNodeByKey(key);
      }

      function updateNodeByKey(key: string) {
        getTree().updateNodeByKey(key, {
          title: 'parent2-new',
        });
      }

      return {
        treeData,
        treeRef,
        handleLevel,
        handleSetCheckData,
        handleGetCheckData,
        handleSetSelectData,
        handleGetSelectData,
        handleSetExpandData,
        handleGetExpandData,
        handleGetSelectNode,
        appendNodeByKey,
        deleteNodeByKey,
        updateNodeByKey,
        checkAll,
        expandAll,
      };
    },
  });
</script>
