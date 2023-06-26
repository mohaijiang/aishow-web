<template>
  <div class="top-0 px-[32px] bg-[#000000] z-10 fixed h-[64px] w-full border-b">
    <div class="flex justify-between items-center h-full">
      <div class="text-[30px] font-bold">
        <span class="text-red-600 cursor-pointer" @click="goHome">AI</span><span class="cursor-pointer mr-[10px]" @click="goHome">SHOW</span>
        <a-dropdown :trigger="['click']">
          <a class="ant-dropdown-link" @click.prevent>
            <img src="@/assets/icons/add.svg" class="h-[20px]" />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item key="0" @click="goUploadModal">
                Upload a model
              </a-menu-item>
              <a-menu-item key="1" @click="goPostImages">
                Post images
              </a-menu-item>
              <!-- <a-menu-divider /> -->
              <a-menu-item key="3" @click="goWriteAnArticle">Write an article</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
      <div>
        <a-button v-if="!walletAddress" class="ml-8" type="primary" @click="connectWallet">Connect Wallet</a-button>
        <a-button v-else ghost @click="goProfile">{{walletAddress}}</a-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue' 
import { useRouter } from 'vue-router';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
const router = useRouter()
const walletAddress = ref('')
const connectWallet = async() => {
  const extensions = await web3Enable("my cool dapp");
  console.log('extensions',extensions);
  const allAccounts = await web3Accounts();
  console.log('allAccounts',allAccounts);
  const walletAddr = allAccounts[0]?.address
  walletAddress.value = walletAddr.substring(0,5)+ "..." +walletAddr.substring(walletAddr.length-4)
  // 先把polka钱包账号存起来，防止后面需要使用到
  sessionStorage.setItem("account", JSON.stringify(allAccounts[0]));
  sessionStorage.setItem("allAccounts", JSON.stringify(allAccounts));
}
const goUploadModal = ()=>{
  router.push('/modelCreate')
  console.log('goUploadModal')
}
const goPostImages = ()=>{
  console.log('goPostImages')
  router.push('/postCreate')
}
const goWriteAnArticle = ()=>{
  console.log('goWriteAnArticle')
  router.push('/nftCreate')
}
const goHome = ()=>{
  router.push('/')
}
const goProfile = ()=>{
  router.push('/profile')
}
</script>
<style lang="less" scoped>

</style>