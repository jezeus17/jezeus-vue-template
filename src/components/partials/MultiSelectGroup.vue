<script setup lang="ts">
import { Button, TreeSelect } from 'primevue';

const props = defineProps({
    refetch: Function,
    showRefetchButton: {
        type: Boolean,
        default: false
    },
    groups:Object
})
const selectedGroups = defineModel()

const onNodeSelect = () => {
    if (props.refetch) props.refetch()
}



</script>

<template>
    <div flex gap-4 w-fit max-w-20rem>
        <TreeSelect selection-mode="checkbox" @change="onNodeSelect" :placeholder="$t('user.filtergroup')"
            :options="groups" filter w-16rem v-model="selectedGroups" appendTo="self" />
        <Button v-if="showRefetchButton" icon="pi pi-refresh" class="!w-18" v-tooltip="$t('global.refresh')" @click="() => {
            if (refetch) refetch()
        }" />
    </div>
</template>