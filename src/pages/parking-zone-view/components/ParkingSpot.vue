<template>
  <div class="mr-6">
    <v-card
      class="parking-card"
      variant="outlined"
      color="bg-blue-grey-lighten-3"
    >
      <v-card-text class="parking-spot">
        <div v-if="spot.isOccupied">
          <div class="d-flex cursor-pointer pl-4" @click="dialogStore.openDialog(log)">
            <span class="text-h6 font-weight-bold">
              {{ spot.carInfo?.licensePlate }}
            </span>
            <v-icon color="blue-grey-lighten-1" size="18"
              >mdi-information-outline</v-icon
            >
          </div>

          <v-icon color="greyDark" size="60">mdi-car</v-icon>
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
    <p class="text-greyDark text-subtitle-2 test" align="center">
      {{ spot.spotNumber }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import addCarBtn from "../../../components/addCarBtn.vue";
import removeCarBtn from "../../../components/removeCarBtn.vue";
import { useDialogStore } from "../../../stores/dialogStore";
import type { Spot } from "../../../stores/parkingStore";

interface IProps {
  spot: Spot;
  spotIndex: number;
  zoneName: string;
}

const props = defineProps<IProps>();

const log = computed(() => {
  return {
    car: props.spot.carInfo!,
    spotNumber: props.spot.spotNumber,
  };
});

const dialogStore = useDialogStore(); 
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
  --width: 8vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.parking-info-card {
  position: absolute;
  top: -100%; /* 停车信息卡片显示在车牌号上方 */
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  border-radius: 8px;
  padding: 8px;
  z-index: 10;
}
</style>
