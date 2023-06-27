<template>
  <div class="mx-[20%]">
    <div class="text-[30px] font-bold my-6">Post your image</div>
    <a-form :model="formData" layout="vertical" ref="formRef" :rules="formRules">
      <a-form-item  name="name">
        <a-upload-dragger
          v-model:fileList="fileList"
          name="file"
          :multiple="true"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          @change="handleChange"
          @drop="handleDrop"
          :maxCount="5"
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
      <a-form-item label="Choose the model you use" name="name">
        <a-select v-model:value="formData.name" placeholder="Amount" allow-clear autocomplete="off">
          <option value="model">model</option>
        </a-select>
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
      <a-button type="primary" class="mr-10 w-[120px]" @click="cancelPost">Cancel</a-button>
      <a-button type="primary" @click="handleSubmit" class="w-[120px]">Post</a-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import type { UploadChangeParam } from 'ant-design-vue';
import Wangeditor from '@/components/Wangeditor.vue';
import { useRouter } from 'vue-router';
const router = useRouter()

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
const cancelPost = ()=>{
  router.push('/')
}
const handleSubmit = async () => {
  // await formRef.value.validate();
  router.push('/postDetail')
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