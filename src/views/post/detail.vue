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
        <div class="!flex justify-center" v-for="(item, key) in postInfo.images" :key="key">
          <img :src="item.imageLink" class=" rounded-[4px]" />
        </div>
      </a-carousel>
    </div>
    <div>
      <div class="flex">
        <img v-if="false" :src="postInfo.images[0].imageLink" class="w-[65px] h-[65px] rounded-full mr-4" />
        <div class="font-bold">
          <div class="text-[26px]">{{ postInfo.name }}</div>
          <div v-if="false">an hour ago</div>
        </div>
      </div>
      <div class="text-[20px]">
        <div class="mt-10" v-html="postInfo.comment"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { getCurrentInstance, onMounted, reactive } from 'vue';
import { useRoute } from "vue-router";
const { proxy } = getCurrentInstance();
const route = useRoute()
const postInfo = reactive<any>({});

const getPostDetail = async () => {
  try {
    console.log("post hash:", route.query.hash);
    console.log("post id:", route.query.id);
    const res = await proxy.client.postDetail(route.query.hash, route.query.id)
    console.log("res:", res);
    Object.assign(postInfo,res);
  } catch (error:any) {
    message.error('Failed ',error)
  }
}
onMounted(() => {
  getPostDetail();
});
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