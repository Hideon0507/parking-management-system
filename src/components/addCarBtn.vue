<template>
  <v-btn @click="handleClick" > 入库 </v-btn>
</template>

<script setup lang="ts">
import { useParkingStore } from "../stores/parkingStore";

const props = defineProps({
  zoneName: {
    type: String,
    default: null,
  },
  slotIndex: {
    type: Number,
    default: null,
  },
});

const parkingStore = useParkingStore();

const handleClick = () => {
  const car = {
    licensePlate: `${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
  };

  if (props.zoneName && props.slotIndex !== null) {
    parkingStore.addCar(car, props.zoneName, props.slotIndex);
  } else {
    parkingStore.addCar(car);
  }
};
</script>
