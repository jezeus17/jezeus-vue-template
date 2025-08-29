<script setup lang="ts">
import { useGroups } from '@/modules/management/group/composables/useGroups';
import { Button, TreeSelect } from 'primevue';

defineProps({
    refetch: Function,
    showRefetchButton: {
        type: Boolean,
        default: false
    }
})
const selectedGroup = defineModel({})
const { groups } = useGroups()



</script>

<template>
    <div flex gap-4 w-fit max-w-20rem>

        <TreeSelect  :placeholder="$t('user.filtergroup')" :options="groups" filter w-full
            v-model="selectedGroup" appendTo="self" @change="() => { if (refetch) refetch() }" />
        <Button v-if="showRefetchButton" icon="pi pi-refresh" class="!w-18" v-tooltip="$t('global.refresh')" @click="() => {
            if (refetch) refetch()
        }" />
    </div>
</template>