<template>
  <div class="top-0 px-[32px] bg-[#000000] z-10 fixed h-[64px] w-full border-b">
    <div class="flex justify-between items-center h-full">
      <div class="text-[30px] font-bold">
        <span class="text-red-600">AI</span><span>SHOW</span>
        <a-dropdown :trigger="['click']">
          <a class="ant-dropdown-link" @click.prevent>
            <img src="@/assets/icons/add.svg" class="h-[20px]" />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item key="0">
                <a href="http://www.alipay.com/">Upload a model</a>
              </a-menu-item>
              <a-menu-item key="1">
                <a href="http://www.taobao.com/">Post images</a>
              </a-menu-item>
              <!-- <a-menu-divider /> -->
              <a-menu-item key="3">Write an article</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
      <div>
        <a-button class="ml-8" type="primary">Connect Wallet</a-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
<style lang="less" scoped>

</style>