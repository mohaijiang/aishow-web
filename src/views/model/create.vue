<template>
  <div class="mx-[20%]">
    <div class="text-[30px] font-bold my-6">Creat your model</div>
    <a-form :model="formData" layout="vertical" ref="formRef" :rules="formRules">
      <a-form-item label="Upload modele file" name="name">
        <a-upload-dragger
          v-model:fileList="fileList"
          name="file"
          :multiple="true"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          @change="handleChange"
          @drop="handleDrop"
        >
          <p class="ant-upload-drag-icon">
            <img src="@/assets/icons/upload.svg" class="w-[60px]" />
          </p>
          <p class="ant-upload-text">Drop your files here or click to select</p>
          <p class="ant-upload-hint">
            Attach up to 11 files. Accepted file types: .ckpt, .pt, .safetensors, .bin, .zip, .yaml, .yml, .onnx
          </p>
        </a-upload-dragger>
        <a-button :disabled="false" type="primary" class="w-full mt-4">Start Upload</a-button>
      </a-form-item>
      <a-form-item label="Upload modele image" name="name">
        <div>The image is used to show the effect of the model generation example</div>
        <a-upload-dragger
          v-model:fileList="fileList"
          name="file"
          :multiple="true"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          @change="handleChange"
          @drop="handleDrop"
        >
          <p class="ant-upload-drag-icon">
            <img src="@/assets/icons/picture.svg" class="w-[60px]" />
          </p>
          <p class="ant-upload-text">Drag images here or click to select files</p>
          <p class="ant-upload-hint">
            Attach up to 5 files
          </p>
        </a-upload-dragger>
        <a-button :disabled="true" type="primary" class="w-full mt-4">Start Upload</a-button>
      </a-form-item>
      <a-form-item label="Set a price" name="name">
        <div>The image is used to show the effect of the model generation example</div>
        <a-input class="!w-[95%]" v-model:value="formData.name" placeholder="Amount" allow-clear autocomplete="off" />AIST
      </a-form-item>
      <a-form-item label="Name" name="name">
        <a-input v-model:value="formData.name" placeholder="Please enter Name" allow-clear autocomplete="off" />
      </a-form-item>
      <a-form-item label="About your model" name="name">
        <div>What your model does</div>
        <Wangeditor
          v-model:value="formData.name"
          placeholder="model"
        />
      </a-form-item>
    </a-form>
    <div class="mt-8 text-center">
      <a-button type="primary" class="mr-10 w-[120px]" @click="cancelUploadModal">Cancel</a-button>
      <a-button type="primary" @click="handleSubmit" class="w-[120px]">Submit</a-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, reactive, ref, setBlockTracking } from 'vue';
import type { UploadChangeParam } from 'ant-design-vue';
import Wangeditor from '@/components/Wangeditor.vue';
import {CreateModelVO, ImageVO, PolkadotAiChanClient} from "@/components/polkadot/ai-model"
import {ApiPromise, WsProvider} from "@polkadot/api";
import {web3Accounts, web3Enable} from "@polkadot/extension-dapp";
import { useRouter } from 'vue-router';

const router = useRouter();
const fileList = ref([]);
const formRef = ref();
const formData = reactive({
  name: '',
});
const formRules = computed(() => {

  const requiredRule = (message: string) => ({ required: true, trigger: 'change', message });

  return {
    name: [requiredRule('Please enter name!')],
  };
});
const cancelUploadModal = () =>{
  router.push('/')
}
const handleSubmit = async () => {
    // await formRef.value.validate();

    // console.log("submit")
    // // 以下需要配置为全局
    // const allInjected = await web3Enable('my cool dapp');
    // console.log(allInjected)
    // const allAccounts = await web3Accounts();
    // const account = allAccounts[0].address
    // const wsProvider = new WsProvider('wss://ws.aishow.hamsternet.io');
    // const api = await ApiPromise.create({provider: wsProvider});
    // // 以上需要配置为全局
    //
    // const client = new PolkadotAiChanClient(api,account)
    // const model: CreateModelVO =  {
    //     hash: "",
    //     name: "string",
    //     link: "string",
    //     images: [{
    //       image: "",
    //       imageLink: "",
    //     }],
    //     downloadPrice: 1000,
    //     comment: ""
    // }
    // await client.createModel(model,(status ) => {
    //     console.log(status)
    // })
    router.push('/detail')
}
const handleChange = (info: UploadChangeParam) => {
  console.log("info:",info);
}
const handleDrop = (e: DragEvent) => {
  console.log("e:",e);
}
</script>
<style lang="less" scoped>
</style>
