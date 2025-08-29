<template>
    <Field v-model="model" :name="props.name" v-slot="{ meta, errors }" w-full>



        <div class=" flex flex-col justify-start items-left w-full gap-2">
            <label for="" flex items-center gap-2>
                <slot name="icon"></slot>{{ $t(props.label) }}
            </label>
            <Card v-if="existingImageUrl && files.length === 0" class="mb-4">
                <template #content>
                    <div class="flex items-center justify-center gap-8 flex-col">
                        <img :src="existingImageUrl" alt="Existing image" class="object-contain border rounded"
                            width="300" height="150" />

                        <Button @click="removeExistingImage" icon="pi pi-trash" severity="danger" rounded outlined
                            class="mt-2" v-tooltip="'Remove image'" />
                    </div>

                </template>

            </Card>

            <FileUpload w-full v-else :invalid="meta.validated && !meta.valid" accept="image/*" :maxFileSize="2524288"
                file-limit="1" @select="onFileSelect" :multiple="false" :disabled="files.length > 0">
                <template #header="{ chooseCallback, files }">
                    <div class="flex flex-wrap justify-between items-center flex-1 gap-4 w-full">
                        <div class="flex gap-2">
                            <Button @click="chooseCallback()" :disabled="files.length > 0" icon="pi pi-images" rounded
                                outlined severity="secondary"></Button>


                        </div>

                    </div>
                </template>
                <template #content="{ files, removeFileCallback }">
                    <div class="flex flex-col gap-8 pt-4">
                        <div v-if="files.length > 0">
                            <template v-for="(file, index) of files" :key="file.name + file.type + file.size">

                                <div class="flex items-center justify-center gap-8 flex-col">

                                    <img role="presentation" :alt="file.name" :src="file.objectURL" width="300"
                                        height="150" />


                                    <span
                                        class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden">{{
                                            file.name }}</span>
                                    <div>{{ formatSize(file.size) }}</div>
                                    <Button @click="removeFileCallback(index)" icon="pi pi-trash" rounded outlined
                                        severity="danger"></Button>
                                </div>
                            </template>

                            <!-- <div 
                                class="p-8 rounded-border flex flex-col border border-surface items-center gap-4">
                                <div>
                                    <img role="presentation" :alt="file.name" :src="file.objectURL" width="100"
                                        height="50" />
                                </div>
                                <span class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden">{{
                                    file.name }}</span>
                                <div>{{ formatSize(file.size) }}</div>

                            </div> -->
                        </div>

                    </div>
                </template>
                <template #empty>
                    <div class="flex items-center justify-center flex-col">
                        <i class="pi pi-cloud-upload !border-2 !rounded-full !p-8 !text-4xl !text-muted-color" />
                        <p class="mt-6 mb-0">Drag and drop files to here to upload.</p>
                    </div>
                </template>
            </FileUpload>
            <div v-auto-animate>
                <small class="text-red-500" v-if="meta.validated && !meta.valid">{{ errors[0] ? $t(errors[0]) : ''
                }}</small>
            </div>
        </div>


    </Field>


</template>

<script setup>
import { Button, Card } from "primevue";
import FileUpload from "primevue/fileupload";
import { Field } from "vee-validate";
import { onMounted, ref } from "vue";

const props = defineProps({
    label: { type: String, required: true },
    name: { type: String, required: true },
    defaultValue: String
})
const existingImageUrl = ref(props.defaultValue ? `${import.meta.env.VITE_IMG_PATH}${props.defaultValue}` : null);

const model = defineModel()

onMounted(() => {
    if (existingImageUrl.value) {
        model.value = existingImageUrl.value; // O el objeto que represente tu imagen existente
    }
});

function removeExistingImage() {
    existingImageUrl.value = null;
    model.value = ''; // O el valor por defecto que necesites
    files.value = []; // Limpiar archivos seleccionados si los hubiera
}

function onFileSelect(event) {
    files.value = event.files;
    const file = event.files[0];
    const reader = new FileReader();

    reader.onload = () => {
        existingImageUrl.value = null; // Oculta la imagen existente al subir una nueva
        model.value = file; // O e.target.result si prefieres el Data URL
    };

    reader.readAsDataURL(file);
}
import { usePrimeVue } from 'primevue/config';

const $primevue = usePrimeVue();

;
const files = ref([]);


const formatSize = (bytes) => {
    const k = 1024;
    const dm = 3;
    const sizes = $primevue.config.locale.fileSizeTypes;

    if (bytes === 0) {
        return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
};
</script>
