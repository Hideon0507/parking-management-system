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
      <v-col cols="3" class="bg-blue-grey-lighten-3">
        <SideBar class="sidebar" />
      </v-col>
    </v-row>

    <DetailDialog />
    <Alert />
  </v-container>
</template>

<script setup lang="ts">
import Header from "./header-view/Header.vue";
import SideBar from "./side-bar-view/SideBar.vue";
import DetailDialog from "../components/DetailDialog.vue";
import Alert from "../components/Alert.vue"

</script>

<style scoped>
.sidebar {
  height: 100vh;
  overflow-y: auto;
}
.sidebar::-webkit-scrollbar {
  width: 6px;
}

.sidebar::-webkit-scrollbar-thumb {
  background-color: #f5f5f5;
  border-radius: 5px;
}
</style>
