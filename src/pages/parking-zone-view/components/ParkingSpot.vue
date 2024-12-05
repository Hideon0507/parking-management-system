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
            <span class="text-body-1 text-grey-darken-2 font-weight-bold pb-1">
              {{ spot.carInfo?.licensePlate }}
            </span>
            <v-icon color="blue-grey-lighten-1" size="15">mdi-information-outline</v-icon>
          </div>
          <v-icon color="greyDark" size="35" >mdi-car</v-icon>
        </div>
        <div v-else>
          <p class="text-greyDark text-subtitle-2">空闲车位</p>
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
    <p class="text-greyDark text-subtitle-2" align="center">
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
}
.parking-card {
  background-color: white;
  height: 130px;
  width: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
</style>
