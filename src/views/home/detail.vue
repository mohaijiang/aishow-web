<template>
  <div>
    <div class="grid grid-cols-3 gap-8">
      <div class="col-span-2">
        <div class="text-[26px] font-bold">majicMIX realistic</div>
        <div class="my-4">
          <img src="@/assets/images/one.jpeg" class="w-[30px] h-[30px] rounded-full" />
          Jun 13, 2023
        </div>
        <a-carousel arrows :dots="false">
          <template #prevArrow>
            <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
              <left-circle-outlined />
            </div>
          </template>
          <template #nextArrow>
            <div class="custom-slick-arrow" style="right: 10px">
              <right-circle-outlined />
            </div>
          </template>
          <div v-for="(item,key) in cardList" :key="key">
            <div class="flex">
              <CarouselImage :cardInfo="item[0]"></CarouselImage>
              <CarouselImage :cardInfo="item[1]"></CarouselImage>
            </div>
          </div>
        </a-carousel>
      </div>
      <div>
        <div class="text-[26px] font-bold text-[#1971c2]">Price:100 AIST</div>
        <a-button class="w-full" type="primary">Download（<span>{{count}}</span>）</a-button>
        <div>
          <pre>{{ detailDesc }}<label class="text-[#1971c2]">View more</label></pre>
        </div>
      </div>
    </div>
    <a-divider class="bg-[#fff] text-[26px] font-bold">This model works</a-divider>
    <div class="model-bg grid grid-cols-4 gap-4">
      
      <div>
        <div v-for="(item,key) in modalList" :key="key" @click="goPostDetail(item)">
          <ModalImage :cardInfo="item" v-if="key % 4 === 0"></ModalImage>
        </div>
      </div>
      <div>
        <div v-for="(item,key) in modalList" :key="key" @click="goPostDetail(item)">
          <ModalImage :cardInfo="item" v-if="key % 4 === 1"></ModalImage>
        </div>
      </div>
      <div>
        <div v-for="(item,key) in modalList" :key="key" @click="goPostDetail(item)">
          <ModalImage :cardInfo="item" v-if="key % 4 === 2"></ModalImage>
        </div>
      </div>
      <div>
        <div v-for="(item,key) in modalList" :key="key" @click="goPostDetail(item)">
          <ModalImage :cardInfo="item" v-if="key % 4 === 3"></ModalImage>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue';
import CarouselImage from './components/CarouselImage.vue';
import ModalImage from "./components/ModalImage.vue";
import { reactive, ref } from 'vue';
import { useRouter } from "vue-router";
const router = useRouter()
// 下载次数
const count = ref(0)

const cardList = reactive<any>([
  [{ imageName: 'one1.jpeg' }, { imageName: 'one.jpeg' }],
  [{ imageName: 'two1.png' }, { imageName: 'two.jpeg' }],
  [{ imageName: 'three1.jpeg' }, { imageName: 'three.jpeg' }],
]);
const modalList = reactive<any>([
  { imageName: 'one1.jpeg' }, { imageName: 'one.jpeg' },
  { imageName: 'two1.png' }, { imageName: 'two.jpeg' },
  { imageName: 'three1.jpeg' }, { imageName: 'three.jpeg' },
]);
const detailDesc = "Detail\n听我一句劝，不要开脸部修复！\nPlease don't use Face Restoration!\n如果要修复脸部，请使用after detailer.\n\nIf your face comes out badly, use after detailer instead.\n\nhttps://github.com/Bing-su/adetailer\n\n我习惯开启Dynamic Thresholding来更好控制cfg值，1~20都可以尝试一下。\n\nUse Dynmaic Thresholding to control CFG. You can try from 1~20.\n\nhttps://github.com/mcmonkeyprojects/sd-dynamic-thresholding\n\n很抱歉在之前的例图中我使用了分层的lora让大家困惑，也让大家复刻我的例图变得困难。所以新一版的例图我没有使用任何lora。想了解lora分层的可以参考…"
const goPostDetail = (item:any)=>{
  console.log('goPostDetail',item)
  // 需带上图片标识进入详情页
  router.push('/postDetail')
}
</script>
<style lang="less" scoped>
/* For demo */
.ant-carousel :deep(.slick-slide) {
  text-align: center;
  background-color: rgb(37, 38, 43);
  overflow: hidden;
  border-radius: 4px;
}

.ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
  width: 40px;
  height: 35px;
  font-size: 35px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
  z-index: 1;
}
.ant-carousel :deep(.custom-slick-arrow:before) {
  display: none;
}
.ant-carousel :deep(.custom-slick-arrow:hover) {
  opacity: 0.5;
}

pre{
  white-space:pre-wrap;
  white-space:-moz-pre-wrap;
  white-space:-pre-wrap;
  white-space:-o-pre-wrap;
  word-wrap:break-word;
}
.ant-divider-horizontal.ant-divider-with-text{
  font-size: 26px;
  font-weight: bold;
  color: #fff;
  background: transparent;
}
.ant-divider-horizontal.ant-divider-with-text::before, .ant-divider-horizontal.ant-divider-with-text::after{
  border-color: #fff;
}
.model-bg{
  background-color: rgb(37, 38, 43);
  border-radius: 4px;
  padding: 4px;
}
</style>