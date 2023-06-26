<template>
  <div class="mx-[20%]">
    <div class="text-[30px] font-bold my-6">Mint your NFT</div>
    <a-form :model="formData" layout="vertical" ref="formRef" :rules="formRules">
      <a-form-item label="Choose the image from your Post"  name="name">
        <a-upload
          v-model:file-list="fileList"
          name="avatar"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :before-upload="beforeUpload"
          @change="handleChange"
        >
          <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
          <div v-else>
            <img src="@/assets/icons/add-icon.svg" class="h-[20px] cursor-pointer" />
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item label="Name" name="name">
        <a-input v-model:value="formData.name" placeholder="Please enter Name" allow-clear autocomplete="off" />
      </a-form-item>
      <a-form-item label="Tags" name="name">
        <a-input v-model:value="formData.name" placeholder="Please enter Name" allow-clear autocomplete="off" />
      </a-form-item>
      <a-form-item label="Description" name="name">
        <div>The description will be included on the item's detail page underneath its image.</div>
        <a-textarea v-model:value="formData.name" placeholder="" allow-clear :auto-size="{ minRows: 5, maxRows: 15 }" />
      </a-form-item>
    </a-form>
    <div class="mt-8 text-center">
      <a-button type="primary" class="mr-10 w-[120px]" @click="cancelNft">Cancel</a-button>
      <a-button type="primary" @click="handleSubmit" class="w-[120px]">Mint</a-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import type { UploadChangeParam } from 'ant-design-vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router'
const router = useRouter()

const fileList = ref([]);
const imageUrl = ref<string>('');
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
const cancelNft = ()=>{
  router.push('/')
}
const handleSubmit = async () => {
  // await formRef.value.validate();
  router.push('/nftDetail')
}
const handleChange = (info: UploadChangeParam) => { 
  console.log("info:",info);
}
const beforeUpload = (file: { type: string; size: number; }) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};
</script>
<style lang="less" scoped>
</style>