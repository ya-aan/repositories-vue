<script setup>
import { ref } from "vue";
import star from "../assets/star.svg";
import eay from "../assets/eay.svg";
import pencil from "../assets/pencil.svg";

const props = defineProps({
  item: { type: Object, required: true },
});

const emit = defineEmits(["submitComment"]);

const comment = ref("");

function addComment() {
  emit("submitComment", {
    repo_id: props.item.id,
    comment: comment.value,
  });
  comment.value = "";
}
</script>
<template>
  <div class="card__container">
    <div class="card__wrapper">
      <h2 class="wrapper__title">
        <a
          class="wrapper_url"
          :href="props.item.owner.html_url"
          target="_blank"
          title="посмотреть GitHub пользователя"
        >
          <span>
            {{ props.item.name }}
          </span>
        </a>
      </h2>
      <div class="wrapper__avatar">
        <img
          class="avatar__img"
          :src="props.item.owner?.avatar_url"
          alt="avatar"
        />
        <span class="avatar__text">{{ props.item.owner?.login }}</span>
      </div>
      <div class="wrapper__watches">
        <img class="watches__img" :src="star" alt="star" />
        <span class="watches__text">{{ props.item.stargazers_count }}</span>
        <img class="watches__img" :src="eay" alt="eay" />
        <span class="watches__img">{{ props.item.watchers }}</span>
      </div>
      <div class="wrapper__comments">
        <input
          v-model="comment"
          class="comments__input"
          type="text"
          placeholder="Комментарий к проекту"
        />
        <button class="comments__btn" @click="addComment">
          <img class="comments__img" :src="pencil" alt="pencil" />
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.wrapper_url {
  text-decoration: none;
  color: black;
}
.wrapper_url:hover {
  color: #00a3ff;
}
.wrapper__watches {
  display: flex;
  align-items: center;
  gap: 18px;
}
.wrapper__avatar {
  display: flex;
  align-items: center;
  gap: 26px;
  margin: 14px 0;
}

.avatar__img {
  width: 50px;
  height: 50px;
}

.wrapper__comments {
  display: flex;
  margin: 14px 0;
}

.comments__input {
  width: 100%;
  padding: 13px;
}

.comments__input::placeholder {
  color: #000000;
}

.comments__input:focus-visible {
  outline: none;
}

.comments__btn {
  border: none;
  background-color: #00a3ff;
  cursor: pointer;
  height: 54px;
}
</style>
