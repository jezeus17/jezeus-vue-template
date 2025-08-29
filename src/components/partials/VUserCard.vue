<template>
    <Card relative  shadow-xl  w-21rem anim-scale-0.5>
        <template #content>
            <div flex flex-col gap-2>


                <img rd-4rem size-4rem :src="props.img" v-if="props.img" />
                <div v-else rounded-full size-15 flex justify-center border-4 border-solid overflow-hidden>
                    <i class="pi pi-user" style="font-size: 3rem"></i>
                </div>

                <span font-bold text-md>{{ props.name }}</span>

               
                <div v-if="props.role" text-xs flex gap-1rem>
                    <i class="pi pi-cog" style="font-size: 1rem"></i>
                    {{ props.role }}
                </div>
                <div v-if="props.phone" text-xs flex gap-1rem>
                    <i class="pi pi-phone" style="font-size: 1rem"></i>
                    {{ props.phone }}
                </div>
                <div v-if="props.mail" text-xs flex gap-1rem>
                    <i class="pi pi-envelope" style="font-size: 1rem"></i>
                    {{ props.mail }}
                </div>
                <div v-if="props.group && props.group !== 'null'" text-xs flex gap-1rem>
                    <i class="pi pi-users" style="font-size: 1rem"></i>
                    {{ props.group }}
                </div>
            </div>
        </template>
    </Card>

</template>
<script setup>
import { Card } from 'primevue';

const props = defineProps({
    id: String,
    name: String,
    role: String,
    phone: String,
    mail: String,
    sex: String,
    group: String,
    img: String
})
</script>