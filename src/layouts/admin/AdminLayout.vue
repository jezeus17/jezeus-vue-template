<script setup lang="ts">
import AdminSideBar from './components/AdminSideBar.vue';
import { ref } from 'vue';
import Drawer from 'primevue/drawer';
import Button from 'primevue/button';
import Navbar from '../common/navbar/Navbar.vue';


const visible = ref(false)
</script>

<template>

  <main class="gradient-background w-screen h-screen flex anim-fade-in-1">
    <aside class="hidden xl:flex ">
      <AdminSideBar />

    </aside>

    <aside class="card flex justify-center">
      <Drawer v-model:visible="visible" class="!w-fit">
        <template #container>
          <AdminSideBar @close="visible = false" />

        </template>

      </Drawer>

    </aside>



    <section class="h-full w-full flex-col flex gap-2 p-2 overflow-auto">
      <Navbar :hide-items="true">
        <template #sidebar-button>
          <div class="xl:hidden block">
            <Button icon="pi pi-bars" class=" h-fit" severity="secondary" @click="visible = true" />

          </div>
        </template>
      </Navbar>
      <div class="h-full overflow-auto max-w-full rounded-xl w-full">
        <RouterView></RouterView>
      </div>

    </section>


  </main>

</template>