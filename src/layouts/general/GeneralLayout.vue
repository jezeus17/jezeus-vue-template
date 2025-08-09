<script setup lang="ts">
import VNavbar from "@/layouts/common/navbar/Navbar.vue";
window.scrollTo(0, 0);
</script>

<template>
  <header>
    <nav>
      <VNavbar />
    </nav>
  </header>
  <main>
    <RouterView></RouterView>
  </main>
</template>