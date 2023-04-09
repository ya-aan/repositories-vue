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

  actions: {
    async loadRepositories() {
      const jsonComments = localStorage.getItem("localComment");
      const doseCommentExit = jsonComments !== null;
      let comments = [];
      if (doseCommentExit) {
        let commentObject = JSON.parse(jsonComments);
        comments = commentObject.comments;
      }
      try {
        const response = await axios.get(
          `${API_URL}?q=${
            this.searchQuery.length > 0 ? this.searchQuery : "subject"
          }&per_page=${this.perPage}&page=${this.currentPage}`
        );

        this.items = response.data.items.map((el) => {
          let foundComments = comments.filter((x) => {
            return el.id === x.repo_id;
          });
          return {
            localComments: foundComments,
            ...el,
          };
        });
        this.total_count = response.data.total_count;
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
        this.items = [...this.items, ...response.data.items];
        this.total_count = response.data.total_count;
      } catch (error) {
        console.log(error);
      }
    },

    async saveComments(payload) {
      let resComment = localStorage.getItem("localComment");
      if (resComment === null) {
        resComment = {
          comments: [payload],
        };
        localStorage.setItem("localComment", JSON.stringify(resComment));
      } else {
        let localComment = JSON.parse(localStorage.getItem("localComment"));
        localComment.comments.push(payload);
        localStorage.setItem("localComment", JSON.stringify(localComment));
      }
      const foundRepository = this.items.find((item) => {
        return item.id === payload.repo_id;
      });
      foundRepository.localComments.push(payload);
    },
  },
});
