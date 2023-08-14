<template>
  <!-- w-1/2 -->
  <div class="px-[5%] py-[1%] relative flex items-center justify-center">
    <div class="w-full">
      <div class="absolute right-[2%] top-[2%] z-10">
        <img v-if="false" src="@/assets/icons/more.svg" class="h-[28px]" />
      </div>
      <img :src="replaceUrl(cardInfo.imageLink)" class="w-full rounded-[4px]" />
    </div>
  </div>
</template>
<script setup lang="ts">
import  { replaceUrl }  from "@/utils/index";
defineProps({
  cardInfo:{
    type:Object,
    required: true
  }
})
</script>