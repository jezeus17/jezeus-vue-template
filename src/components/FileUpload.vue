<template>
    <Field v-model="model" :name="props.name" v-slot="{ meta, errors }" w-full>
        <label for="" flex items-center gap-2>
            <slot name="icon"></slot>{{ $t(props.label) }}
        </label>
        <FileUpload fluid w-full mode="basic" @select="onFileSelect" accept=".xlsx" custom-upload
            :chooseLabel="$t('global.select')" severity="secondary" class="p-button-outlined">
            <template #empty>
                <div class="custom-empty-message">
                    <i class="pi pi-file-excel" style="margin-right: 0.5rem" />
                    <span>Sube un archivo Excel (.xlsx)</span>
                </div>
            </template>
        </FileUpload>
        <div v-auto-animate>
            <small class="text-red-500" v-if="meta.validated && !meta.valid">{{ errors[0] ? $t(errors[0]) : ''
            }}</small>
        </div>
    </Field>
</template>

<script setup lang="ts">
import { FileUpload } from "primevue";
import { Field } from "vee-validate";
import { ref } from "vue";
const props = defineProps({
    label: { type: String, required: true },
    name: { type: String, required: true },
})
const model = defineModel()


function onFileSelect(event) {
    const file = event.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
        model.value = file; // O e.target.result si prefieres el Data URL

    };

    reader.readAsDataURL(file);



}
</script>