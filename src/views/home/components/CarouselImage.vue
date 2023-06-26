<template>
  <div class="w-1/2 p-[1%] relative flex items-center justify-center">
    <div class="w-full">
      <div class="absolute right-[2%] top-[2%] z-10">
        <img src="@/assets/icons/more.svg" class="h-[28px]" />
      </div>
      <img :src="getImageURL(cardInfo.imageName)" class="w-full rounded-[4px]" />
    </div>
  </div>
</template>
<script setup lang="ts">
import useAssets from "@/stores/useAssets";

defineProps({
  cardInfo:{
    type:Object,
    required: true
  }
})
const { getImageURL } = useAssets();
</script>