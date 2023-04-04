<script setup>
import { onMounted } from "vue";
import { useSearchStore } from "./store/searchStore";
import Card from "./components/Card.vue";
import Search from "./components/Search.vue";
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

    <button @click="loadPage" class="downBtn">
      <span class="down__text">
        {{ searchStore.perPage }}
      </span>
      <img :src="downArrow" alt="downArrow" />
    </button>
  </div>
</template>

<style lang="css" scoped>
.downBtn {
  display: flex;
  align-items: center;
  border: 1px solid #a2a3a4;
  cursor: pointer;
}
.down__text {
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
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
