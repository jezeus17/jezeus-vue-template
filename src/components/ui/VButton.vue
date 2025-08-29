<template>


    <Button text-xl flex justify-center h-11 bg-primary hover:bg-secondary border-none rounded-xl  class="p-riple"  v-ripple>
        <slot></slot>
    </Button>
</template>
<script setup lang="ts">
import Button from 'primevue/button';


</script>