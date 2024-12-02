<template>
  <v-card class="parking-card" variant="outlined">
    <v-card-text class="parking-spot">
      <div v-if="spot.isOccupied">
        <p class="text-h6 font-weight-bold">
          {{ spot.carInfo?.licensePlate }}
        </p>
        <v-icon class="car-icon" color="greyDark">mdi-car</v-icon>
      </div>
      <div v-else>
        <p class="text-greyDark text-subtitle-1">空闲车位</p>
      </div>
    </v-card-text>

    <div class="mb-4">
      <removeCarBtn
        v-if="spot.isOccupied"
        :zoneName="zoneName"
        :spotIndex="spotIndex"
      />
      <addCarBtn v-else :zoneName="zoneName" :spotIndex="spotIndex" />
    </div>
  </v-card>
</template>

<script setup lang="ts">
import type { Spot } from "../../../stores/parkingStore";
import addCarBtn from "../../../components/addCarBtn.vue";
import removeCarBtn from "../../../components/removeCarBtn.vue";

interface IProps {
  spot: Spot;
  spotIndex: number;
  zoneName: string;
}

defineProps<IProps>();
</script>

<style scoped>
.parking-spot {
  min-height: 10vh;
  display: flex;
  align-items: center;
}
.parking-card {
  background-color: white;
  height: 18vh;
  width: 8vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.car-icon {
  font-size: 6vh;
  align-items: center;
}
</style>
