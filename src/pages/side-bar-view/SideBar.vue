<template>
  <v-container class="sidebar-container">
    <h3 class="d-flex justify-center">车辆出入库历史记录</h3>

    <div class="sidebar-content">
      <div v-for="(log, index) in paginatedLogs" :key="index" class="">
        <v-card class="mt-2 pl-5">
          <v-card-text style="line-height: 1.7" class="text-body-1">
            <v-row>
              <v-col>
                <p>
                  车牌号:
                  <span class="font-weight-bold">{{
                    log.car.licensePlate
                  }}</span>
                </p>
              </v-col>
              <v-col cols="auto" class="mr-3">
                <div v-if="!log.car.timeOut" class="text-orange-lighten-1 text-subtitle-1 d-flex align-center">
                  <span>正在停车</span>
                  <v-icon class="car-icon pl-2" color="orange-lighten-1">mdi-car-clock</v-icon>
                </div>

                <div v-else class="text-grey-darken-1 text-subtitle-1 d-flex align-center">
                    <span>已出库</span > 
                    <v-icon class="car-icon pl-2" color="text-grey-darken-1">mdi-car-arrow-right</v-icon></div>
              </v-col>
            </v-row>

            <p>所停车位: {{ log.spotNumber }}</p>
            <p>入库时间: {{ parkingStore.formatTime(log.car.timeIn) }}</p>
            <p>
              出库时间:
              {{ log.car.timeOut ? parkingStore.formatTime(log.car.timeOut) : " -" }}
            </p>
            <p>停车时长: {{ log.car.duration }}</p>
          </v-card-text>
        </v-card>
      </div>
    </div>

    <div v-if="totalPages>1" class="pagination">
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

<style scoped>
.sidebar-container {
   
  }

.sidebar-content {
    flex: 1; /* 占用剩余空间 */
    overflow-y: auto; /* 内容超出时启用滚动 */
    margin-top: 16px;
  }

</style>
