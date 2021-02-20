<template>
  <div
    class="overlay"
    :style="{ background: $vuetify.theme.themes[theme].background }"
  >
    <div class="overlay__inner">
      <a
        class="overlay__close"
        href="#"
        aria-label="close"
        @click.prevent="$router.back()"
      >
        X
      </a>
      <h1 class="text-primary text-center">{{ post.title }}</h1>
      <markdown-it-vue class="md-body" :content="post.content" />
    </div>
  </div>
</template>

<style lang="scss">
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-x: hidden;
  overflow-y: auto;
  &__inner {
    position: relative;
    max-width: 42em;
    margin-right: auto;
    margin-left: auto;
    padding: 1em;
  }
  &__close {
    position: fixed;
    top: 1em;
    right: 1em;
    text-decoration: none;
    font-size: 1.25em;
    color: #333;
    transition: color 0.2s;
    &:hover,
    &:focus {
      color: #999;
    }
  }
}
</style>

<script>
import MarkdownItVue from "markdown-it-vue";

export default {
  name: "PostDetails",
  components: { MarkdownItVue },
  methods: {
    backMethod(event) {
      if (event.keyCode === 27) {
        this.$router.back();
      }
    },
  },
  created() {
    document.addEventListener("keydown", this.backMethod);
  },
  destroyed() {
    document.removeEventListener("keydown", this.backMethod);
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    post: {
      get() {
        return this.$store.getters.getPosts[this.$route.params.Pid];
      },
    },
  },
};
</script>
