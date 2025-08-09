<template>
    <span v-if="title">{{ props.title }}</span>
    <div flex flex-wrap w-full gap-4>
        <slot name="content"></slot>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    title: String
}
)
</script>
