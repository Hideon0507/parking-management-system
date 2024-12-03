<template>
  <v-btn color="teal-lighten-1" @click="handleClick" class="pr-6 pl-6"> 入 库 </v-btn>
</template>

<script setup lang="ts">
import { useParkingStore } from "../stores/parkingStore";

interface IProps {
  zoneName?: string;
  spotIndex?: number;
}

const props = defineProps<IProps>();

const parkingStore = useParkingStore();

const handleClick = () => {
  const car = {
    licensePlate: `${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
    timeIn: new Date(),
    duration:"",
  };

  if (props.zoneName && props.spotIndex !== null) {
    parkingStore.addCar(car, props.zoneName, props.spotIndex);
  } else {
    parkingStore.addCar(car);
  }
};
</script>
