<script setup>
import { onMounted } from "vue";
import Card from "./components/Card.vue";
import Search from "./components/Search.vue";
import { useSearchStore } from "./store/searchStore";

const searchStore = useSearchStore();

onMounted(async () => {
  searchStore.loadRepositories();
});
</script>
<template>
  <div>
    <Search />

    <div
      style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px"
    >
      <Card v-for="item in searchStore.items" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<style lang="css" scoped></style>
