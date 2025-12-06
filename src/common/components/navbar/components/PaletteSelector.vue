<template>

  <div class="card flex justify-center">
    <Button type="button" icon="pi pi-palette" aria-label="color selector" variant="outlined" @click="toggle" />

    <Popover ref="op">
      <div class="grid grid-cols-4 gap-2">
        <button type="button" v-for="color in colors" :aria-label="color"
          class=" h-6 w-6 border-none rounded-full cursor-pointer active:scale-125 transition-transform"
          :style="{ 'background-color': `var(--p-${color}-500)` }" :key="color" @click="changePrimaryColor(color)">
        </button>
      </div>
    </Popover>


  </div>

</template>

<script lang="ts" setup>
import { updatePrimaryPalette } from '@primeuix/themes';
import { Button, Popover } from 'primevue';
import { onMounted, ref } from "vue";

const op = ref();
const selectedColor = ref<string>()
const colors = ['emerald', 'green', 'indigo', 'lime', 'red', 'orange', 'amber', 'yellow', 'teal',
  'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose',
  'slate', 'zinc', 'neutral'
]

const toggle = (event: Event) => {
  op.value.toggle(event);
}


onMounted(() => {
  const savedMode = localStorage.getItem('primaryColor');
  selectedColor.value = savedMode !== null && savedMode !== undefined ? JSON.parse(savedMode) : 'blue'
  if (selectedColor.value)
    changePrimaryColor(selectedColor.value)
});

const changePrimaryColor = (color: string) => {
  selectedColor.value = color
  localStorage.setItem('primaryColor', JSON.stringify(color));
  updatePrimaryPalette({
    50: '{' + color + '.50}',
    100: '{' + color + '.100}',
    200: '{' + color + '.200}',
    300: '{' + color + '.300}',
    400: '{' + color + '.400}',
    500: '{' + color + '.500}',
    600: '{' + color + '.600}',
    700: '{' + color + '.700}',
    800: '{' + color + '.800}',
    900: '{' + color + '.900}',
    950: '{' + color + '.950}'
  });
}
</script>

<style></style>
