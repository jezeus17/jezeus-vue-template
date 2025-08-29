<template>
    <div centered flex-col  w-full h-full>
      <i :class="`pi pi-exclamation-triangle ${props.mode==='primary'?'text-primary':'text-white'}`" style="font-size: 1.5rem"  />
      <h2 text-xl :class="props.mode==='primary'?'text-primary':'text-white'">{{ $t('global.error') }}</h2>
      <slot></slot>
    </div>
</template>
<script setup lang="ts">
const props=defineProps({
  mode:String
})
</script>