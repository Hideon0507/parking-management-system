<template>
  <v-row>
    <v-col>
      <p>
        <strong class="pr-5">车牌号: </strong>
        <span class="font-weight-bold text-grey-darken-2">
          {{ log.car.licensePlate }}
        </span>
      </p>
    </v-col>
    <v-col v-if="isHistory" cols="auto" class="mr-3">
      <div
        v-if="!log.car.timeOut"
        class="text-orange text-subtitle-2 d-flex align-center"
      >
        <span>正在停车</span>
        <v-icon class="car-icon pl-2" color="orange"> mdi-car-clock </v-icon>
      </div>

      <div v-else class="text-greyDark text-subtitle-2 d-flex align-center">
        <span>已出库</span>
        <v-icon class="car-icon pl-2" color="text-greyDark">
          mdi-car-arrow-right
        </v-icon>
      </div>
    </v-col>
  </v-row>

  <p><strong class="pr-2">所停车位: </strong>{{ log.spotNumber }}</p>
  <p>
    <strong class="pr-2">入库时间: </strong>
    {{ parkingStore.formatTime(log.car.timeIn) }}
  </p>
  <p v-if="isHistory">
    <strong class="pr-2">出库时间: </strong>
    {{ log.car.timeOut ? parkingStore.formatTime(log.car.timeOut) : " -" }}
  </p>
  <p><strong class="pr-2">停车时长: </strong>{{ log.car.duration }}</p>
</template>

<script setup lang="ts">
import { useParkingStore, type ParkingHistory } from "../stores/parkingStore";

const parkingStore = useParkingStore();

interface IProps {
  log: ParkingHistory;
  isHistory?: boolean;
}

defineProps<IProps>();
</script>
