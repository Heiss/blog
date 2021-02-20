<template>
  <v-container flex>
    <v-row v-for="(post, index) in posts" :key="index">
      <v-col class="mx-auto pa-4" min-width="250px">
        <v-card
          class="mx-auto pa-4"
          min-width="250px"
          @click="goTodetail(index)"
        >
          <v-card-title
            ><a>
              {{ post.title }}
            </a>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Blog",
  methods: {
    goTodetail(postId) {
      this.$router.push({ name: "details", params: { Pid: postId } });
    },
  },
  computed: {
    posts: {
      get() {
        return this.$store.getters.getPosts;
      },
    },
  },
  beforeMount() {
    this.$services.Blog.getLatestPosts();
  },
};
</script>
