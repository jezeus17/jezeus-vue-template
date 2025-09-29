<template>
    <Dialog @after-hide="props.model.clearData()" v-model:visible="visible" modal
        :header="(props.model.getID() ? $t('global.update') : $t('global.add')) + ' ' + header"
        class="w-4/5 max-w-50rem min-w-25rem">
        <Form @submit="onSubmit" :validation-schema="model.getSchema()">
            <div class="dialog-form">
                <slot name="form">
                </slot>
            </div>

            <div class="dialog-footer">
                <Button type="button" :label="$t('global.cancel')" severity="secondary"
                    @click="visible = false"></Button>

                <Button w-8rem type="submit" :loading="isRequestLoading || isDataLoading" :label="t('global.save')" />
            </div>
        </Form>
    </Dialog>

</template>
<script setup lang="ts">
import { BaseModel } from '@/common/models/base/BaseModel';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import { Form } from 'vee-validate';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import handlePromise from '@/common/http/handlePromise';

const { t } = useI18n()

const isRequestLoading = ref(false)

const props = defineProps({
    model: {
        type: BaseModel,
        required: true
    },
    header: {
        type: String,
        required: true
    },
    submitFunction: {
        type: Function,
        required: true
    },
    successFunction: {
        type: Function
    },
    isDataLoading: {
        type: Boolean
    },
    forUpdate: {
        type: Boolean
    },


})
const visible = ref(false)


const show = () => {
    // if (!props.forUpdate)
    //     props.model.clearData()
    visible.value = true
}



const onSubmit = async () => {
    handlePromise(props.submitFunction, isRequestLoading, () => {
        if (props.successFunction) props.successFunction()
        visible.value = false
        props.model.clearData()
    })
}

defineExpose({ show })

</script>
