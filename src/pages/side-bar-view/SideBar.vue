<template>
  <v-container class="sidebar-container">
    <h3 class="d-flex justify-center mb-5">车辆出入库历史记录</h3>

    <div v-for="(log, index) in paginatedLogs" :key="index">
      <v-card class="mt-2 pl-2">
        <v-card-text class="text-body-2">
          <ParkingDetails :log="log" :isHistory="true" />
        </v-card-text>
      </v-card>
    </div>

    <div v-if="totalPages > 1">
      <v-pagination
        v-model="page"
        :length="totalPages"
        next-icon="mdi-menu-right"
        prev-icon="mdi-menu-left"
      >
      </v-pagination>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { useParkingStore } from "../../stores/parkingStore.ts";
import { computed, ref } from "vue";
import ParkingDetails from "../../components/ParkingDetails.vue";

const parkingStore = useParkingStore();

const page = ref(1);
const itemsPerPage = 15;
const totalPages = computed(() => {
  return Math.ceil(parkingStore.parkingHistory.length / itemsPerPage);
});

const paginatedLogs = computed(() => {
  const start = (page.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return parkingStore.parkingHistory.slice(start, end);
});
</script>
