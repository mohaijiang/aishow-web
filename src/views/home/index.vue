<template>
  <ImageList cardType="home" :cardList="cardList"></ImageList>
</template>
<script setup lang="ts">
import { onMounted, reactive, getCurrentInstance } from "vue";
import ImageList from "./components/ImageList.vue";
import { message } from "ant-design-vue";
const { proxy } = getCurrentInstance();

const cardList = reactive<any>([]);

const getList = async () => {
  try {
    const res = await proxy.client.modelList()
    console.log("res:", res);
    Object.assign(cardList,res);
  } catch (error:any) {
    message.error('Failed ',error)
  }
}
onMounted(() => {
  getList();
});
</script>
<style lang="less" scoped>
</style>