<template>
  <div class="grid grid-cols-3 gap-8">
    <div class="col-span-2">
      <a-carousel arrows>
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
        <div class="!flex justify-center">
          <img src="@/assets/images/one.jpeg" class=" rounded-[4px]" />
        </div>
        <div class="!flex justify-center">
          <img src="@/assets/images/one.jpeg" class=" rounded-[4px]" />
        </div>
        <div class="!flex justify-center">
          <img src="@/assets/images/one.jpeg" class=" rounded-[4px]" />
        </div>
      </a-carousel>
    </div>
    <div>
      <div class="flex">
        <img src="@/assets/images/one.jpeg" class="w-[65px] h-[65px] rounded-full mr-4" />
        <div class="font-bold">
          <div class="text-[26px]">Hideroki</div>
          <div>an hour ago</div>
        </div>
      </div>
      <div class="text-[20px]">
        <div class="mt-10">Model：majicMIX realistic</div>
        <div class="mt-5">Details：nsfw，badhandv4，easynegative，插图，2d，绘画，卡通，素描，（最差质量：1.9），（低质量：1.9），（正常质量：1.9），低分辨率，解剖学不好，手不好，乳房阴道，（ (单色), ((灰阶)), 塌陷眼影, 多眉, (剪裁), 过饱和, 多余肢体, 缺失肢体, 变形手, 长脖子, 长身子, 不完美, (坏手), 签名, 水印, 用户名, 艺术家姓名, 连体手指, 变形手指, 难看的眼睛, 不完美的眼睛, 歪斜的眼睛, 不自然的脸, 不自然的身体, 错误, 不良形象, 不良照片</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue';
</script>
<style lang="less" scoped>
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
</style>