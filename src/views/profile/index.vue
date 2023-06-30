<template>
  <div class="flex justify-center relative mb-4">
    <div class="text-center">
      <img src="@/assets/images/icon.jpeg" class="h-[90px] rounded-full" />
      <div class="text-[20px] font-bold">Alita</div>
    </div>
    <a-button type="primary" class="mr-10 w-[120px] absolute top-0 right-0" @click="goCreateNFT">MINT  NFT</a-button>
  </div>
  <a-tabs v-model:activeKey="activeKey" centered @change="handleTabChange">
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
import { onMounted, reactive, ref } from 'vue';
import ImageList from "../home/components/ImageList.vue";
import { PolkadotAiChanClient} from "@/components/polkadot/ai-model"
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import {ApiPromise, WsProvider} from "@polkadot/api";
import { message } from "ant-design-vue";
import { useRouter } from 'vue-router';
const router = useRouter()

const cardList = reactive<any>([]);
const activeKey = ref('2');
const goCreateNFT = ()=>{
  router.push('/nftCreate')
}
const handleTabChange = (val:string)=>{
  console.log('handleTabChange',val)
}
const getModelList = async () => {
  
  // 以下需要配置为全局
  const allInjected = await web3Enable('my cool dapp');
  console.log(allInjected)
  const allAccounts = await web3Accounts();
  const account = allAccounts[0].address
  const wsProvider = new WsProvider('ws://172.16.31.103:9944');
  const api = await ApiPromise.create({provider: wsProvider});
  // 以上需要配置为全局
  const client = new PolkadotAiChanClient(api,account)
  try {
    const res = await client.userModelList(account)
    console.log("cardList res:", res);
    Object.assign(cardList,res);
  } catch (error:any) {
    message.error('Failed ',error)
  }
}

onMounted(()=>{
  handleTabChange(activeKey.value);
  getModelList();
})
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