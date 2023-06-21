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
console.log("cardList:",cardList);
</script>
<style lang="less" scoped>
.card-img{
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 3px, rgba(0, 0, 0, 0.05) 0px 10px 15px -5px, rgba(0, 0, 0, 0.04) 0px 7px 7px -5px;
  border: 1px solid rgb(55, 58, 64);
}
.left-tips{
  box-shadow: rgba(37, 38, 43, 0.2) 1px 2px 3px -1px;
  background: rgba(30, 133, 230, 0.4);
  border-radius: 4px;
  padding: 0px 8px;
  height: 18px;
  font-size: 10px;
  letter-spacing: 0.25px;
  font-weight: 700;
  text-transform: uppercase;
}
.btm-tips{
  border: 1px solid transparent;
  backdrop-filter: blur(7px);
  box-shadow: rgba(37, 38, 43, 0.2) 1px 2px 3px -1px;
  background: rgba(212, 212, 212, 0.2);
  text-transform: uppercase;
  border-radius: 4px;
  font-weight: 700;
  letter-spacing: 0.25px;
  padding-left: 8px;
  display: flex;
  align-items: center;
  width: max-content;
  margin: 5px 5px 0 0;
}
.card-btm{
  background: linear-gradient(45deg, rgba(37, 38, 43, 0.8) 0%, rgba(37, 38, 43, 0) 100%);
  backdrop-filter: blur(13px) saturate(160%);
  box-shadow: rgba(0, 0, 0, 0.16) 0px -2px 6px 1px;
}
.rounded-img{
  box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 3px, rgba(0, 0, 0, 0.5) 0px 8px 15px -5px;
  transition: opacity 0.25s ease 0s;
  position: relative;
}
.rounded-img::before {
  content: "";
  position: absolute;
  inset: 0px;
  border-radius: 32px;
  box-shadow: rgba(255, 255, 255, 0.8) 0px 0px 0px 1px inset;
}
</style>