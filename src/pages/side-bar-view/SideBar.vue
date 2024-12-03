<template>
  <v-container>
    <h3 class="text-center">车辆出入库历史记录</h3>
    <v-divider></v-divider>

    <!-- <v-card v-if="latestEntry">
      <p>车辆已入库</p>
      <p>车牌号: {{ latestEntry.licensePlate }}</p>
      <p>车位: {{ latestEntry.spotNumber }}</p>
      <p>入库时间: {{ formatTime(latestEntry.timeIn) }}</p>
    </v-card>

    <v-card v-if="latestExit">
      <p>车辆已出库</p>
      <p>车牌号: {{ latestExit.licensePlate }}</p>
      <p>车位: {{ latestExit.spotNumber }}</p>
      <p>出库时间: {{ formatTime(latestExit.timeIn) }}</p>
      <p>
        停车时长: {{ formatDuration(latestExit.timeIn, latestExit.timeOut) }}
      </p>
    </v-card> -->

    <div v-for="(log, index) in sortedLogs" :key="index">
      <v-card class="mt-2 pa-2 pl-5">
        <p>车牌号: {{ log.car.licensePlate }}</p>
        <p>车位: {{ log.spotNumber }}</p>
        <p>入库时间: {{ formatTime(log.car.timeIn) }}</p>
        <p>
          出库时间: {{ log.car.timeOut ? formatTime(log.car.timeOut) : "-" }}
        </p>
        <p v-if="log.duration">
            停车时长: {{ log.duration }}
        </p>
        <p v-else class="text-warning">正在停车</p>
      </v-card>
    </div>

    <!-- <div v-for="(entry, index) in parkingStore.entryLogs" :key="index">
            <p>车牌号: {{ entry.licensePlate }}</p>
            <p>车位: {{ entry.spotNumber }}</p>
            <p>入库时间: {{ formatTime(entry.timeIn) }}</p>
        </div> -->
    <v-divider></v-divider>

    <!-- 出库记录 -->
    <!-- <v-list-group>
          <template v-slot:activator>
            <v-list-item-title>出库记录</v-list-item-title>
          </template>
          <v-list-item v-for="(exit, index) in parkingStore.exitLogs" :key="index">
            <v-list-item-content>
              <p>车牌号: {{ exit.licensePlate }}</p>
              <p>车位: {{ exit.spotNumber }}</p>
              <p>入库时间: {{ formatTime(exit.timeIn) }}</p>
              <p>出库时间: {{ formatTime(exit.timeOut) }}</p>
              <p>停车时长: {{ formatDuration(exit.timeIn, exit.timeOut) }}</p>
            </v-list-item-content>
          </v-list-item>
        </v-list-group> -->
    <!-- </v-list> -->
  </v-container>
</template>

<script setup lang="ts">
import { useParkingStore } from "../../stores/parkingStore.ts";
import { computed } from "vue";

const parkingStore = useParkingStore();

// const latestEntry = computed(() => {
//   return parkingStore.entryLogs[parkingStore.entryLogs.length - 1] || null;
// });

// const latestExit = computed(() => {
//   return parkingStore.exitLogs[parkingStore.exitLogs.length - 1] || null;
// });

const sortedLogs = computed(() => {
  return parkingStore.parkingHistory.slice().sort((a, b) => {
    const timeA = a.car.timeOut || a.car.timeIn;
    const timeB = b.car.timeOut || b.car.timeIn;
    return new Date(timeB).getTime() - new Date(timeA).getTime();
  });
});

// 格式化时间
const formatTime = (time: Date | undefined): string => {
  if (!time) return "未知时间";
  return new Date(time).toLocaleString();
};

// 格式化时长
const formatDuration = (
  timeIn: Date | undefined,
  timeOut: Date | undefined
): string => {
  if (!timeIn || !timeOut) return "未知时长";
  const duration = new Date(timeOut).getTime() - new Date(timeIn).getTime();
  const minutes = Math.floor(duration / 1000 / 60);
  return `${minutes} 分钟`;
};
</script>

<style scoped>

.text-center {
  text-align: center;
}
</style>
