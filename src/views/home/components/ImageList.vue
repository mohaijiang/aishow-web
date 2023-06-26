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
import CardImage from "./CardImage.vue";
defineProps({
  cardList:{
    type: Array,
    required: true
  }
})
</script>
<style lang="less" scoped>
</style>