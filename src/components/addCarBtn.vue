<template>
  <v-btn
    color="teal-lighten-1"
    class="pr-5 pl-5"
    size="small"
    :disabled="parkingStore.isFilled"
    @click="handleClick"
  >
    入 库
  </v-btn>
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
    duration: "",
  };

  if (props.zoneName && props.spotIndex !== null) {
    parkingStore.addCar(car, props.zoneName, props.spotIndex);
  } else {
    parkingStore.addCar(car);
  }
};
</script>
