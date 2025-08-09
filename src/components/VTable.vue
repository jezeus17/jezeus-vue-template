<template>
  <VError v-if="props.error" />
  <section v-else-if="!props.loading" centered>
    <div class="table-card" shadow-box>
      <slot></slot>
    </div>
  </section>

  <VLoading v-else />
</template>
<script setup lang="ts">
const props = defineProps({
  error: Boolean,
  loading: Boolean,
});
</script>
<style>
.table-card {
  width: 90%;
  padding: 1rem;
  margin: 2rem;

  overflow: hidden;
}

.p-datatable-wrapper,
.p-treetable-wrapper,
.table__header span {
  font-size: 1.5rem;
}
.p-column-title {
  font-weight: bold;
}
th, tr{
  color: black;
}

.p-row-toggler:hover {
  transform: scale(1);
}
.table__header {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 2rem;
  padding: 1rem;
}

.table__header span {
  cursor: pointer;
  border-radius: 1rem;
  padding: 0.5rem;
  font-weight: bold;
  transition: all ease 0.3s;
}
.table__header span:hover {
  background-color: rgb(222, 222, 222);
}

@media (min-width: 1024px) {
  .p-datatable-wrapper,
  .p-treetable-wrapper,
  .table__header span {
    font-size: 1.8rem;
  }
}
</style>
