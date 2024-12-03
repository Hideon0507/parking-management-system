<template>
  <v-container fluid>
    <v-row>
      <v-col class="bg-blue-grey-lighten-4">
        <Header />
      </v-col>
    </v-row>

    <v-row class="">
      <v-col cols="9" class="bg-grey-lighten-3">
        <router-view />
      </v-col>
      <v-col cols="3" class="bg-blue-grey-lighten-2">
        <SideBar class="sidebar" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import Header from "./header-view/Header.vue";
import SideBar from "./side-bar-view/SideBar.vue";
</script>

<style scoped>
.parkgrid {
  --background-color: aquamarine;
}

.sidebar {
  height: 100%;
}
</style>
