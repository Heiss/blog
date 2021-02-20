<template>
  <v-container flex>
    <v-row>
      <v-col><LanguageSelector /></v-col>
      <v-col><ThemeSelector /></v-col>
    </v-row>
    <v-row
      ><v-col><WebsocketTester /></v-col
    ></v-row>
  </v-container>
</template>

<script>
import LanguageSelector from "@/components/LanguageSelector.vue";
import ThemeSelector from "@/components/ThemeSelector.vue";
import WebsocketTester from "@/components/WebsocketTester.vue";

export default {
  components: {
    LanguageSelector,
    ThemeSelector,
    WebsocketTester,
  },
};
</script>