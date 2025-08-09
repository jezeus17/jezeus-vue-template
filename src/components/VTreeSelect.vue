<template>
    <div :class="$attrs.class" min-w-20rem>
        <Field v-model="model" :name="props.name" v-slot="{ meta, errors }">
            <FloatLabel variant="on">
                <TreeSelect :invalid="meta.validated && !meta.valid" @change="updateModel($event)"
                    v-bind="{ ...$attrs }" showClear filter w-full v-model="childModel" />
                <label for="" flex items-center justify-center gap-2>
                    <slot name="icon"></slot>{{ $t(props.label) }}
                </label>
            </FloatLabel>
            <Transition name="fast-fade">
                <small text-red v-if="meta.validated && !meta.valid">{{ errors[0]?$t(errors[0]):'' }}</small>
            </Transition>
        </Field>
        
    </div>
</template>

<script setup lang="ts">
import FloatLabel from 'primevue/floatlabel';
import TreeSelect from 'primevue/treeselect';
import { Field } from 'vee-validate';
import { ref } from 'vue';

const props = defineProps({
    label: { type: String, required: true },
    name: { type: String, required: true },
    loading: { type: Boolean },
    multi: { type: Boolean },
});

const model = defineModel();

const childModel = ref({})
if (model.value)
    childModel.value[model.value] = true
const updateModel = (value) => {
    if (value) {
        const newValue =  parseInt(Object.keys(value)[0])

        if (!newValue)
            model.value = undefined
        else
            model.value = newValue
    }else model.value = undefined
}


</script>