<template>
  <div>
    <v-app id="inspire">
      <v-navigation-drawer v-model="drawer" app bottom>
        <v-sheet class="flex-direction row pa-4">
          <v-container fill-height
            ><v-row no-gutters align="center" justify="center">
              <v-col
                ><v-avatar class="mb-4" color="green darken-3" size="64">
                  <v-img src="@/assets/logo.png"/></v-avatar
              ></v-col>
              <v-col fill-height="true"><h3>Heiss Blog</h3></v-col></v-row
            >
          </v-container>
        </v-sheet>

        <v-divider></v-divider>

        <v-list>
          <v-list-item-group v-model="model" mandatory color="indigo">
            <v-list-item
              v-for="(item, i) in views"
              v-show="item.icon"
              :key="i"
              :to="item.path"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon" />
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title
                  v-text="$gettext(item.name)"
                ></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <v-container fluid>
          <transition-page>
            <router-view />
          </transition-page>
        </v-container>
      </v-main>

      <v-card-text style="position: fixed; bottom: 0px" class="d-xl-none">
        <v-fab-transition>
          <v-btn
            v-show="true"
            color="pink"
            dark
            absolute
            top
            right
            fab
            @click="drawer = !drawer"
          >
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </v-fab-transition>
      </v-card-text>
    </v-app>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>
import router from "./router/index.js";
import { mapGetters } from "vuex";
import Vue from "vue";
import TransitionPage from "./components/TransitionPage.vue";

export default {
  data: () => ({
    drawer: null,
    views: router.options.routes,
    model: null,
  }),
  components: { TransitionPage },
  computed: {
    ...mapGetters({
      isDarkMode: "isDarkMode",
      getLanguage: "getLanguage",
    }),
  },
  beforeMount: function() {
    let language = this.getLanguage;

    if (language == undefined) {
      const ll_CC = navigator.language || navigator.userLanguage;
      language = ll_CC.split("-", 1)[0];
    }

    if (!Object.prototype.hasOwnProperty.call(Vue.$translations, language)) {
      import("@/translations/" + language + ".json").then((locale) => {
        this.$language.merge(locale);
        this.$language.current = language;
      });
    } else {
      this.$language.current = language;
    }

    this.$vuetify.theme.dark = this.$store.getters.isDarkMode;
  },
};
</script>
