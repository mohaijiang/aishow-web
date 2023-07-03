<template>
  <div class="grid grid-cols-2 gap-8">
    <div class="border border-solid border-white flex justify-center">
      <img :src="image" class="my-[20px] rounded-[4px]" />
    </div>
    <div>
      <div class="flex justify-between">
        <div class="font-bold">
          <div class="text-[26px]">{{name}}</div>
          <!-- <div>Owned by <label class="text-[#1971c2]">C15A4D</label></div> -->
        </div>
        <a-button v-if="false" type="primary" class=" w-[120px]">Trasfer</a-button>
      </div>
      <div class="text-[20px]">
        <div class="mt-10 text-[20px] font-bold">Description：{{description}}</div>
        <div class="mt-5 text-[20px] font-bold">Hash：{{hash}}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import {ApiPromise, WsProvider} from "@polkadot/api";
import {web3Accounts, web3Enable} from "@polkadot/extension-dapp";
import { PolkadotAiChanClient } from "@/components/polkadot/ai-model"
const route = useRoute()
const name = ref()
const description = ref()
const hash = ref()
const image = ref()
const getNftDetail = async()=>{
  const collectionId:any = route.query.collectionId
  const itemId:any = route.query.itemId
  const allInjected = await web3Enable('my cool dapp');
  console.log(allInjected)
  const allAccounts = await web3Accounts();
  const account = allAccounts[0]?.address || sessionStorage.getItem('walletAddress')
  const wsProvider = new WsProvider('wss://ws.aishow.hamsternet.io');
  const api = await ApiPromise.create({provider: wsProvider});
  const client = new PolkadotAiChanClient(api,account)
  const res = await client.nftDetail(collectionId,itemId)
  console.log('getNftDetail',res)
  hash.value = res.itemUuid
  image.value = res.itemLink
  name.value = res.name
  description.value = res.description
}
onMounted(()=>{
  getNftDetail()
})
</script>
<style lang="less" scoped>
</style>