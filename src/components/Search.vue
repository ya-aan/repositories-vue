<script setup>
import { ref } from "vue";

import search from "../assets/search.svg";

const searchValue = ref("");
</script>
<template>
  <div class="search__container">
    <div class="search__wrapper">
      <input
        v-model="searchValue"
        type="text"
        class="input__search"
        placeholder="Начните вводить текст для поиска (не менее трех символов)"
      />

      <button class="button__search" @click="loadRepositories">
        <img :src="search" alt="Magnifier" />
      </button>
    </div>
    <div>{{ searchValue }}</div>
  </div>
</template>

<style lang="css" scoped>
.search__container {
  border: 1px solid #a2a3a4;
  background-color: #dddddd;
}
.search__wrapper {
  display: flex;
  padding: 20px;
}
.input__search {
  width: 100%;
  height: 22px;
  padding: 14px 23px;
  color: #000000;
  border: 1px solid #a2a3a4;
}

.input__search::placeholder {
  color: #000000;
}

.input__search:focus-visible {
  outline: none;
}

.button__search {
  border: none;
  background-color: #00a3ff;
  cursor: pointer;
}
</style>
