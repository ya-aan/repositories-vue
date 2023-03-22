import { defineStore } from "pinia";
import axios from "axios";

export const useSearchStore = defineStore("search", {
  state: () => {
    return {
      items: [],
      total_count: [],
    };
  },

  actions: {
    async loadRepositories() {
      try {
        const response = await axios.get(
          "https://api.github.com/search/repositories?q=subject"
        );
        console.log(response);
        console.log(response.data.items);
        this.items = response.data.items;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
