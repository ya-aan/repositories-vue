import { defineStore } from "pinia";
import axios from "axios";

const API_URL = "https://api.github.com/search/repositories";

export const useSearchStore = defineStore("search", {
  state: () => {
    return {
      items: [],
      currentPage: 1,
      perPage: 6,
      total_count: [],
      searchQuery: "",
    };
  },
  getters: {
    // pageCount() {
    //   return Math.ceil(this.items.length / this.perPage);
    // },
    // paginatedItems() {
    //   const start = (this.currentPage - 1) * this.perPage;
    //   const end = start + this.perPage;
    //   return this.items.slice(start, end);
    // },
  },
  actions: {
    async loadRepositories() {
      try {
        // const start = (this.currentPage - 1) * this.perPage;
        // const end = start + this.perPage;
        const response = await axios.get(
          `${API_URL}?q=${
            this.searchQuery.length > 0 ? this.searchQuery : "subject"
          }&per_page=${this.perPage}&page=${this.currentPage}`
        );
        console.log(response);
        console.log(response.data.items);
        this.items = response.data.items;
        this.total_count = response.data.total_count;
        // this.currentPage++;
        console.log(this.total_count);
      } catch (error) {
        console.log(error);
      }
    },
    async loadMoreRepositories() {
      this.currentPage++;
      try {
        const response = await axios.get(
          `${API_URL}?q=${
            this.searchQuery.length > 0 ? this.searchQuery : "subject"
          }&per_page=${this.perPage}&page=${this.currentPage}`
        );
        console.log(response);
        console.log(response.data.items);
        this.items = [...this.items, ...response.data.items];
        this.total_count = response.data.total_count;
        console.log(this.total_count);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
