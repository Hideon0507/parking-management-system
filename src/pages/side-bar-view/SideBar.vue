<template>
  <v-container>
    <p class="d-flex justify-center mb-5 text-h6">车辆出入库历史记录</p>
    <div
      v-if="paginatedLogs.length === 0"
      class="d-flex justify-center align-center mt-10 text-greyDark text-subtitle-2"
    >
      当前无车辆出入库记录
    </div>
    <div v-for="(log, index) in paginatedLogs" :key="index">
      <v-card class="mt-2 pl-2">
        <v-card-text class="text-body-2">
          <ParkingDetails :log="log" :isHistory="true" />
        </v-card-text>
      </v-card>
    </div>

    <div v-if="totalPages > 1" class="mt-4">
      <v-pagination
        v-model="page"
        :length="totalPages"
        size="small"
        next-icon="mdi-menu-right"
        prev-icon="mdi-menu-left"
      >
      </v-pagination>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import ParkingDetails from "../../components/ParkingDetails.vue";
import { useParkingStore } from "../../stores/parkingStore.ts";

const parkingStore = useParkingStore();

const page = ref(1);
const itemsPerPage = 15;
const totalPages = computed(() => {
  return Math.ceil(parkingStore.parkingHistory.length / itemsPerPage);
});

const paginatedLogs = computed(() => { // 每页15个记录
  const start = (page.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return parkingStore.parkingHistory.slice(start, end);
});
</script>
