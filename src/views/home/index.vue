<template>
  <div class="grid grid-cols-4 gap-4">
    <div>
      <div v-for="(item,key) in cardList" :key="key">
        <CardImage :cardInfo="item" v-if="key % 4 === 0"></CardImage>
      </div>
    </div>
    <div>
      <div v-for="(item,key) in cardList" :key="key">
        <CardImage :cardInfo="item" v-if="key % 4 === 1"></CardImage>
      </div>
    </div>
    <div>
      <div v-for="(item,key) in cardList" :key="key">
        <CardImage :cardInfo="item" v-if="key % 4 === 2"></CardImage>
      </div>
    </div>
    <div>
      <div v-for="(item,key) in cardList" :key="key">
        <CardImage :cardInfo="item" v-if="key % 4 === 3"></CardImage>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import CardImage from "./components/CardImage.vue";

const cardList = reactive<any>([
  { imageName: 'one1.jpeg' }, { imageName: 'one.jpeg' },
  { imageName: 'two1.png' }, { imageName: 'two.jpeg' },
  { imageName: 'three1.jpeg' }, { imageName: 'three.jpeg' },
]);
</script>
<style lang="less" scoped>
</style>