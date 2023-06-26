<template>
  <ImageList :cardList="cardList"></ImageList>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import ImageList from "./components/ImageList.vue";

const cardList = reactive<any>([
  { imageName: 'one1.jpeg' }, { imageName: 'one.jpeg' },
  { imageName: 'two1.png' }, { imageName: 'two.jpeg' },
  { imageName: 'three1.jpeg' }, { imageName: 'three.jpeg' },
]);
</script>
<style lang="less" scoped>
</style>