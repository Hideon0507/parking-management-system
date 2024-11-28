<template>
  <v-btn
    color="blue"
    variant="tonal"
    @click="handleClick"
  >
    出库
  </v-btn>
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
  if (props.zoneName && props.slotIndex !== null) {
    parkingStore.removeCar(props.zoneName, props.slotIndex);
  } else {
    parkingStore.removeCar();
  }
};
</script>
