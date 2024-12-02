<template>
  <v-btn color="blue" class="" @click="handleClick"> 出 库 </v-btn>
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
  if (props.zoneName && props.spotIndex !== null) {
    parkingStore.removeCar(props.zoneName, props.spotIndex);
  } else {
    parkingStore.removeCar();
  }
};
</script>
