<script setup lang="ts">

import {PolkadotAiChanClient} from "@/components/polkadot/ai-model";
import {ApiPromise, WsProvider} from "@polkadot/api";
import {web3Accounts, web3Enable} from "@polkadot/extension-dapp";
import {onMounted, reactive} from "vue";



const createModel = async () => {


    const allInjected = await web3Enable('my cool dapp');
    const allAccounts = await web3Accounts();
    const account = allAccounts[0].address
    const wsProvider = new WsProvider('ws://127.0.0.1:9944');
    const api = await ApiPromise.create({provider: wsProvider});
    const client = new PolkadotAiChanClient(api, account)

    const result = await client.createModel({
        name: "a2",
        // 模型hash， 文件上传后返回的hash值
        hash: "a2",
        // 模型下载链接
        link: "string",
        // 图片列表
        images: [{
            image: "image",
            imageLink: "imageLink",
        }],
        // 下载价格
        downloadPrice: 1000,
        size: 1000,
        // markdown 备注
        comment: "comment",
        filename: "filename",
    }, undefined)


    // const result = await client.createPost({
    //     modelHash: "a2",
    //     uuid: "uuid",
    //     name: "some name",
    //     images: [{
    //        image: "image",
    //        imageLink: "imageLink",
    //     }],
    //     comment: "comment",
    // },undefined)

    // const result = await client.nftCreateCollection("a2")
    // const result = await client.nftMint("a2","uuid")

    // const result = await client.postList("a2")

    // const result = await client.userNFT("5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY")

    console.log("modelDetail: ", result)

}

const createPost = async ()=> {


    const allInjected = await web3Enable('my cool dapp');
    const allAccounts = await web3Accounts();
    const account = allAccounts[0].address
    const wsProvider = new WsProvider('ws://127.0.0.1:9944');
    const api = await ApiPromise.create({provider: wsProvider});
    const client = new PolkadotAiChanClient(api, account)

    const result = await client.createPost({
        modelHash: "a2",
        uuid: "uuid",
        name: "some name",
        images: [{
           image: "image",
           imageLink: "imageLink",
        }],
        comment: "comment",
    },undefined)

    console.log(result)
}

const userModelSelect = async () => {


    const allInjected = await web3Enable('my cool dapp');
    const allAccounts = await web3Accounts();
    const account = allAccounts[0].address
    const wsProvider = new WsProvider('ws://127.0.0.1:9944');
    const api = await ApiPromise.create({provider: wsProvider});
    const client = new PolkadotAiChanClient(api, account)

    const result = await client.userModelSelect(account)
    console.log(result)
}

const modelList = async () => {

    const allInjected = await web3Enable('my cool dapp');
    const allAccounts = await web3Accounts();
    const account = allAccounts[0].address
    const wsProvider = new WsProvider('ws://127.0.0.1:9944');
    const api = await ApiPromise.create({provider: wsProvider});
    const client = new PolkadotAiChanClient(api, account)

    const result = await client.modelList()
    console.log(result)
}

const userPost = async ()=> {

    const allInjected = await web3Enable('my cool dapp');
    const allAccounts = await web3Accounts();
    const account = allAccounts[0].address
    const wsProvider = new WsProvider('ws://127.0.0.1:9944');
    const api = await ApiPromise.create({provider: wsProvider});
    const client = new PolkadotAiChanClient(api, account)

    const result = await client.userPostList(account)
    console.log(result)
}

</script>

<template>

  <div>
      <h1>test</h1>
      <a-card>
          <p>
              <a-button type="primary" @click="createModel">create model</a-button>
          </p>
          <p>
              <a-button type="primary" @click="createPost">create post</a-button>
          </p>
          <p>
              <a-button type="primary">mint</a-button>
          </p>

          <p>
              <a-button type="primary" @click="userModelSelect"> userModelSelect </a-button>
          </p>

          <p>
              <a-button type="primary" @click="modelList">modelList</a-button>
          </p>

          <p>
              <a-button type="primary" @click="userPost">userPost</a-button>
          </p>
      </a-card>
  </div>
</template>

<style scoped lang="less">

</style>
