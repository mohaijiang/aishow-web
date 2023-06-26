<template>
  <div class="flex justify-center relative mb-4">
    <div class="text-center">
      <img src="@/assets/images/icon.jpeg" class="h-[90px] rounded-full" />
      <div class="text-[20px] font-bold">Alita</div>
    </div>
    <a-button type="primary" class="mr-10 w-[120px] absolute top-0 right-0" @click="goCreateNFT">MINT  NFT</a-button>
  </div>
  <a-tabs v-model:activeKey="activeKey" centered>
    <a-tab-pane key="1" tab="Posts">
      <ImageList :cardList="cardList"></ImageList>
    </a-tab-pane>
    <a-tab-pane key="2" tab="Model">
      <ImageList :cardList="cardList"></ImageList>
    </a-tab-pane>
    <a-tab-pane key="3" tab="NFT">
      <ImageList :cardList="cardList"></ImageList>
    </a-tab-pane>
  </a-tabs>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import ImageList from "../home/components/ImageList.vue";

const cardList = reactive<any>([
  { imageName: 'one1.jpeg' }, { imageName: 'one.jpeg' },
  { imageName: 'two1.png' }, { imageName: 'two.jpeg' },
  { imageName: 'three1.jpeg' }, { imageName: 'three.jpeg' },
]);
const activeKey = ref('1');
const goCreateNFT = ()=>{
  router.push('/nftCreate')
}
</script>
<style lang="less" scoped>
.ant-tabs,
.ant-tabs :deep(.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn){
  color: white;
}
:deep(.ant-tabs-tab + .ant-tabs-tab){
   margin: 0;
}
:deep(.ant-tabs-tab){
  width: 90px;
  height: 30px;
  background-color: #C1C2C5;
}
:deep(.ant-tabs-tab-btn){
  text-align: center;
  width: 100%;
}
.ant-tabs :deep(.ant-tabs-tab.ant-tabs-tab-active){
  background-color: #1890ff;
}
.ant-tabs-top :deep(.ant-tabs-nav::before){
  border-bottom: none;
}
</style>