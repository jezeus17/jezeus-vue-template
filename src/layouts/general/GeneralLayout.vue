<script setup lang="ts">
import Navbar from "@/components/navbar/Navbar.vue";
window.scrollTo(0, 0);
</script>

<template>
  <header>
    <nav>
      <Navbar absolute />
    </nav>
  </header>
  <main>
    <RouterView></RouterView>
  </main>
</template>
