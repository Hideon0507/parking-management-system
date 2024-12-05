<template>
  <v-row class="d-flex align-center pt-4 pb-4">
    <v-col cols="2" class="ml-16 pl-0 pr-0 search-container">
      <SearchBar />
    </v-col>

    <v-col align="center">
      <p class="text-h5">停车场管理系统</p>
    </v-col>

    <v-col cols="auto" class="d-flex align-center text-subtitle-2">
      <div class="mr-2">
        <span>空闲车位/全部车位 : </span>
        <span class="text-green-darken-1">{{ freeSpots }} </span>
        <span> / {{ totalSpots }}</span>
      </div>

      <addCarBtn class="mr-1" />
      <removeCarBtn class="mr-1" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { computed } from "vue";
import addCarBtn from "../../components/addCarBtn.vue";
import removeCarBtn from "../../components/removeCarBtn.vue";
import { useParkingStore } from "../../stores/parkingStore";
import SearchBar from "./components/SearchBar.vue";

const parkingStore = useParkingStore();

const freeSpots = computed(() =>
  parkingStore.zones.reduce((sum, zone) => sum + zone.free, 0)
);

const totalSpots = computed(() =>
  parkingStore.zones.reduce((sum, zone) => sum + zone.total, 0)
);
</script>

<style scoped>
.search-container {
  position: relative;
}
</style>
