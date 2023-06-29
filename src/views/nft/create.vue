<template>
  <div class="mx-[20%]">
    <div class="text-[30px] font-bold my-6">Mint your NFT</div>
    <a-form :model="formData" layout="vertical" ref="formRef" :rules="formRules">
      <a-form-item label="Choose the image from your Post"  name="post">
        <div @click="imgVisible=true" class="bg-[#25262b] rounded-[2px] w-[140px] h-[140px] cursor-pointer flex justify-center items-center">
          <img src="@/assets/icons/add-icon.svg" class="h-[20px] cursor-pointer" />
        </div>
      </a-form-item>
      <a-form-item label="Name" name="name">
        <a-input v-model:value="formData.name" placeholder="Please enter Name" allow-clear autocomplete="off" />
      </a-form-item>
      <!-- <a-form-item label="Tags" name="name">
        <a-input v-model:value="formData.name" placeholder="Please enter Name" allow-clear autocomplete="off" />
      </a-form-item> -->
      <a-form-item label="Description" name="description">
        <div>The description will be included on the item's detail page underneath its image.</div>
        <a-textarea v-model:value="formData.description" placeholder="" allow-clear :auto-size="{ minRows: 5, maxRows: 15 }" />
      </a-form-item>
    </a-form>
    <div class="mt-8 text-center">
      <a-button type="primary" class="mr-10 w-[120px]" @click="cancelNft">Cancel</a-button>
      <a-button type="primary" @click="handleSubmit" class="w-[120px]">Mint</a-button>
    </div>
  </div>
  <a-modal v-model:visible="imgVisible" >
    <template #footer>
      <a-button type="primary" @click="imgVisible=false">Cancel</a-button>
      <a-button type="primary" class="!ml-8">Confirm</a-button>
    </template>
    <div class="text-[20px] font-bold">Please select your image from your POST</div>
    <div>Title</div>
    <div class="mb-8">2023-06-20 15:34:56</div>
    <a-radio-group v-model:value="imgValue" name="radioGroup">
      <div class="grid grid-cols-3 gap-4">
        <div class="relative" v-for="(item, key) in imgList" :key="key">
          <div>
            <img :src="getImageURL(item.imageName)" class="w-full" />
            <div class="absolute bottom-[5px] w-full text-center">
              <a-radio :value="key+1"></a-radio>
            </div>
          </div>
        </div>
      </div>
    </a-radio-group>
    
  </a-modal>
</template>
<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import useAssets from "@/stores/useAssets";
import { useRouter } from 'vue-router'
const router = useRouter()
const { getImageURL } = useAssets();

const imgValue = ref('1');
const imgVisible = ref(false);
const imgList = reactive<any>([
  { imageName: 'one1.jpeg' }, { imageName: 'one.jpeg' },
  { imageName: 'two1.png' }, { imageName: 'two.jpeg' },
  { imageName: 'three1.jpeg' }, { imageName: 'three.jpeg' },
]);
const formRef = ref();
const formData = reactive({
  post: '',
  name: '',
  description: ''
});
const formRules = computed(() => {

  const requiredRule = (message: string) => ({ required: true, trigger: 'change', message });

  return {
    name: [requiredRule('Please enter name!')],
    post: [requiredRule('Please choose a post!')],
    description: [requiredRule('Please enter description!')],
  };
});
const cancelNft = ()=>{
  router.back()
}
const handleSubmit = async () => {
  // await formRef.value.validate();
  router.push('/nftDetail')
}
</script>
<style lang="less" scoped>
:deep(.ant-radio), :deep(.ant-radio-inner){
  border-radius: 2px;
  height: 20px;
  width: 20px;
}
:deep(.ant-radio-checked .ant-radio-inner){
  border-color: transparent;
}
:deep(.ant-radio-inner::after),:deep(.ant-radio-checked::after){
  border-radius: 4px;
  transform: scale(0.8);
}
</style>