<template>
  <div class="grid grid-cols-4 gap-4">
    <div>
      <div v-for="(item,key) in cardList" :key="key" @click="goDetail(item)">
        <CardImage :cardType="cardType" :cardInfo="item" v-if="key % 4 === 0"></CardImage>
      </div>
    </div>
    <div>
      <div v-for="(item,key) in cardList" :key="key" @click="goDetail(item)">
        <CardImage :cardType="cardType" :cardInfo="item" v-if="key % 4 === 1"></CardImage>
      </div>
    </div>
    <div>
      <div v-for="(item,key) in cardList" :key="key" @click="goDetail(item)">
        <CardImage :cardType="cardType" :cardInfo="item" v-if="key % 4 === 2"></CardImage>
      </div>
    </div>
    <div>
      <div v-for="(item,key) in cardList" :key="key" @click="goDetail(item)">
        <CardImage :cardType="cardType" :cardInfo="item" v-if="key % 4 === 3"></CardImage>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import CardImage from "./CardImage.vue";
import { useRouter } from 'vue-router'
const router = useRouter()
defineProps({
  cardList:{
    type: Array,
    required: true
  },
  cardType: {
    type: String,
    required: true
  }
})
const goDetail = (item:any)=>{
  console.log('goDetail',item)
  // 需带上图片标识进入详情页
  router.push('/detail?hash='+item.hash)
}
</script>
<style lang="less" scoped>
</style>