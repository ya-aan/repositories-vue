<script setup>
import { onMounted, ref } from "vue";
import { useSearchStore } from "./store/searchStore";
import Card from "./components/Card.vue";
import Search from "./components/Search.vue";
import arrowBack from "./assets/arrowBack.svg";
import arrowNext from "./assets/arrowNext.svg";
import downArrow from "./assets/downArrow.svg";

const searchStore = useSearchStore();

async function searchRepositories(search) {
  searchStore.searchQuery = search;
  await searchStore.loadRepositories();
}

async function loadPage() {
  await searchStore.loadMoreRepositories();
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
      <Card v-for="item in searchStore.items" :key="item.id" :item="item" />
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

    <button @click="loadPage" class="downBtn">
      <span class="down__text">
        {{ searchStore.perPage }}
      </span>
      <img :src="downArrow" alt="downArrow" />
    </button>
    <!-- <select v-model="searchStore.selectedItem" class="custom-select">
      <option v-for="item in searchStore.items" :key="item" :value="item">
        {{ item.name }}
      </option>
    </select>
    <ul>
      <li v-for="page in searchStore.pageCount" :key="page">
        <Card @click.prevent="setCurrentPage(page)">{{ page }}</Card>
      </li>
    </ul> -->
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
  background-color: #ffffff;
  cursor: pointer;
}

.downBtn {
  display: flex;
  align-items: center;
  border: 1px solid #a2a3a4;
}
.downBtn img {
  width: 24px;
  height: 29px;
}

.down__text {
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
}
</style>
