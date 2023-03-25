<script setup>
import { onMounted, ref } from "vue";
import { useSearchStore } from "./store/searchStore";
import Card from "./components/Card.vue";
import Search from "./components/Search.vue";
import arrowBack from "./assets/arrowBack.svg";
import arrowNext from "./assets/arrowNext.svg";

const searchStore = useSearchStore();

const one = ref(10);

async function searchRepositories(search) {
  searchStore.searchQuery = search;
  await searchStore.loadRepositories();
}

onMounted(async () => {
  searchStore.loadRepositories();
});
</script>
<template>
  <div>
    <Search @search="searchRepositories" />

    <div
      style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px"
    >
      <Card
        v-for="item in searchStore.filteredItem"
        :key="item.id"
        :item="item"
      />
    </div>
    <div class="pagination">
      <div>
        <button class="pagination__btn">
          <img :src="arrowBack" alt="Back" class="imgButton" />
        </button>
        <button class="pagination__btn">
          <span>1</span>
        </button>
        <button class="pagination__btn">
          <img :src="arrowNext" alt="Next" />
        </button>
      </div>
    </div>

    <select v-model="one" class="custom-select">
      <option v-for="item in searchStore.items" :key="item" :value="one">
        {{ item.name }}
      </option>
    </select>
  </div>
</template>

<style lang="css" scoped>
.custom-select {
  appearance: none;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  font-size: 16px;
  font-family: Arial, sans-serif;
  color: #333;
  cursor: pointer;
}

.custom-select option {
  background-color: #fff;
  color: #333;
  font-size: 16px;
  font-family: Arial, sans-serif;
}
.pagination {
  display: flex;
  justify-content: center;
}
.pagination__btn {
  background-color: none;
  border: 1px solid #a2a3a4;
  /* border: none; */
  background-color: #ffffff;
  cursor: pointer;
}
</style>
